# Setup Guide for Quartermaster

This guide will walk you through setting up the Quartermaster for development.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (version 18 or higher)
   ```bash
   node --version
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **Expo CLI** (optional, will be installed with dependencies)
   ```bash
   npm install -g expo-cli
   ```

4. **Development Environment**:
   - For iOS: macOS with Xcode installed
   - For Android: Android Studio with an emulator setup
   - Or: Expo Go app on your physical device

## Step 1: Clone the Repository

```bash
git clone https://github.com/AreteDriver/Quartermaster.git
cd Quartermaster
```

## Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React Native and Expo
- Navigation libraries
- API clients (Axios)
- Authentication libraries
- Storage solutions

## Step 3: ESI Application Setup

To use EVE Online's ESI API, you need to register your application:

1. Go to https://developers.eveonline.com/
2. Log in with your EVE Online account
3. Click "Create New Application"
4. Fill in the application details:
   - **Application Name**: Quartermaster (or your preferred name)
   - **Description**: Mobile companion app for EVE Online
   - **Connection Type**: Authentication & API Access
   - **Permissions**: Select all required scopes:
     - `esi-assets.read_assets.v1`
     - `esi-characters.read_standings.v1`
     - `esi-markets.read_character_orders.v1`
     - `esi-universe.read_structures.v1`
     - `esi-location.read_location.v1`
     - `esi-location.read_ship_type.v1`
     - `esi-skills.read_skills.v1`
     - `esi-wallet.read_character_wallet.v1`
   - **Callback URL**: `quartermaster://auth`

5. Save your application and note the Client ID

## Step 4: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your ESI credentials:
   ```
   ESI_CLIENT_ID=your_actual_client_id_here
   ESI_CLIENT_SECRET=your_actual_client_secret_here
   ESI_CALLBACK_URL=quartermaster://auth
   ```

3. Update `src/contexts/AuthContext.tsx` with your Client ID:
   ```typescript
   const ESI_CLIENT_ID = 'your_actual_client_id_here';
   ```

## Step 5: Start Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

## Step 6: Run the App

### Option A: Physical Device (Recommended for testing)

1. Install the **Expo Go** app from:
   - iOS: App Store
   - Android: Google Play Store

2. Scan the QR code shown in your terminal

### Option B: iOS Simulator (macOS only)

1. Press `i` in the terminal where Expo is running
2. Or run: `npm run ios`

### Option C: Android Emulator

1. Start your Android emulator
2. Press `a` in the terminal where Expo is running
3. Or run: `npm run android`

## Step 7: Test the App

1. **Login Screen**: You should see the Quartermaster login screen
2. **SSO Authentication**: 
   - Tap "Login with EVE Online"
   - You'll be redirected to CCP's SSO page
   - Authorize the application
   - You'll be redirected back to the app

3. **Main Features**:
   - Navigate through different screens
   - Add multiple characters
   - View assets and market orders
   - Plan routes
   - Use AI assistant

## Troubleshooting

### Issue: "Cannot find module" errors

**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules
npm install
npm start -- --clear
```

### Issue: Authentication not working

**Solution**: Check your ESI configuration
1. Verify Client ID is correct
2. Ensure callback URL matches exactly
3. Check that all required scopes are enabled
4. Make sure your app is not in a "testing" state on the ESI portal

### Issue: Metro bundler errors

**Solution**: Reset Metro bundler
```bash
npm start -- --reset-cache
```

### Issue: "Unable to resolve module" for navigation

**Solution**: Install peer dependencies
```bash
expo install react-native-gesture-handler react-native-screens react-native-safe-area-context
```

### Issue: API calls failing

**Solution**: Check network and CORS
1. Ensure you're not using localhost/127.0.0.1
2. Check that ESI API is accessible
3. Verify your access tokens are valid

## Development Tips

1. **Hot Reloading**: The app supports hot reloading. Save your changes and see them instantly.

2. **Debugging**:
   - Shake your device to open developer menu
   - Enable Remote JS Debugging for Chrome DevTools
   - Use React Native Debugger for advanced debugging

3. **Testing on Real Device**: Always test SSO authentication on a real device as some auth flows may not work properly in simulators.

4. **API Rate Limits**: Be aware of ESI API rate limits during development. Cache data when possible.

5. **Secure Storage**: In production, consider using more secure storage solutions like Expo SecureStore for sensitive data.

## Next Steps

- Customize the app theme and branding
- Add additional features
- Implement unit tests
- Set up CI/CD pipeline
- Prepare for production build

## Building for Production

### iOS

```bash
expo build:ios
```

Follow the prompts to configure your iOS build.

### Android

```bash
expo build:android
```

Choose APK or App Bundle based on your needs.

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
- [EVE Online ESI Docs](https://esi.evetech.net/ui/)
- [zkillboard API](https://github.com/zKillboard/zKillboard/wiki)

## Getting Help

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/AreteDriver/Quartermaster/issues)
2. Read the [EVE Online Third Party Developer](https://developers.eveonline.com/) documentation
3. Join the EVE Online developers community

## License

This project is open source and available under the MIT License.
