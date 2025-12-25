import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import AIService from '../services/AIService';
import ZKillboardService from '../services/ZKillboardService';
import { AIRouteSuggestion, ZKillboardData } from '../types';

type RouteMapScreenRouteProp = RouteProp<RootStackParamList, 'RouteMap'>;

interface RouteMapScreenProps {
  route: RouteMapScreenRouteProp;
}

const RouteMapScreen: React.FC<RouteMapScreenProps> = ({ route }) => {
  const { origin, destination } = route.params;
  const [routeSuggestion, setRouteSuggestion] = useState<AIRouteSuggestion | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(0); // 0 = main, 1+ = alternatives

  useEffect(() => {
    if (origin && destination) {
      calculateRoute();
    }
  }, [origin, destination]);

  const calculateRoute = async () => {
    if (!origin || !destination) return;

    setLoading(true);
    try {
      const suggestion = await AIService.generateRouteSuggestions(
        origin,
        destination,
        false,
        false
      );
      setRouteSuggestion(suggestion);
    } catch (error) {
      console.error('Error calculating route:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getCurrentRoute = () => {
    if (!routeSuggestion) return null;
    if (selectedRoute === 0) return routeSuggestion.route;
    return routeSuggestion.alternative_routes[selectedRoute - 1];
  };

  const currentRoute = getCurrentRoute();

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#00d4ff" />
        <Text style={styles.loadingText}>Calculating route...</Text>
      </View>
    );
  }

  if (!routeSuggestion || !currentRoute) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          {origin && destination ? 'Failed to calculate route' : 'Invalid route parameters'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Route Overview</Text>
        <Text style={styles.headerSubtext}>
          {currentRoute.systems.length - 1} jump{currentRoute.systems.length - 1 !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.routeTypeContainer}>
        <TouchableOpacity
          style={[styles.routeTypeButton, selectedRoute === 0 && styles.routeTypeActive]}
          onPress={() => setSelectedRoute(0)}
        >
          <Text style={styles.routeTypeText}>Shortest</Text>
        </TouchableOpacity>
        {routeSuggestion.alternative_routes.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.routeTypeButton, selectedRoute === index + 1 && styles.routeTypeActive]}
            onPress={() => setSelectedRoute(index + 1)}
          >
            <Text style={styles.routeTypeText}>Alt {index + 1}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Jumps</Text>
          <Text style={styles.statValue}>{currentRoute.jumps}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Estimated Time</Text>
          <Text style={styles.statValue}>{formatTime(routeSuggestion.estimated_time)}</Text>
        </View>
      </View>

      <View style={styles.riskCard}>
        <Text style={styles.cardTitle}>Risk Assessment</Text>
        <Text style={styles.riskText}>{routeSuggestion.risk_assessment}</Text>
      </View>

      {routeSuggestion.warnings.length > 0 && (
        <View style={styles.warningsCard}>
          <Text style={styles.cardTitle}>⚠️ Warnings</Text>
          {routeSuggestion.warnings.map((warning, index) => (
            <Text key={index} style={styles.warningText}>
              • {warning}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.systemsCard}>
        <Text style={styles.cardTitle}>Route Systems</Text>
        {currentRoute.systems.map((systemId, index) => (
          <View key={index} style={styles.systemItem}>
            <View style={styles.systemNumber}>
              <Text style={styles.systemNumberText}>{index + 1}</Text>
            </View>
            <Text style={styles.systemText}>System {systemId}</Text>
          </View>
        ))}
      </View>

      <View style={styles.aiSection}>
        <Text style={styles.cardTitle}>🤖 AI Recommendations</Text>
        <Text style={styles.aiText}>
          {selectedRoute === 0
            ? 'This is the shortest route available.'
            : 'This alternative route may be safer but takes longer.'}
        </Text>
        {routeSuggestion.warnings.length > 0 && (
          <Text style={styles.aiText}>
            Consider using an alternative route or traveling with a scout to avoid high-danger systems.
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  centerContainer: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
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
  routeTypeContainer: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  routeTypeButton: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  routeTypeActive: {
    backgroundColor: '#00d4ff',
    borderColor: '#00d4ff',
  },
  routeTypeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsCard: {
    flexDirection: 'row',
    margin: 15,
    marginTop: 0,
    gap: 10,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  statLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 5,
  },
  statValue: {
    color: '#00d4ff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  riskCard: {
    margin: 15,
    marginTop: 0,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  warningsCard: {
    margin: 15,
    marginTop: 0,
    backgroundColor: '#2a1a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff4444',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  riskText: {
    color: '#fff',
    fontSize: 14,
  },
  warningText: {
    color: '#ff8888',
    fontSize: 14,
    marginBottom: 5,
  },
  systemsCard: {
    margin: 15,
    marginTop: 0,
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  systemItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  systemNumber: {
    backgroundColor: '#00d4ff',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  systemNumberText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  systemText: {
    color: '#fff',
    fontSize: 14,
  },
  aiSection: {
    margin: 15,
    marginTop: 0,
    backgroundColor: '#1a2a1a',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  aiText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  loadingText: {
    color: '#888',
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default RouteMapScreen;
