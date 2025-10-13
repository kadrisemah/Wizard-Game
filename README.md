# 🎴 Wizard Tournament - Professional Score Tracker

A fully-featured Progressive Web App (PWA) for tracking Wizard card game tournaments with German elimination system.

## ✨ Features

### Core Functionality
- **2-6 Player Support** - Tournament setup for any group size
- **German Elimination System** - Automatic elimination scheduling (rounds 10, 12, 15)
- **Real-time Score Calculation** - Instant score updates with visual feedback
- **Professional UI/UX** - Glassmorphism design with smooth animations
- **Rank Tracking** - Live leaderboard with danger zone indicators
- **Elimination Animations** - Engaging particle effects and funny messages
- **Winner Celebration** - Confetti animation and victory modal

### PWA Features
- **📱 Installable** - Add to home screen on any device (Android, iOS, Desktop)
- **🔌 Offline Mode** - Works without internet after first load
- **⚡ Fast Loading** - Service worker caching for instant startup
- **🔄 Auto-Updates** - Automatic app updates with user prompt
- **📊 App Icons** - Professional icons in all required sizes
- **🌐 Cross-Platform** - Works on mobile, tablet, and desktop

## 🚀 Quick Start

### For Users: Installing the App

1. **Open the app** in your mobile browser
2. **Click "Install App"** button that appears at bottom-right
3. **Or follow manual instructions** in [INSTALL_GUIDE.html](./INSTALL_GUIDE.html)

Detailed installation instructions for:
- 🤖 Android (Chrome, Firefox, Samsung Internet)
- 🍎 iOS (Safari only, iOS 16.3+)
- 💻 Desktop (Chrome, Edge, Brave)

### For Developers: Hosting the App

#### Option 1: Local Development Server
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Access at: http://localhost:8000/wizard_app.html
```

#### Option 2: Deploy to Production

**Requirements:**
- ✅ HTTPS enabled (required for PWA)
- ✅ All files served from same origin
- ✅ Service worker accessible at root or app path

**Recommended Hosting:**
- [Netlify](https://www.netlify.com/) - Drag & drop deployment
- [Vercel](https://vercel.com/) - Git-based deployment
- [GitHub Pages](https://pages.github.com/) - Free hosting with HTTPS
- [Firebase Hosting](https://firebase.google.com/products/hosting) - Google's hosting service

**Deployment Steps:**
1. Upload all files to your hosting service
2. Ensure HTTPS is enabled
3. Access via your domain (e.g., `https://yourname.github.io/wizard/`)
4. The install prompt will appear automatically

## 📁 Project Structure

```
wizzard/
├── wizard_app.html          # Main application (single-page app)
├── manifest.json            # PWA manifest (metadata, icons, theme)
├── service-worker.js        # Service worker (caching, offline mode)
├── generate-icons.html      # Icon generator tool
├── INSTALL_GUIDE.html       # User installation instructions
├── README.md                # This file
└── icons/                   # App icons (generated)
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png
    ├── icon-384x384.png
    └── icon-512x512.png
```

## 🎨 Generating App Icons

The project includes an icon generator tool:

1. **Open** `generate-icons.html` in your browser
2. **Click** "Generate All Icons" button
3. **Icons will download automatically** (8 sizes)
4. **Save icons** to the `icons/` directory

Icon sizes generated:
- 72x72, 96x96, 128x128, 144x144 (Android)
- 152x152, 192x192 (iOS, Android)
- 384x384, 512x512 (High-res displays)

## 🎮 How to Use the App

### Setup Phase
1. **Select number of players** (2-6 using spinner)
2. **Enter player names** (or use default names)
3. **Review elimination schedule** (automatic based on player count)
4. **Start Tournament**

### Game Phase
1. **Enter bids** for each player (predicted tricks)
2. **Enter actuals** after round completes (tricks won)
3. **Calculate Round** to update scores
4. **Next Round** to continue
5. **Watch eliminations** at scheduled rounds (10, 12, 15)

### Scoring System
- **Correct bid:** 20 + (10 × tricks) points
- **Wrong bid:** -10 × difference points
- **Example:** Bid 3, Won 3 = 20 + 30 = 50 points
- **Example:** Bid 2, Won 4 = -10 × 2 = -20 points

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, glassmorphism
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **PWA APIs** - Service Worker, Web App Manifest
- **Local Storage** - Game state persistence (future)

