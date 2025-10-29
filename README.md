# 🎴 Wizard Card Game Online

Play the classic Wizard card game with friends online or locally. Professional multiplayer experience with rooms, real-time synchronization, and PWA support for installation on any device.

## ✨ Features

### Online Multiplayer
- **Create & Join Rooms** - 6-digit room codes for easy matchmaking
- **2-6 Players** - Full support for any group size
- **Real-time Sync** - Socket.io powered instant game state updates
- **Ready System** - All players must ready before starting
- **Connection Status** - Live server connection indicator

### Local Gameplay
- **Offline Mode** - Play without server on single device
- **Pass & Play** - Take turns on one device
- **Full Game Logic** - All game features work offline

### Progressive Web App (PWA)
- **📱 Installable** - Add to home screen (Android, iOS, Desktop)
- **🔌 Offline Support** - Service worker caching
- **⚡ Fast Loading** - Instant startup after installation
- **🔄 Auto-Updates** - Automatic app version updates
- **🌐 Cross-Platform** - Works everywhere

### Professional UI/UX
- **Glassmorphism Design** - Modern, beautiful interface
- **Smooth Animations** - Polished user experience
- **Responsive Layout** - Works on any screen size
- **Dark Theme** - Easy on the eyes

## 🚀 Quick Deployment Guide

### Step 1: Deploy to GitHub Pages

1. **Push this repository to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git branch -M main
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from main branch
   - Save and wait for deployment
   - Your site will be at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Step 2: Deploy the Server

The game needs a WebSocket server for online multiplayer. Deploy to Railway (recommended):

#### Option A: Railway (Easiest)

