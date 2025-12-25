import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { CharacterProvider } from './src/contexts/CharacterContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CharacterProvider>
          <NavigationContainer>
            <AppNavigator />
            <StatusBar style="light" />
          </NavigationContainer>
        </CharacterProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
