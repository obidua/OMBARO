import React, { useState } from 'react';
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
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type BookingHistoryScreenNavigationProp = StackNavigationProp<any, 'BookingHistory'>;

interface Props {
  navigation: BookingHistoryScreenNavigationProp;
}

interface Booking {
  id: string;
  salonName: string;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  rating?: number;
}

const BookingHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings: Booking[] = [
    {
      id: 'BK001',
      salonName: 'Serenity Spa & Wellness',
      serviceName: 'Swedish Full Body Massage',
      date: '2025-01-15',
      time: '14:30',
      price: 2500,
      status: 'upcoming'
    },
    {
      id: 'BK002',
      salonName: 'Bliss Body Spa',
      serviceName: 'Aromatherapy Spa Treatment',
      date: '2025-01-18',
      time: '16:00',
      price: 4500,
      status: 'upcoming'
    }
  ];

  const pastBookings: Booking[] = [
    {
      id: 'BK003',
      salonName: 'Ayurvedic Wellness Center',
      serviceName: 'Deep Tissue Massage',
      date: '2025-01-08',
      time: '11:00',
      price: 3200,
      status: 'completed',
      rating: 5
    },
    {
      id: 'BK004',
      salonName: 'Serenity Spa & Wellness',
      serviceName: 'Hot Stone Massage',
      date: '2025-01-02',
      time: '15:30',
      price: 2800,
      status: 'completed',
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.primary[100];
      case 'completed': return colors.success[100];
      case 'cancelled': return colors.error[100];
      default: return colors.gray[100];
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.primary[700];
      case 'completed': return colors.success[700];
      case 'cancelled': return colors.error[700];
      default: return colors.gray[700];
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => console.log('View booking details:', item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.bookingImage}>
        <Text style={styles.bookingImageText}>🏢</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={[styles.statusText, { color: getStatusTextColor(item.status) }]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.bookingInfo}>
        <Text style={styles.serviceName}>{item.serviceName}</Text>
        <Text style={styles.salonName}>{item.salonName}</Text>
        <View style={styles.bookingMeta}>
          <Text style={styles.bookingDate}>📅 {formatDate(item.date)}</Text>
          <Text style={styles.bookingTime}>⏰ {item.time}</Text>
        </View>
        <Text style={styles.bookingPrice}>₹{item.price}</Text>
        
        {item.rating && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Your rating:</Text>
            <View style={styles.ratingStars}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Text key={i} style={styles.star}>
                  {i < item.rating! ? '⭐' : '☆'}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const currentBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

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
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={styles.spacer} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsHeader}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'upcoming' && styles.tabActive
            ]}
            onPress={() => setActiveTab('upcoming')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'upcoming' && styles.tabTextActive
            ]}>
              Upcoming ({upcomingBookings.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'past' && styles.tabActive
            ]}
            onPress={() => setActiveTab('past')}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.tabText,
              activeTab === 'past' && styles.tabTextActive
            ]}>
              Past ({pastBookings.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bookings List */}
      <View style={styles.content}>
        {currentBookings.length > 0 ? (
          <FlatList
            data={currentBookings}
            renderItem={renderBookingItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyTitle}>
              No {activeTab === 'upcoming' ? 'Upcoming' : 'Past'} Bookings
            </Text>
            <Text style={styles.emptyDescription}>
              {activeTab === 'upcoming' 
                ? 'Book your next spa session to relax and rejuvenate'
                : 'Your completed bookings will appear here'
              }
            </Text>
            {activeTab === 'upcoming' && (
              <Button
                title="Book Now"
                onPress={() => navigation.navigate('MapView')}
                style={styles.bookNowButton}
              />
            )}
          </View>
        )}
      </View>
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
  tabsContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tabsHeader: {
    flexDirection: 'row',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.xl,
    padding: spacing.xs,
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
  content: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  bookingCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  bookingImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
    position: 'relative',
  },
  bookingImageText: {
    fontSize: 32,
  },
  statusBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  bookingInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  salonName: {
    fontSize: typography.sm,
    color: colors.gray[600],
    marginBottom: spacing.sm,
  },
  bookingMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.sm,
  },
  bookingDate: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  bookingTime: {
    fontSize: typography.sm,
    color: colors.gray[500],
  },
  bookingPrice: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.primary[600],
    marginBottom: spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingLabel: {
    fontSize: typography.xs,
    color: colors.gray[500],
    marginRight: spacing.sm,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  star: {
    fontSize: typography.sm,
    marginRight: 2,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: typography.base,
    color: colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing['2xl'],
  },
  bookNowButton: {
    paddingHorizontal: spacing['3xl'],
  },
});

export default BookingHistoryScreen;