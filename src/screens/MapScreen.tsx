import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import ESIService from '../services/ESIService';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

const MapScreen = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const results = await ESIService.searchSolarSystems(searchQuery);
      setSearchResults(results);
    } catch (error) {
      Alert.alert('Error', 'Failed to search for systems');
    }
  };

  const handlePlanRoute = () => {
    if (selectedOrigin && selectedDestination) {
      navigation.navigate('RouteMap', {
        origin: selectedOrigin,
        destination: selectedDestination,
      });
    } else {
      Alert.alert('Error', 'Please select both origin and destination systems');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Text style={styles.sectionTitle}>Search Solar Systems</Text>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter system name..."
            placeholderTextColor="#666"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {searchResults.length > 0 && (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((systemId) => (
              <TouchableOpacity
                key={systemId}
                style={styles.resultItem}
                onPress={() => {
                  if (!selectedOrigin) {
                    setSelectedOrigin(systemId);
                  } else {
                    setSelectedDestination(systemId);
                  }
                }}
              >
                <Text style={styles.resultText}>System ID: {systemId}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={styles.selectionSection}>
        <Text style={styles.sectionTitle}>Route Planning</Text>
        
        <View style={styles.selectionCard}>
          <Text style={styles.selectionLabel}>Origin:</Text>
          <Text style={styles.selectionValue}>
            {selectedOrigin ? `System ${selectedOrigin}` : 'Not selected'}
          </Text>
          {selectedOrigin && (
            <TouchableOpacity onPress={() => setSelectedOrigin(null)}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.selectionCard}>
          <Text style={styles.selectionLabel}>Destination:</Text>
          <Text style={styles.selectionValue}>
            {selectedDestination ? `System ${selectedDestination}` : 'Not selected'}
          </Text>
          {selectedDestination && (
            <TouchableOpacity onPress={() => setSelectedDestination(null)}>
              <Text style={styles.clearButton}>Clear</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.planButton,
            (!selectedOrigin || !selectedDestination) && styles.planButtonDisabled,
          ]}
          onPress={handlePlanRoute}
          disabled={!selectedOrigin || !selectedDestination}
        >
          <Text style={styles.planButtonText}>Plan Route</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>2D Map Features</Text>
        <Text style={styles.infoText}>• Search and select solar systems</Text>
        <Text style={styles.infoText}>• Plan routes between systems</Text>
        <Text style={styles.infoText}>• View zkillboard danger ratings</Text>
        <Text style={styles.infoText}>• Calculate jump routes for capitals</Text>
        <Text style={styles.infoText}>• Get AI-powered route suggestions</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  searchSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00d4ff',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    gap: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchButton: {
    backgroundColor: '#00d4ff',
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  resultsContainer: {
    maxHeight: 200,
    marginTop: 10,
  },
  resultItem: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  resultText: {
    color: '#fff',
  },
  selectionSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  selectionCard: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  selectionLabel: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  selectionValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 5,
  },
  planButton: {
    backgroundColor: '#00d4ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  planButtonDisabled: {
    backgroundColor: '#333',
  },
  planButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoSection: {
    padding: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoText: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default MapScreen;
