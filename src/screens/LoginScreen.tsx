import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Quartermaster</Text>
        <Text style={styles.subtitle}>
          Your companion for EVE Online
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.featureText}>✓ Multi-character support (up to 100)</Text>
          <Text style={styles.featureText}>✓ Asset & market order tracking</Text>
          <Text style={styles.featureText}>✓ AI-powered route planning</Text>
          <Text style={styles.featureText}>✓ Interactive 2D star map</Text>
          <Text style={styles.featureText}>✓ zkillboard integration</Text>
          <Text style={styles.featureText}>✓ Ship fitting suggestions</Text>
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={login}>
          <Text style={styles.loginButtonText}>
            Login with EVE Online
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Secure SSO authentication via CCP
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 40,
  },
  features: {
    width: '100%',
    marginBottom: 40,
  },
  featureText: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 12,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#00d4ff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    marginTop: 20,
  },
});

export default LoginScreen;
