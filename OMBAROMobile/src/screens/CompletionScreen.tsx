import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type CompletionScreenNavigationProp = StackNavigationProp<any, 'Completion'>;

interface Props {
  navigation: CompletionScreenNavigationProp;
}

const CompletionScreen: React.FC<Props> = ({ navigation }) => {
  const { authState } = useAuth();
  const scaleValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 50,
      friction: 7,
    }).start();
  }, []);

  const handleContinue = () => {
    navigation.navigate('Home');
  };

  return (
    <LinearGradient colors={[colors.primary[50], colors.secondary[50], '#EEF2FF']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Success Animation */}
            <Animated.View style={[
              styles.successSection,
              { transform: [{ scale: scaleValue }] }
            ]}>
              <View style={styles.successIconContainer}>
                <LinearGradient
                  colors={[colors.success[500], colors.success[600]]}
                  style={styles.successIcon}
                >
                  <Text style={styles.successIconText}>✓</Text>
                </LinearGradient>
                <View style={styles.sparkleIcon}>
                  <Text style={styles.sparkleText}>✨</Text>
                </View>
              </View>
            </Animated.View>

            {/* Welcome Message */}
            <View style={styles.messageSection}>
              <Text style={styles.welcomeTitle}>
                Welcome to OMBARO, {authState.user.name}! 🎉
              </Text>
              <Text style={styles.welcomeDescription}>
                Your profile has been successfully created. You're all set to discover 
                amazing beauty and wellness services near you.
              </Text>
              
              {/* User Info Summary */}
              <View style={styles.profileSummary}>
                <Text style={styles.summaryTitle}>Your Profile</Text>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Name:</Text>
                  <Text style={styles.summaryValue}>{authState.user.name}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Email:</Text>
                  <Text style={styles.summaryValue}>{authState.user.email}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Mobile:</Text>
                  <Text style={styles.summaryValue}>+91 {authState.user.mobile}</Text>
                </View>
                <View style={styles.summaryItem}>
                  <Text style={styles.summaryLabel}>Gender:</Text>
                  <Text style={[styles.summaryValue, styles.capitalize]}>{authState.user.gender}</Text>
                </View>
              </View>
            </View>

            {/* Next Steps */}
            <View style={styles.stepsSection}>
              <Text style={styles.stepsTitle}>What's Next?</Text>
              <View style={styles.stepsList}>
                <View style={styles.stepItem}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.primary[100] }]}>
                    <Text style={styles.stepNumberText}>1</Text>
                  </View>
                  <Text style={styles.stepText}>Explore salons and spas near you</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={[styles.stepNumber, { backgroundColor: colors.secondary[100] }]}>
                    <Text style={styles.stepNumberText}>2</Text>
                  </View>
                  <Text style={styles.stepText}>Book your first appointment</Text>
                </View>
                <View style={styles.stepItem}>
                  <View style={[styles.stepNumber, { backgroundColor: '#EEF2FF' }]}>
                    <Text style={styles.stepNumberText}>3</Text>
                  </View>
                  <Text style={styles.stepText}>Enjoy premium beauty services</Text>
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <Button
              title="Start Exploring →"
              onPress={handleContinue}
              size="lg"
              style={styles.continueButton}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing['2xl'],
    justifyContent: 'center',
    minHeight: 600,
    paddingVertical: spacing['2xl'],
  },
  successSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  successIconContainer: {
    position: 'relative',
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.xl,
  },
  successIconText: {
    fontSize: spacing['4xl'],
    color: colors.white,
    fontWeight: 'bold',
  },
  sparkleIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: colors.warning[400],
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleText: {
    fontSize: typography.base,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: spacing['4xl'],
  },
  welcomeTitle: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  welcomeDescription: {
    fontSize: typography.base,
    color: colors.gray[600],
    textAlign: 'center',
    lineHeight: typography['2xl'],
    marginBottom: spacing['2xl'],
  },
  profileSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: borderRadius.xl,
    padding: spacing['2xl'],
    width: '100%',
    ...shadows.lg,
  },
  summaryTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryLabel: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  summaryValue: {
    fontSize: typography.sm,
    fontWeight: '500',
    color: colors.gray[900],
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  stepsSection: {
    marginBottom: spacing['3xl'],
  },
  stepsTitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  stepsList: {
    gap: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    fontSize: typography.sm,
    fontWeight: 'bold',
    color: colors.primary[600],
  },
  stepText: {
    fontSize: typography.base,
    color: colors.gray[600],
    flex: 1,
  },
  continueButton: {
    width: '100%',
  },
});

export default CompletionScreen;