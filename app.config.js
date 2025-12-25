/**
 * Expo configuration with environment variable support
 * See: https://docs.expo.dev/guides/environment-variables/
 */
import 'dotenv/config';

export default {
  expo: {
    name: 'Quartermaster',
    slug: 'quartermaster',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'dark',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#000000',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.quartermaster.app',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#000000',
      },
      package: 'com.quartermaster.app',
    },
    web: {
      favicon: './assets/favicon.png',
    },
    scheme: 'quartermaster',
    extra: {
      // Environment variables for the app
      ESI_CLIENT_ID: process.env.ESI_CLIENT_ID,
      ESI_CALLBACK_URL: process.env.ESI_CALLBACK_URL || 'quartermaster://auth',
      ESI_BASE_URL: process.env.ESI_BASE_URL || 'https://esi.evetech.net/latest',
      ZKILLBOARD_BASE_URL: process.env.ZKILLBOARD_BASE_URL || 'https://zkillboard.com/api',
    },
  },
};
