# 🎴 Wizard Card Game Online

Play the classic Wizard card game with friends online or locally. Professional multiplayer with rooms, real-time sync, and PWA support.

## ✨ Features

- **Online Multiplayer** - Create/join rooms with 6-digit codes
- **2-6 Players** - Full game support
- **Real-time Sync** - Instant updates via Socket.io
- **PWA Installable** - Add to home screen on any device
- **Local Mode** - Play offline on single device
- **Professional UI** - Glassmorphism design, smooth animations

## 🚀 Quick Setup (2 Simple Steps!)

### Step 1: Deploy Server to Vercel (One-time, 2 minutes)

The game files are on GitHub Pages, but the server needs to run on Vercel (free, auto-updates from GitHub):

1. **Go to [vercel.com](https://vercel.com/)** and sign in with GitHub
2. **Click "Add New Project"**
3. **Import your GitHub repository**: `Wizard-Game`
4. **Click "Deploy"** - That's it! Vercel auto-detects everything
5. **Copy your deployment URL** (e.g., `https://wizard-game-kadrisemah.vercel.app`)

### Step 2: Update Server URL (One-time)

1. **Open** `wizard_game.html` (line 4061)
2. **Replace** the VERCEL_SERVER URL with YOUR Vercel URL:
   ```javascript
   const VERCEL_SERVER = 'https://YOUR-PROJECT.vercel.app';
   ```
3. **Commit and push** to GitHub:
   ```bash
   git add wizard_game.html
   git commit -m "Update server URL"
   git push
   ```

## 🎉 Done! Share with Friends

Your game is live at:
```
https://kadrisemah.github.io/Wizard-Game/wizard_game.html
```

Friends can:
- Open the URL on any device
- Install it as a PWA (works like a native app!)
- Create or join rooms
- Play together in real-time

## 📱 Installing as PWA

### Android (Chrome)
1. Open game in Chrome
2. Tap "Install App" button
3. App appears on home screen

### iOS (Safari)
1. Open game in Safari
2. Tap Share → "Add to Home Screen"
3. App appears on home screen

### Desktop (Chrome/Edge)
1. Open game in Chrome or Edge
2. Click install icon in address bar
3. App opens in standalone window

## 🎮 How to Play

### Online Mode
1. Click "ONLINE MULTIPLAYER"
2. **Host**: Click "CREATE ROOM" → Share 6-digit code
3. **Join**: Click "JOIN ROOM" → Enter code
4. Click "READY" → Host starts game

### Local Mode
1. Click "LOCAL GAME"
2. Select players (2-6)
3. Pass device between players

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start server
node server.js

# Open game
# Visit http://localhost:3000 or open wizard_game.html
```

## 📁 Project Structure

```
├── wizard_game.html       # Main game (online + local)
├── wizard_app.html        # Score tracker
├── server.js              # WebSocket server (Vercel)
├── package.json           # Dependencies
├── vercel.json            # Vercel config
├── manifest.json          # PWA manifest
├── service-worker.js      # PWA service worker
├── index.html             # Redirect to game
└── icons/                 # PWA icons
```

## 🔧 How It Works

- **GitHub Pages**: Hosts the game files (HTML, CSS, JS, icons)
- **Vercel**: Hosts the Node.js WebSocket server
- **Socket.io**: Real-time communication between players
- **PWA**: Installable on any device, works offline

## 🐛 Troubleshooting

### "Not connected to server"

1. **Check Vercel server is running**:
   - Go to vercel.com dashboard
   - Check deployment status (should be "Ready")

2. **Verify server URL**:
   - Open `wizard_game.html` line 4061
   - Make sure `VERCEL_SERVER` matches your Vercel URL
   - Must include `https://` and NO trailing slash

3. **Check browser console** (F12):
   - Look for connection errors
   - Verify Socket.io is loading

4. **Try refreshing** GitHub Pages:
   - Pages can take 1-2 minutes to update after push
   - Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### PWA not installing

- **HTTPS required**: GitHub Pages has this automatically
- **Wait 5-10 seconds**: Service worker needs to register
- **Use correct browser**: Chrome (Android) or Safari (iOS)

### Room connection issues

- Make sure both players are connected to server (green status)
- Verify 6-digit room code is correct
- Try creating a new room

## 📊 Game Rules

- **Trick-taking card game** with bidding
- **60 cards**: 4 suits (13 each) + 4 Wizards + 4 Jesters
- **Scoring**:
  - Correct bid: 20 + (10 × tricks) points
  - Wrong bid: -10 × difference points
- **Special cards**:
  - Wizard: Always wins
  - Jester: Always loses
  - Trump suit: Changes each round

## 🌐 Browser Support

- Chrome 73+ (Android, Desktop)
- Firefox 58+ (Android, Desktop)
- Safari 16.3+ (iOS, macOS)
- Edge 79+ (Desktop)
- Samsung Internet 5.0+ (Android)

## 📞 Support

Need help?
1. Check Vercel dashboard (server running?)
2. Verify server URL in wizard_game.html
3. Open browser console (F12) for errors
4. Try clearing cache and reinstalling PWA

---

**Made with ✨ by S3MAH**
