import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { ServiceProvider, Location } from '../types';

type MapViewScreenNavigationProp = StackNavigationProp<any, 'MapView'>;
type MapViewScreenRouteProp = RouteProp<{ MapView: { initialSelectedProviderId?: string } }, 'MapView'>;

interface Props {
  navigation: MapViewScreenNavigationProp;
  route: MapViewScreenRouteProp;
}

const MapViewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { initialSelectedProviderId } = route.params || {};
  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [cartItems, setCartItems] = useState<any[]>([]);

  // Mock user location (Bangalore)
  const userLocation: Location = {
    latitude: 12.9716,
    longitude: 77.5946,
    address: 'Bangalore, Karnataka'
  };

  // Mock nearby spa providers
  const nearbyProviders: ServiceProvider[] = [
    {
      id: '1',
      name: 'Serenity Spa & Wellness',
      rating: 4.8,
      reviewCount: 324,
      distance: 0.8,
      location: { latitude: 12.9716, longitude: 77.5946, address: 'MG Road, Bangalore' },
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Deep Tissue Massage', 'Aromatherapy', 'Hot Stone'],
      priceRange: 'premium',
      services: []
    },
    {
      id: '2',
      name: 'Bliss Body Spa',
      rating: 4.6,
      reviewCount: 189,
      distance: 1.2,
      location: { latitude: 12.9352, longitude: 77.6245, address: 'Koramangala, Bangalore' },
      image: 'https://images.pexels.com/photos/3738673/pexels-photo-3738673.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Hot Stone Massage', 'Reflexology', 'Body Wraps'],
      priceRange: 'mid',
      services: []
    },
    {
      id: '3',
      name: 'Ayurvedic Wellness Center',
      rating: 4.9,
      reviewCount: 456,
      distance: 2.1,
      location: { latitude: 12.9719, longitude: 77.6412, address: 'Indiranagar, Bangalore' },
      image: 'https://images.pexels.com/photos/3985360/pexels-photo-3985360.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAvailable: true,
      specialties: ['Ayurvedic Massage', 'Panchakarma', 'Herbal Treatments'],
      priceRange: 'premium',
      services: []
    }
  ];

  useEffect(() => {
    if (initialSelectedProviderId) {
      const provider = nearbyProviders.find(p => p.id === initialSelectedProviderId);
      if (provider) {
        setSelectedProvider(provider);
      }
    }
  }, [initialSelectedProviderId]);

  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    navigation.navigate('SalonDetail', { salon: provider });
  };

  const renderProviderItem = ({ item }: { item: ServiceProvider }) => (
    <TouchableOpacity
      style={[
        styles.providerCard,
        selectedProvider?.id === item.id && styles.providerCardSelected
      ]}
      onPress={() => handleProviderSelect(item)}
      activeOpacity={0.7}
    >
      <View style={styles.providerImage}>
        <Text style={styles.providerImageText}>🏢</Text>
        {item.isAvailable && (
          <View style={styles.availableBadge}>
            <Text style={styles.availableText}>Available</Text>
          </View>
        )}
      </View>
      <View style={styles.providerInfo}>
        <Text style={styles.providerName}>{item.name}</Text>
        <Text style={styles.providerAddress}>{item.location.address}</Text>
        <View style={styles.providerMeta}>
          <Text style={styles.rating}>⭐ {item.rating}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          <Text style={styles.distance}>• {item.distance}km</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find Spas Near You</Text>
        <View style={styles.spacer} />
      </View>

      {/* View Toggle */}
      <View style={styles.viewToggle}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'map' && styles.toggleButtonActive
            ]}
            onPress={() => setViewMode('map')}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleIcon}>🗺️</Text>
            <Text style={[
              styles.toggleText,
              viewMode === 'map' && styles.toggleTextActive
            ]}>
              Map
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.toggleButtonActive
            ]}
            onPress={() => setViewMode('list')}
            activeOpacity={0.7}
          >
            <Text style={styles.toggleIcon}>📋</Text>
            <Text style={[
              styles.toggleText,
              viewMode === 'list' && styles.toggleTextActive
            ]}>
              List
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {viewMode === 'map' ? (
          <View style={styles.mapContainer}>
            <View style={styles.mapPlaceholder}>
              <Text style={styles.mapIcon}>🗺️</Text>
              <Text style={styles.mapText}>Interactive Map View</Text>
              <Text style={styles.mapSubtext}>
                Showing {nearbyProviders.length} providers within 5km
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={nearbyProviders}
            renderItem={renderProviderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      {/* Selected Provider Info */}
      {selectedProvider && (
        <View style={styles.selectedProviderInfo}>
          <Text style={styles.selectedProviderName}>{selectedProvider.name}</Text>
          <Text style={styles.selectedProviderAddress}>{selectedProvider.location.address}</Text>
          <Button
            title="View Details"
            onPress={() => navigation.navigate('SalonDetail', { salon: selectedProvider })}
            size="md"
            style={styles.viewDetailsButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
    ...shadows.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: typography.xl,
    color: colors.gray[700],
  },
  headerTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
  },
  spacer: {
    width: 40,
  },
  viewToggle: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  toggleButtonActive: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  toggleIcon: {
    fontSize: typography.base,
    marginRight: spacing.sm,
  },
  toggleText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[600],
  },
  toggleTextActive: {
    color: colors.primary[600],
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    margin: spacing.lg,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  mapIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  mapText: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  mapSubtext: {
    fontSize: typography.sm,
    color: colors.gray[600],
    textAlign: 'center',
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.gray[100],
    ...shadows.sm,
  },
  providerCardSelected: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  providerImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
    position: 'relative',
  },
  providerImageText: {
    fontSize: 32,
  },
  availableBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: colors.success[500],
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  availableText: {
    fontSize: 10,
    color: colors.white,
    fontWeight: '600',
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  providerAddress: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: typography.sm,
    color: colors.warning[600],
    fontWeight: '500',
  },
  reviewCount: {
    fontSize: typography.sm,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  distance: {
    fontSize: typography.sm,
    color: colors.gray[500],
    marginLeft: spacing.xs,
  },
  selectedProviderInfo: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
    padding: spacing.lg,
    ...shadows.lg,
  },
  selectedProviderName: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  selectedProviderAddress: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.lg,
  },
  viewDetailsButton: {
    width: '100%',
  },
});

export default MapViewScreen;