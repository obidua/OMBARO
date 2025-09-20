import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

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
    <LinearGradient
      colors={['#F3E8FF', '#FCE7F3', '#EEF2FF']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Success Animation */}
          <Animated.View style={[
            styles.successSection,
            { transform: [{ scale: scaleValue }] }
          ]}>
            <View style={styles.successIconContainer}>
              <LinearGradient
                colors={['#10B981', '#059669']}
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
              Welcome to ZexDream, {authState.user.name}! 🎉
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
                <View style={[styles.stepNumber, { backgroundColor: '#F3E8FF' }]}>
                  <Text style={styles.stepNumberText}>1</Text>
                </View>
                <Text style={styles.stepText}>Explore salons and spas near you</Text>
              </View>
              <View style={styles.stepItem}>
                <View style={[styles.stepNumber, { backgroundColor: '#FCE7F3' }]}>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  successIconContainer: {
    position: 'relative',
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  successIconText: {
    fontSize: 48,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  sparkleIcon: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: '#FCD34D',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleText: {
    fontSize: 16,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  welcomeDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  profileSummary: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  stepsSection: {
    marginBottom: 32,
  },
  stepsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepsList: {
    gap: 12,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B5CF6',
  },
  stepText: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  continueButton: {
    width: '100%',
  },
});

export default CompletionScreen;