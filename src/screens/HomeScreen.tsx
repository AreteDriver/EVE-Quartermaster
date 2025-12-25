import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAuth } from '../contexts/AuthContext';
import { useCharacters } from '../contexts/CharacterContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { currentCharacter, logout } = useAuth();
  const { activeCharacter, characters } = useCharacters();

  const character = activeCharacter || currentCharacter;

  const menuItems = [
    { title: 'Characters', icon: '👥', screen: 'Characters' as const },
    { title: 'Assets', icon: '📦', screen: 'Assets' as const },
    { title: 'Market Orders', icon: '💰', screen: 'MarketOrders' as const },
    { title: 'Star Map', icon: '🗺️', screen: 'Map' as const },
    { title: 'Route Planner', icon: '🛣️', screen: 'RouteMap' as const },
    { title: 'Ship Fittings', icon: '🚀', screen: 'Fittings' as const },
    { title: 'AI Assistant', icon: '🤖', screen: 'AIAssistant' as const },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.characterName}>
            {character?.character_name || 'Pilot'}
          </Text>
          <Text style={styles.characterCount}>
            Managing {characters.length} character{characters.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  welcomeText: {
    fontSize: 16,
    color: '#888',
  },
  characterName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginTop: 5,
  },
  characterCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  menuItem: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: '#1a1a1a',
    margin: '1%',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  menuIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#ff4444',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;
