# EVE Quartermaster

A modern, feature-rich mobile application for EVE Online, inspired by Neocom II but built with updated technology. Quartermaster is your comprehensive companion for managing characters, tracking assets, planning routes, and making informed decisions in New Eden.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Features

### Core Functionality
- **ESI/SSO Authentication**: Secure authentication using CCP's official SSO system
- **Multi-Character Support**: Manage up to 100 characters with easy switching
- **Asset Tracking**: Monitor your assets across all locations in real-time
- **Market Orders**: Track and manage your market orders
- **Ship Fittings**: AI-powered fitting suggestions based on your skills

### Advanced Features
- **2D Map Module**: Interactive star map for route visualization
- **AI Route Planning**: Intelligent route suggestions with danger assessment
- **zkillboard Integration**: Real-time hostile force and ganker detection
- **Jump Capable Ships**: Calculate routes for capital ships with jump drives
- **Risk Assessment**: Per-system danger ratings based on recent kills
- **Alternative Routes**: AI suggests safer alternatives when high-danger systems detected

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Expo CLI
- iOS Simulator (for iOS) or Android Studio (for Android)
- EVE Online ESI application credentials

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AreteDriver/EVE-Quartermaster.git
cd EVE-Quartermaster
```

2. Install dependencies:
```bash
npm install
```

3. Configure ESI credentials:
   - Copy `.env.example` to `.env`
   - Register your application at https://developers.eveonline.com/
   - Add your ESI Client ID and Secret to `.env`

4. Start the development server:
```bash
npm start
```

5. Run on your device:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app for physical device

## 📱 App Structure

```
EVE-Quartermaster/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx       # Authentication management
│   │   └── CharacterContext.tsx  # Character management
│   ├── navigation/        # Navigation configuration
│   ├── screens/           # Application screens
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CharactersScreen.tsx
│   │   ├── AssetsScreen.tsx
│   │   ├── MarketOrdersScreen.tsx
│   │   ├── MapScreen.tsx
│   │   ├── RouteMapScreen.tsx
│   │   ├── FittingsScreen.tsx
│   │   └── AIAssistantScreen.tsx
│   ├── services/          # API services
│   │   ├── ESIService.ts          # EVE ESI API integration
│   │   ├── ZKillboardService.ts   # zkillboard API integration
│   │   └── AIService.ts           # AI assistance logic
│   ├── types/             # TypeScript type definitions
│   └── utils/             # Utility functions
├── desktop-tools/         # Desktop companion utilities
│   └── linux/             # Linux multi-boxing scripts
├── App.tsx                # Root component
├── package.json
└── tsconfig.json
```

## 🖥️ Desktop Tools (Linux)

Companion scripts for managing multiple EVE client windows on Linux. Perfect for multi-boxing.

```bash
# Install dependencies
sudo apt-get install wmctrl xdotool rofi

# Tile all EVE windows in a preview grid
./desktop-tools/linux/eve_tile_all.sh

# Interactive menu to switch between clients
./desktop-tools/linux/eve_switcher.sh
```

See [desktop-tools/README.md](desktop-tools/README.md) for full documentation.

## 🔑 Key Features Explained

### Character Management
- Support for up to 100 characters
- SSO authentication for each character
- Easy switching between active characters
- Secure token storage with automatic refresh

### Asset Tracking
- View all assets across all locations
- Filter and search capabilities
- Location-based grouping
- AI-powered consolidation suggestions

### Route Planning
- Calculate shortest routes between systems
- AI-powered danger assessment using zkillboard data
- Alternative route suggestions for safer travel
- Jump-capable ship route calculation
- Per-system threat ratings

### AI Assistant
- Intelligent route planning recommendations
- Asset distribution analysis
- Market order optimization suggestions
- Ship fitting recommendations
- Natural language query support

### zkillboard Integration
- Real-time kill data per system
- Danger rating calculation (low/medium/high/extreme)
- Recent kill statistics
- Hostile force detection

## 🛠️ Technology Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **API Integration**: Axios
- **Authentication**: Expo Auth Session

## 📋 ESI Scopes Required

The app requires the following ESI scopes:
- `esi-assets.read_assets.v1` - Asset tracking
- `esi-characters.read_standings.v1` - Character standings
- `esi-markets.read_character_orders.v1` - Market orders
- `esi-universe.read_structures.v1` - Structure information
- `esi-location.read_location.v1` - Current location
- `esi-location.read_ship_type.v1` - Current ship
- `esi-skills.read_skills.v1` - Character skills
- `esi-wallet.read_character_wallet.v1` - Wallet information

## 🔒 Security

- All authentication is handled through CCP's official SSO
- Tokens are stored securely using AsyncStorage
- Automatic token refresh before expiration
- No passwords or sensitive data stored locally

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Disclaimer

EVE Quartermaster is not affiliated with or endorsed by CCP Games. EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide.

## ☕ Support the Project

If you enjoy this project, consider supporting development:

- **In-Game**: Send ISK donations to **AreteDriver** in EVE Online
- **Buy Me a Coffee**: [buymeacoffee.com/aretedriver](https://buymeacoffee.com/aretedriver)

Your support helps keep these projects maintained and improving. o7

---

## 🙏 Acknowledgments

- Inspired by Neocom II
- Built using CCP's ESI API
- zkillboard for kill data
- The EVE Online community

## 📞 Support

For support, please open an issue on GitHub or contact the maintainers.

## 🗺️ Roadmap

- [ ] Enhanced 3D map visualization
- [ ] Push notifications for market orders
- [ ] Industry tracking and planning
- [ ] PI (Planetary Interaction) management
- [ ] Fleet management features
- [ ] Corporation tools
- [ ] Offline mode support
- [ ] Widget support for quick stats
