import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { supabase } from './src/lib/supabase';

import WelcomeScreen from './src/screens/WelcomeScreen';
import MobileInputScreen from './src/screens/MobileInputScreen';
import OTPScreen from './src/screens/OTPScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import CompletionScreen from './src/screens/CompletionScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthLoginScreen from './src/screens/AuthLoginScreen';
import EmployeeDashboardScreen from './src/screens/EmployeeDashboardScreen';
import VendorDashboardScreen from './src/screens/VendorDashboardScreen';
import AdminDashboardScreen from './src/screens/AdminDashboardScreen';
import MapViewScreen from './src/screens/MapViewScreen';
import SalonDetailScreen from './src/screens/SalonDetailScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import BookingHistoryScreen from './src/screens/BookingHistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RescheduleBookingScreen from './src/screens/RescheduleBookingScreen';
import ChatScreen from './src/screens/ChatScreen';
import SpaOnboardingScreen from './src/screens/SpaOnboardingScreen';
import DocPortalScreen from './src/screens/DocPortalScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            {/* Authentication Flow */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="MobileInput" component={MobileInputScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="Completion" component={CompletionScreen} />
            
            {/* Portal Authentication */}
            <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
            <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardScreen} />
            <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
            <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
            <Stack.Screen name="SpaOnboarding" component={SpaOnboardingScreen} />
            <Stack.Screen name="DocPortal" component={DocPortalScreen} />
            
            {/* Customer Flow */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MapView" component={MapViewScreen} />
            <Stack.Screen name="SalonDetail" component={SalonDetailScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="OrderTracking" component={OrderTrackingScreen} />
            <Stack.Screen name="BookingHistory" component={BookingHistoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="RescheduleBooking" component={RescheduleBookingScreen} />
            <Stack.Screen name="Chat" component={ChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}