1. **Sign up at [Railway.app](https://railway.app/)**

2. **Create new project**
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select this repository

3. **Configure**
   - Railway auto-detects Node.js
   - No additional config needed
   - Get your deployment URL (e.g., `https://your-app.railway.app`)

4. **Copy the server URL** - You'll need it for the next step

#### Option B: Heroku

1. **Install Heroku CLI and login**
   ```bash
   heroku login
   ```

2. **Create app**
   ```bash
   heroku create your-wizard-game
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Get URL**: `https://your-wizard-game.herokuapp.com`

### Step 3: Connect Game to Server

1. **Open** `wizard_game.html` in your code editor

2. **Find** the Socket.io initialization section (around line 6810):
   ```javascript
   // For GitHub Pages deployment, set your deployed server URL here:
   const DEPLOYED_SERVER = ''; // Leave empty if not deployed yet
   ```

3. **Update** with your server URL:
   ```javascript
   const DEPLOYED_SERVER = 'https://your-app.railway.app';
   ```

4. **Commit and push**
   ```bash
   git add wizard_game.html
   git commit -m "Configure deployed server URL"
   git push
   ```

5. **Wait** for GitHub Pages to update (30-60 seconds)

### Step 4: Share with Friends

Share your GitHub Pages URL:
```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

Friends can now:
1. Open the URL on their phone/tablet/desktop
2. Create or join rooms using 6-digit codes
3. Install the app as a PWA (see below)

## 📱 Installing as PWA

### On Android (Chrome)
1. Open the game in Chrome
2. Click the "Install App" button that appears
3. Or tap menu (⋮) → "Install app" or "Add to Home screen"
4. App appears on home screen like a native app

### On iOS (Safari only)
1. Open the game in Safari
2. Tap Share button (□↑)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"
5. App appears on home screen

### On Desktop (Chrome/Edge)
1. Open the game in Chrome or Edge
2. Look for install icon in address bar (⊕)
3. Click "Install"
4. App opens in standalone window

## 🎮 How to Play

### Creating a Room (Online)
1. Click "ONLINE MULTIPLAYER"
2. Click "CREATE ROOM"
3. Enter your name
4. Share the 6-digit room code with friends
5. Wait for players to join
6. Click "START GAME" when everyone is ready

### Joining a Room (Online)
1. Click "ONLINE MULTIPLAYER"
2. Click "JOIN ROOM"
3. Enter room code (6 digits)
4. Enter your name
5. Click "READY" when ready to start
6. Wait for host to start game

### Local Game (Offline)
1. Click "LOCAL GAME"
2. Select number of players (2-6)
3. Enter player names
4. Pass device between players
5. Play offline on single device

## 🛠️ Local Development

### Running Locally

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the server**
   ```bash
   node server.js
   ```
   Server runs on http://localhost:3000

3. **Open the game**
   - Open `wizard_game.html` in your browser
   - Or visit http://localhost:3000
   - Game auto-connects to local server

### Project Structure

```
wizzard/
├── wizard_game.html          # Main game (online + local)
├── server.js                 # WebSocket server (Node.js + Socket.io)
├── package.json              # Node.js dependencies
├── manifest.json             # PWA manifest
├── service-worker.js         # Service worker (caching)
├── index.html                # Redirect to main game
├── icons/                    # PWA icons (all sizes)
└── README.md                 # This file
```

## 🔧 Configuration

### Server Settings (server.js)

Default port is 3000. To change:
```javascript
const PORT = process.env.PORT || 3000;
```

For Railway/Heroku, they set PORT automatically.

### PWA Settings (manifest.json)

- **App name**: "Wizard Card Game Online"
- **Theme color**: Purple (#8B5CF6)
- **Start URL**: wizard_game.html
- **Display**: standalone (full screen)

### Cache Settings (service-worker.js)

Cache version: `wizard-game-online-v2.0.0`

To force update, increment version:
```javascript
const CACHE_NAME = 'wizard-game-online-v2.0.1';
```

## 🐛 Troubleshooting

### "Not connected to server" message

**If running locally:**
- Make sure `node server.js` is running
- Check server is on port 3000
- Try refreshing the page

**If deployed:**
- Check Railway/Heroku server is running
- Verify DEPLOYED_SERVER URL is correct in wizard_game.html
- Check browser console for errors (F12)

### PWA not installing

- **HTTPS required** - GitHub Pages provides this automatically
- **Wait 5-10 seconds** - Service worker needs time to register
- **Try incognito mode** - To bypass cache issues
- **Check browser** - Use Chrome (Android) or Safari (iOS)

### Room connection issues

- Both players must be connected to server
- Check internet connection
- Verify room code is correct (6 digits)
- Try creating new room

## 📊 Game Rules

### Wizard Card Game Basics
- **Trick-taking game** with bidding
- **60 cards**: 4 suits (13 each) + 4 Wizards + 4 Jesters
- **Multiple rounds**: Card count increases each round
- **Bidding**: Predict tricks you'll win
- **Scoring**:
  - Correct: 20 + (10 × tricks) points
  - Wrong: -10 × difference points

### Special Cards
- **Wizard**: Always wins the trick
- **Jester**: Always loses the trick
- **Trump suit**: Changes each round

## 🚀 Production Checklist

Before sharing with friends:

- [ ] Server deployed to Railway/Heroku
- [ ] Server URL configured in wizard_game.html
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled and deployed
- [ ] Tested creating room works
- [ ] Tested joining room works
- [ ] Tested PWA installation on mobile
- [ ] Tested game play works online

## 📱 Browser Support

- ✅ Chrome 73+ (Android, Desktop)
- ✅ Firefox 58+ (Android, Desktop)
- ✅ Safari 16.3+ (iOS, macOS)
- ✅ Edge 79+ (Desktop)
- ✅ Samsung Internet 5.0+ (Android)

## 👨‍💻 Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js, Socket.io
- **PWA**: Service Worker, Web App Manifest
- **Real-time**: WebSocket (Socket.io)
- **Hosting**: GitHub Pages (frontend) + Railway/Heroku (backend)

## 📞 Support

Issues or questions?
1. Check server is running (Railway/Heroku dashboard)
2. Open browser console (F12) to see errors
3. Verify DEPLOYED_SERVER URL is set correctly
4. Try clearing browser cache and reinstalling PWA

---

**Made with ✨ by S3MAH**
