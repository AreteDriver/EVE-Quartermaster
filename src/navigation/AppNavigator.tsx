import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CharactersScreen from '../screens/CharactersScreen';
import AssetsScreen from '../screens/AssetsScreen';
import MarketOrdersScreen from '../screens/MarketOrdersScreen';
import MapScreen from '../screens/MapScreen';
import RouteMapScreen from '../screens/RouteMapScreen';
import FittingsScreen from '../screens/FittingsScreen';
import AIAssistantScreen from '../screens/AIAssistantScreen';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Characters: undefined;
  Assets: { characterId?: number };
  MarketOrders: { characterId?: number };
  Map: undefined;
  RouteMap: { origin?: number; destination?: number };
  Fittings: undefined;
  AIAssistant: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Could show a loading screen here
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a1a',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Quartermaster' }}
          />
          <Stack.Screen
            name="Characters"
            component={CharactersScreen}
            options={{ title: 'Characters' }}
          />
          <Stack.Screen
            name="Assets"
            component={AssetsScreen}
            options={{ title: 'Assets' }}
          />
          <Stack.Screen
            name="MarketOrders"
            component={MarketOrdersScreen}
            options={{ title: 'Market Orders' }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ title: 'Star Map' }}
          />
          <Stack.Screen
            name="RouteMap"
            component={RouteMapScreen}
            options={{ title: 'Route Planning' }}
          />
          <Stack.Screen
            name="Fittings"
            component={FittingsScreen}
            options={{ title: 'Ship Fittings' }}
          />
          <Stack.Screen
            name="AIAssistant"
            component={AIAssistantScreen}
            options={{ title: 'AI Assistant' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
