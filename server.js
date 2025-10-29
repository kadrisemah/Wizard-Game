/**
 * ═══════════════════════════════════════════════════════════
 *   WIZARD CARD GAME - MULTIPLAYER SERVER
 *   Professional WebSocket Server with Room Management
 * ═══════════════════════════════════════════════════════════
 */

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Serve static files
app.use(express.static(__dirname));

// Game rooms storage
const rooms = new Map();

// Player data structure
class Player {
    constructor(id, name, socketId) {
        this.id = id;
        this.name = name;
        this.socketId = socketId;
        this.isReady = false;
        this.isHost = false;
        this.connected = true;
    }
}

// Room data structure
class Room {
    constructor(code, hostId, hostName) {
        this.code = code;
        this.players = new Map();
        this.maxPlayers = 6;
        this.minPlayers = 3;
        this.gameState = null;
        this.gameStarted = false;
        this.createdAt = Date.now();

        // Add host as first player
        const host = new Player(hostId, hostName, hostId);
        host.isHost = true;
        this.players.set(hostId, host);
    }

    addPlayer(id, name, socketId) {
        if (this.players.size >= this.maxPlayers) {
            return { success: false, error: 'Room is full' };
        }
        if (this.gameStarted) {
            return { success: false, error: 'Game already started' };
        }

        const player = new Player(id, name, socketId);
        this.players.set(id, player);
        return { success: true, player };
    }

    removePlayer(id) {
        this.players.delete(id);

        // If host left, assign new host
        if (this.players.size > 0) {
            const newHost = Array.from(this.players.values())[0];
            newHost.isHost = true;
        }
    }

    getPlayerList() {
        return Array.from(this.players.values()).map(p => ({
            id: p.id,
            name: p.name,
            isReady: p.isReady,
            isHost: p.isHost,
            connected: p.connected
        }));
    }

    canStartGame() {
        const readyCount = Array.from(this.players.values())
            .filter(p => p.isReady || p.isHost).length;
        return readyCount >= this.minPlayers && readyCount === this.players.size;
    }
}

// Generate unique room code
function generateRoomCode() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code;
    do {
        code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    } while (rooms.has(code));
    return code;
}

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`🔌 New connection: ${socket.id}`);

    // CREATE ROOM
    socket.on('create-room', ({ playerName }) => {
        const roomCode = generateRoomCode();
        const room = new Room(roomCode, socket.id, playerName);
        rooms.set(roomCode, room);

        socket.join(roomCode);
        socket.emit('room-created', {
            roomCode,
            playerList: room.getPlayerList()
        });

        console.log(`🎮 Room created: ${roomCode} by ${playerName}`);
    });

    // JOIN ROOM
    socket.on('join-room', ({ roomCode, playerName }) => {
        roomCode = roomCode.toUpperCase();
        const room = rooms.get(roomCode);

        if (!room) {
            socket.emit('join-error', { error: 'Room not found' });
            return;
        }

        const result = room.addPlayer(socket.id, playerName, socket.id);

        if (!result.success) {
            socket.emit('join-error', { error: result.error });
            return;
        }

        socket.join(roomCode);
        socket.emit('room-joined', {
            roomCode,
            playerList: room.getPlayerList()
        });

        // Notify all players in room
        io.to(roomCode).emit('player-joined', {
            playerName,
            playerList: room.getPlayerList()
        });

        console.log(`👤 ${playerName} joined room ${roomCode}`);
    });

    // PLAYER READY
    socket.on('player-ready', ({ roomCode }) => {
        const room = rooms.get(roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (player) {
            player.isReady = !player.isReady;
            io.to(roomCode).emit('player-list-updated', {
                playerList: room.getPlayerList(),
                canStart: room.canStartGame()
            });
        }
    });

    // START GAME
    socket.on('start-game', ({ roomCode, gameState }) => {
        const room = rooms.get(roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player || !player.isHost) {
            socket.emit('error', { message: 'Only host can start game' });
            return;
        }

        if (!room.canStartGame()) {
            socket.emit('error', { message: 'Not all players ready' });
            return;
        }

        room.gameStarted = true;
        room.gameState = gameState;

        io.to(roomCode).emit('game-started', { gameState });
        console.log(`🎮 Game started in room ${roomCode}`);
    });

    // GAME STATE SYNC
    socket.on('sync-game-state', ({ roomCode, gameState }) => {
        const room = rooms.get(roomCode);
        if (!room) return;

        room.gameState = gameState;
        socket.to(roomCode).emit('game-state-updated', { gameState });
    });

    // PLAYER ACTION (bid, play card, etc.)
    socket.on('player-action', ({ roomCode, action, data }) => {
        socket.to(roomCode).emit('player-action', {
            playerId: socket.id,
            action,
            data
        });
    });

    // CHAT MESSAGE
    socket.on('chat-message', ({ roomCode, message }) => {
        const room = rooms.get(roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (player) {
            io.to(roomCode).emit('chat-message', {
                playerName: player.name,
                message,
                timestamp: Date.now()
            });
        }
    });

    // LEAVE ROOM
    socket.on('leave-room', ({ roomCode }) => {
        handlePlayerLeave(socket, roomCode);
    });

    // DISCONNECT
    socket.on('disconnect', () => {
        console.log(`❌ Disconnected: ${socket.id}`);

        // Find and clean up rooms
        for (const [roomCode, room] of rooms.entries()) {
            if (room.players.has(socket.id)) {
                handlePlayerLeave(socket, roomCode);
                break;
            }
        }
    });

    // Helper: Handle player leaving
    function handlePlayerLeave(socket, roomCode) {
        const room = rooms.get(roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player) return;

        room.removePlayer(socket.id);
        socket.leave(roomCode);

        if (room.players.size === 0) {
            // Delete empty room
            rooms.delete(roomCode);
            console.log(`🗑️  Room ${roomCode} deleted (empty)`);
        } else {
            // Notify remaining players
            io.to(roomCode).emit('player-left', {
                playerName: player.name,
                playerList: room.getPlayerList()
            });
        }

        console.log(`👋 ${player.name} left room ${roomCode}`);
    }
});

// Clean up old empty rooms (every 5 minutes)
setInterval(() => {
    const now = Date.now();
    for (const [code, room] of rooms.entries()) {
        if (room.players.size === 0 || (now - room.createdAt > 3600000)) {
            rooms.delete(code);
            console.log(`🧹 Cleaned up room ${code}`);
        }
    }
}, 300000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🎮 WIZARD GAME SERVER RUNNING           ║
║   Port: ${PORT}                              ║
║   URL: http://localhost:${PORT}              ║
╚════════════════════════════════════════════╝
    `);
});
