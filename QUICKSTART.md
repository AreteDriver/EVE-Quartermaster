# Quick Start Guide

Get Quartermaster up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Mobile device with Expo Go app OR iOS/Android emulator

## 5-Minute Setup

### 1. Clone and Install (2 minutes)

```bash
git clone https://github.com/AreteDriver/Quartermaster.git
cd Quartermaster
npm install
```

### 2. Configure ESI (2 minutes)

1. Visit https://developers.eveonline.com/
2. Create a new application
3. Note your Client ID
4. Update `src/contexts/AuthContext.tsx`:
   ```typescript
   const ESI_CLIENT_ID = 'your_client_id_here';
   ```

### 3. Start the App (1 minute)

```bash
npm start
```

Scan the QR code with Expo Go app on your phone!

## First Use

1. **Login** - Tap "Login with EVE Online"
2. **Authorize** - Grant permissions on CCP's SSO page
3. **Explore** - Navigate through the app features!

## Main Features

### 🏠 Home Screen
Your dashboard with quick access to all features

### 👥 Characters
- View all your characters
- Tap to switch active character
- Long press to remove

### 📦 Assets
View your assets across all locations

### 💰 Market Orders
Track your buy and sell orders

### 🗺️ Map & Routes
- Search for systems
- Plan routes
- Get danger assessments

### 🤖 AI Assistant
Ask questions and get intelligent suggestions

## Troubleshooting

**Can't login?**
- Check your ESI Client ID
- Verify callback URL is `quartermaster://auth`
- Ensure all required scopes are enabled

**App won't start?**
```bash
npm start -- --clear
```

**Dependencies error?**
```bash
rm -rf node_modules
npm install
```

## Next Steps

- Add multiple characters
- Check out your assets
- Plan a route
- Ask the AI assistant for help

## Need Help?

- Check [SETUP.md](SETUP.md) for detailed setup
- Read [README.md](README.md) for full documentation
- Open an issue on GitHub

## Tips

💡 **Use on real device** - SSO works best on physical devices
💡 **Add multiple characters** - Switch between them easily
💡 **Check routes before travel** - Let AI analyze danger
💡 **Ask AI assistant** - It can help with complex questions

## What's Next?

Explore all the features:
- ✅ Asset tracking
- ✅ Market orders
- ✅ Route planning with danger assessment
- ✅ zkillboard integration
- ✅ AI-powered suggestions
- ✅ Ship fitting recommendations

Enjoy using Quartermaster! 🚀
