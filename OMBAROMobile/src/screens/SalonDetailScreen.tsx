import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import { ServiceProvider } from '../types';

type SalonDetailScreenNavigationProp = StackNavigationProp<any, 'SalonDetail'>;
type SalonDetailScreenRouteProp = RouteProp<{ SalonDetail: { salon: ServiceProvider } }, 'SalonDetail'>;

interface Props {
  navigation: SalonDetailScreenNavigationProp;
  route: SalonDetailScreenRouteProp;
}

const SalonDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { salon } = route.params;
  const [activeTab, setActiveTab] = useState('services');

  const services = [
    { id: '1', name: 'Swedish Massage', price: 2500, duration: 90, description: 'Relaxing full body massage' },
    { id: '2', name: 'Deep Tissue Massage', price: 3200, duration: 120, description: 'Therapeutic muscle tension relief' },
    { id: '3', name: 'Aromatherapy Session', price: 4500, duration: 150, description: 'Essential oils with relaxation' },
  ];

  const reviews = [
    { id: '1', name: 'Priya S.', rating: 5, comment: 'Amazing service! Very professional.', date: '2 days ago' },
    { id: '2', name: 'Rahul K.', rating: 4, comment: 'Great experience overall.', date: '1 week ago' },
  ];

  const tabs = [
    { id: 'services', label: 'Services' },
    { id: 'photos', label: 'Photos' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <View style={styles.tabContent}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceMeta}>
                    <Text style={styles.serviceDuration}>⏱️ {service.duration} min</Text>
                    <Text style={styles.serviceRating}>⭐ 4.8</Text>
                  </View>
                </View>
                <View style={styles.servicePrice}>
                  <Text style={styles.priceText}>₹{service.price}</Text>
                  <Button
                    title="Add"
                    onPress={() => console.log('Add service:', service.id)}
                    size="sm"
                    style={styles.addButton}
                  />
                </View>
              </View>
            ))}
          </View>
        );
      case 'photos':
        return (
          <View style={styles.tabContent}>
            <View style={styles.photosGrid}>
              {Array.from({ length: 6 }).map((_, index) => (
                <View key={index} style={styles.photoCard}>
                  <Text style={styles.photoPlaceholder}>📷</Text>
                </View>
              ))}
            </View>
          </View>
        );
      case 'reviews':
        return (
          <View style={styles.tabContent}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewerAvatar}>
                    <Text style={styles.reviewerInitial}>{review.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.reviewerInfo}>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <View style={styles.reviewRating}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Text key={i} style={styles.star}>
                          {i < review.rating ? '⭐' : '☆'}
                        </Text>
                      ))}
                    </View>
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Image */}
      <View style={styles.headerImage}>
        <View style={styles.headerImagePlaceholder}>
          <Text style={styles.headerImageText}>🏢</Text>
        </View>
        <TouchableOpacity
          style={styles.backButtonOverlay}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>📤</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Salon Info */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>{salon.name}</Text>
          <Text style={styles.salonAddress}>📍 {salon.location.address} • {salon.distance}km</Text>
          <View style={styles.salonMeta}>
            <Text style={styles.rating}>⭐ {salon.rating}</Text>
            <Text style={styles.reviewCount}>({salon.reviewCount} reviews)</Text>
            <Text style={styles.openStatus}>• Open Now</Text>
          </View>
          
          {/* Specialties */}
          <View style={styles.specialties}>
            {salon.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyTag}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              title="📞 Call"
              onPress={() => console.log('Call salon')}
              variant="outline"
              style={styles.callButton}
            />
            <Button
              title="Book Now"
              onPress={() => navigation.navigate('Booking', { salon })}
              style={styles.bookButton}
            />
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <View style={styles.tabsHeader}>
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                style={[
                  styles.tab,
                  activeTab === tab.id && styles.tabActive
                ]}
                onPress={() => setActiveTab(tab.id)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.tabText,
                  activeTab === tab.id && styles.tabTextActive
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  headerImage: {
    height: 200,
    backgroundColor: colors.primary[100],
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImageText: {
    fontSize: 80,
  },
  backButtonOverlay: {
    position: 'absolute',
    top: spacing['4xl'],
    left: spacing.lg,
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  backButtonText: {
    fontSize: typography.xl,
    color: colors.gray[700],
  },
  headerActions: {
    position: 'absolute',
    top: spacing['4xl'],
    right: spacing.lg,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  actionButtonText: {
    fontSize: typography.base,
  },
  scrollView: {
    flex: 1,
  },
  salonInfo: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius['3xl'],
    borderTopRightRadius: borderRadius['3xl'],
    marginTop: -spacing['2xl'],
    padding: spacing['2xl'],
    position: 'relative',
    zIndex: 10,
  },
  salonName: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  salonAddress: {
    fontSize: typography.base,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  salonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
  openStatus: {
    fontSize: typography.sm,
    color: colors.success[600],
    marginLeft: spacing.xs,
  },
  specialties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing['2xl'],
  },
  specialtyTag: {
    backgroundColor: colors.primary[50],
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  specialtyText: {
    fontSize: typography.sm,
    color: colors.primary[700],
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  callButton: {
    flex: 1,
  },
  bookButton: {
    flex: 1,
  },
  tabsContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing['2xl'],
  },
  tabsHeader: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: borderRadius.lg,
  },
  tabActive: {
    backgroundColor: colors.white,
    ...shadows.sm,
  },
  tabText: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[600],
  },
  tabTextActive: {
    color: colors.primary[600],
  },
  tabContent: {
    paddingBottom: spacing['4xl'],
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  serviceDescription: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  serviceMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  serviceDuration: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  serviceRating: {
    fontSize: typography.sm,
    color: colors.warning[600],
  },
  servicePrice: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  addButton: {
    paddingHorizontal: spacing.lg,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  photoCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoPlaceholder: {
    fontSize: 32,
  },
  reviewCard: {
    backgroundColor: colors.gray[50],
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  reviewerInitial: {
    fontSize: typography.sm,
    color: colors.white,
    fontWeight: 'bold',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: typography.sm,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  star: {
    fontSize: typography.sm,
    marginRight: 2,
  },
  reviewDate: {
    fontSize: typography.xs,
    color: colors.gray[500],
  },
  reviewComment: {
    fontSize: typography.sm,
    color: colors.gray[700],
    lineHeight: typography.xl,
  },
});

export default SalonDetailScreen;