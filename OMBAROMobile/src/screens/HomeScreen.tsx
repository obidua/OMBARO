import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

type HomeScreenNavigationProp = StackNavigationProp<any, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { authState, logout } = useAuth();

  const categories = [
    { id: '1', name: 'Hair', icon: '✂️', color: '#F3E8FF' },
    { id: '2', name: 'Spa', icon: '✨', color: '#FCE7F3' },
    { id: '3', name: 'Skin', icon: '❤️', color: '#D1FAE5' },
    { id: '4', name: 'Nails', icon: '🎨', color: '#FEF3C7' },
    { id: '5', name: 'Ayurveda', icon: '🍃', color: '#ECFDF5' },
  ];

  const featuredSalons = [
    {
      id: '1',
      name: 'Serenity Spa & Wellness',
      address: 'MG Road, Bangalore',
      distance: 0.8,
      rating: 4.8,
      reviewCount: 324,
      image: '🏢',
      isOpen: true,
      specialties: ['Deep Tissue Massage', 'Aromatherapy'],
      priceRange: 'premium' as const,
    },
    {
      id: '2',
      name: 'Bliss Body Spa',
      address: 'Koramangala, Bangalore',
      distance: 1.2,
      rating: 4.6,
      reviewCount: 189,
      image: '🏢',
      isOpen: true,
      specialties: ['Hot Stone Massage', 'Reflexology'],
      priceRange: 'mid' as const,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationText}>Bangalore, Karnataka</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutText}>↗</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Hello, {authState.user.name || 'User'}! 👋
          </Text>
          <Text style={styles.welcomeSubtext}>
            What service are you looking for today?
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
              >
                <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                  <Text style={styles.categoryIconText}>{category.icon}</Text>
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Salons */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Near You</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.salonsContainer}>
            {featuredSalons.map((salon) => (
              <TouchableOpacity
                key={salon.id}
                style={styles.salonCard}
              >
                <View style={styles.salonImage}>
                  <Text style={styles.salonImageText}>{salon.image}</Text>
                  <View style={[
                    styles.statusBadge,
                    { backgroundColor: salon.isOpen ? '#10B981' : '#EF4444' }
                  ]}>
                    <Text style={styles.statusText}>
                      {salon.isOpen ? 'Open' : 'Closed'}
                    </Text>
                  </View>
                </View>
                <View style={styles.salonInfo}>
                  <Text style={styles.salonName}>{salon.name}</Text>
                  <Text style={styles.salonAddress}>
                    📍 {salon.address} • {salon.distance}km
                  </Text>
                  <View style={styles.salonMeta}>
                    <Text style={styles.rating}>⭐ {salon.rating}</Text>
                    <Text style={styles.reviewCount}>({salon.reviewCount})</Text>
                  </View>
                  <View style={styles.specialties}>
                    {salon.specialties.slice(0, 2).map((specialty, index) => (
                      <View key={index} style={styles.specialtyTag}>
                        <Text style={styles.specialtyText}>{specialty}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  locationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  logoutButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#8B5CF6',
    fontWeight: '500',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  salonsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  salonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  salonImage: {
    height: 120,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  salonImageText: {
    fontSize: 48,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  salonInfo: {
    padding: 16,
  },
  salonName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  salonAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 14,
    color: '#6B7280',
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#7C3AED',
    fontWeight: '500',
  },
});

export default HomeScreen;