/**
 * Application Configuration
 *
 * All configuration values should be loaded from environment variables.
 * See .env.example for required variables.
 */
import Constants from 'expo-constants';

// Environment variables with fallbacks for development
const getEnvVar = (key: string, fallback: string = ''): string => {
  const value = Constants.expoConfig?.extra?.[key] || process.env[key] || fallback;
  if (!value && !fallback) {
    console.warn(`Environment variable ${key} is not set`);
  }
  return value;
};

// ESI OAuth Configuration
export const ESI_CONFIG = {
  CLIENT_ID: getEnvVar('ESI_CLIENT_ID'),
  // Note: Client secret should NEVER be in mobile apps
  // Use PKCE flow instead for mobile OAuth
  CALLBACK_URL: getEnvVar('ESI_CALLBACK_URL', 'quartermaster://auth'),
  AUTHORIZE_URL: 'https://login.eveonline.com/v2/oauth/authorize',
  TOKEN_URL: 'https://login.eveonline.com/v2/oauth/token',
};

// API Endpoints
export const API_CONFIG = {
  ESI_BASE_URL: getEnvVar('ESI_BASE_URL', 'https://esi.evetech.net/latest'),
  ZKILLBOARD_BASE_URL: getEnvVar('ZKILLBOARD_BASE_URL', 'https://zkillboard.com/api'),
  DATASOURCE: 'tranquility',
};

// Validate required configuration
export const validateConfig = (): boolean => {
  const errors: string[] = [];

  if (!ESI_CONFIG.CLIENT_ID) {
    errors.push('ESI_CLIENT_ID is required. Register at https://developers.eveonline.com/');
  }

  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    return false;
  }

  return true;
};

export default {
  ESI: ESI_CONFIG,
  API: API_CONFIG,
  validateConfig,
};
