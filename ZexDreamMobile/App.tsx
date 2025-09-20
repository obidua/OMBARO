import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
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

// Import context
import { AuthProvider } from './src/context/AuthContext';

const Stack = createStackNavigator();

export default function App() {
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
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="MobileInput" component={MobileInputScreen} />
            <Stack.Screen name="OTP" component={OTPScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
            <Stack.Screen name="Completion" component={CompletionScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AuthLogin" component={AuthLoginScreen} />
            <Stack.Screen name="EmployeeDashboard" component={EmployeeDashboardScreen} />
            <Stack.Screen name="VendorDashboard" component={VendorDashboardScreen} />
            <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}