### Browser Support
- ✅ Chrome 73+ (Android, Desktop)
- ✅ Firefox 58+ (Android)
- ✅ Safari 16.3+ (iOS, macOS)
- ✅ Edge 79+ (Desktop)
- ✅ Samsung Internet 5.0+ (Android)

### PWA Features Implementation

**Manifest (`manifest.json`):**
- App metadata (name, description, colors)
- Icon definitions (all sizes)
- Display mode (standalone - no browser UI)
- Orientation (portrait)
- App shortcuts

**Service Worker (`service-worker.js`):**
- Cache-first strategy for app shell
- Network fallback for dynamic content
- Automatic cache versioning
- Background sync support (future)
- Push notifications support (future)

**Installation Flow:**
- Automatic install prompt on eligible devices
- Floating "Install App" button
- beforeinstallprompt event handling
- App installed confirmation

## 🎯 Future Enhancements

### Planned Features
- [ ] **Game History** - Save and review past tournaments
- [ ] **Cloud Sync** - Sync games across devices
- [ ] **Statistics** - Player performance analytics
- [ ] **Themes** - Multiple color schemes
- [ ] **Multiplayer** - Real-time collaborative scoring
- [ ] **Export** - Download tournament results as PDF/CSV
- [ ] **Push Notifications** - Round reminders

### Advanced PWA Features
- [ ] **Background Sync** - Sync scores when back online
- [ ] **Push Notifications** - Tournament updates
- [ ] **Share Target** - Share tournament results
- [ ] **Shortcuts** - Quick actions from home screen icon

## 🐛 Troubleshooting

### Install prompt not showing?
- **Check HTTPS:** PWAs require secure connection
- **Wait:** Service worker needs 5-10 seconds to register
- **Clear cache:** Try incognito/private mode
- **Check browser:** Use Chrome (Android) or Safari (iOS)

### App not working offline?
- **Load once online:** Initial cache required
- **Wait for caching:** Service worker caches on first visit
- **Check console:** Open DevTools to see service worker status

### App not updating?
- **Reload:** Close and reopen the app
- **Clear cache:** Settings → Clear browsing data
- **Reinstall:** Uninstall and reinstall the app

## 📱 Device-Specific Notes

### Android
- Works best in Chrome browser
- Install prompt appears automatically
- Can be found in app drawer after installation
- Behaves like native app

### iOS (iPhone/iPad)
- **Safari only** - Other browsers can't install PWAs
- **iOS 16.3+ required** - Earlier versions have limited support
- Manual installation via Share → Add to Home Screen
- Runs in full-screen mode when launched

### Desktop
- Works in Chrome, Edge, Brave, Opera
- Install icon appears in address bar
- Opens in standalone window
- Can pin to taskbar/dock

## 🎨 Design System

### Color Palette
- **Primary:** Purple (#8B5CF6) - Main brand color
- **Secondary:** Cyan (#06B6D4) - Accents
- **Accent:** Pink (#EC4899) - Highlights
- **Success:** Green (#10B981) - Positive feedback
- **Danger:** Red (#EF4444) - Eliminations, errors
- **Warning:** Amber (#F59E0B) - Winner, cautions

### Typography
- **Headings:** Orbitron (monospace, futuristic)
- **Body:** Inter (sans-serif, readable)
- **Scores:** Orbitron (tabular numerals)

### Animations
- Smooth transitions (250ms cubic-bezier)
- Particle effects for eliminations
- Confetti for winner celebration
- Glassmorphism with backdrop blur
- Gradient shifts and glows

## 👨‍💻 Developer Info

**Designed & Developed by:** S3MAH
**Version:** 1.0.0
**Type:** Progressive Web App (PWA)
**License:** All rights reserved

### Development Notes
- Single HTML file architecture for simplicity
- No build process required
- No external dependencies (except Google Fonts)
- Vanilla JavaScript (no frameworks)
- Mobile-first responsive design
- Follows PWA best practices

## 🔗 Useful Resources

- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Installation Guide](./INSTALL_GUIDE.html)

## 📞 Support

For issues, questions, or feature requests:
1. Check the [INSTALL_GUIDE.html](./INSTALL_GUIDE.html) troubleshooting section
2. Open browser console (F12) to see error messages
3. Ensure HTTPS is enabled for PWA features

---

**Crafting pixels, one wizard at a time ✨**
