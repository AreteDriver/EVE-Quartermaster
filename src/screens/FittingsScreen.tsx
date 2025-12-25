import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const FittingsScreen = () => {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('pvp');
  const [searchQuery, setSearchQuery] = useState('');

  const purposes = [
    { id: 'pvp', label: 'PvP', icon: '⚔️' },
    { id: 'pve', label: 'PvE', icon: '🎯' },
    { id: 'exploration', label: 'Exploration', icon: '🔍' },
    { id: 'hauling', label: 'Hauling', icon: '📦' },
    { id: 'mining', label: 'Mining', icon: '⛏️' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ship Fitting Assistant</Text>
          <Text style={styles.headerSubtext}>
            AI-powered fitting suggestions based on your skills
          </Text>
        </View>

        <View style={styles.searchSection}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for ship type..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.purposeSection}>
          <Text style={styles.sectionTitle}>Select Purpose</Text>
          <View style={styles.purposeGrid}>
            {purposes.map((purpose) => (
              <TouchableOpacity
                key={purpose.id}
                style={[
                  styles.purposeCard,
                  selectedPurpose === purpose.id && styles.purposeCardActive,
                ]}
                onPress={() => setSelectedPurpose(purpose.id)}
              >
                <Text style={styles.purposeIcon}>{purpose.icon}</Text>
                <Text style={styles.purposeLabel}>{purpose.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🤖 AI Fitting Suggestions</Text>
          <Text style={styles.infoText}>
            This feature will analyze your character's skills and suggest optimal ship fittings for your selected purpose.
          </Text>
          <Text style={styles.infoText}>
            • Skill-based module recommendations
          </Text>
          <Text style={styles.infoText}>
            • Multiple fitting options (budget, standard, expensive)
          </Text>
          <Text style={styles.infoText}>
            • DPS, tank, and utility calculations
          </Text>
          <Text style={styles.infoText}>
            • Export to in-game format
          </Text>
        </View>

        <View style={styles.placeholderCard}>
          <Text style={styles.placeholderText}>
            🚀 Select a ship type to see fitting suggestions
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00d4ff',
  },
  headerSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  searchSection: {
    padding: 15,
  },
  searchInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  purposeSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  purposeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  purposeCard: {
    width: '30%',
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  purposeCardActive: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },
  purposeIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  purposeLabel: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    margin: 15,
    backgroundColor: '#1a2a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
  placeholderCard: {
    margin: 15,
    backgroundColor: '#1a1a1a',
    padding: 40,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FittingsScreen;
