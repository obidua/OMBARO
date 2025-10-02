# OMBARO Mobile

React Native mobile application for OMBARO - Your Beauty & Wellness Platform, built with Expo.

## Features

- **Multi-Portal Authentication**: Customer, Employee, Vendor, and Admin portals
- **Location-Based Services**: Find nearby spas and wellness centers
- **Service Booking**: Book appointments with real-time availability
- **Real-Time Tracking**: Track service providers and appointments
- **Secure Payments**: Multiple payment options with secure processing
- **Review System**: Rate and review services
- **Admin Management**: Complete admin panel for platform management

## Tech Stack

- **React Native** with TypeScript
- **Expo** for development and deployment
- **React Navigation** for navigation
- **Expo Location** for geolocation services
- **Expo Notifications** for push notifications
- **Linear Gradient** for beautiful UI effects

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Navigate to the mobile app directory:
   ```bash
   cd OMBAROMobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your physical device

## Project Structure

```
OMBAROMobile/
├── src/
│   ├── components/
│   │   └── ui/           # Reusable UI components
│   ├── context/          # React Context for state management
│   ├── screens/          # Screen components
│   ├── types/            # TypeScript type definitions
│   ├── lib/              # Supabase client and utilities
│   └── services/         # API service layers
├── assets/               # Images, fonts, and other assets
├── app.json             # Expo configuration
└── App.tsx              # Main app component
```

## Key Differences from Web Version

### Navigation
- Uses React Navigation instead of state-based routing
- Stack navigation with gesture support
- Native transitions and animations

### Styling
- React Native StyleSheet instead of Tailwind CSS
- Platform-specific styling considerations
- Native component styling patterns

### Platform Features
- Native geolocation with Expo Location
- Push notifications with Expo Notifications
- Camera access for image uploads
- Native date/time pickers
- Platform-specific UI patterns

### Performance
- Optimized for mobile performance
- Lazy loading of screens
- Efficient list rendering with FlatList
- Image optimization and caching

## Development Guidelines

### Code Organization
- Keep components small and focused (under 200 lines)
- Use TypeScript for type safety
- Follow React Native best practices
- Implement proper error handling

### Styling
- Use StyleSheet.create for performance
- Follow platform design guidelines
- Implement responsive design for different screen sizes
- Use consistent spacing and typography

### State Management
- Use React Context for global state
- Keep local state minimal
- Implement proper loading and error states

## Building for Production

### Android
```bash
npx expo build:android
```

### iOS
```bash
npx expo build:ios
```

### App Store Deployment
1. Build production apps using Expo's build service
2. Test thoroughly on physical devices
3. Submit to Google Play Store and Apple App Store
4. Follow platform-specific guidelines and requirements

## Environment Variables

Create a `.env` file in the root directory:

```
EXPO_PUBLIC_SUPABASE_URL=https://0ec90b57d6e95fcbda19832f.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

## Database Integration

The mobile app connects to the same Supabase backend as the web application, providing:
- Real-time data synchronization
- Row Level Security for data protection
- User authentication with email/password
- Multi-role portal access (Customer, Employee, Vendor, Admin, Therapist)

## Contributing

1. Follow the existing code style and patterns
2. Write tests for new features
3. Update documentation as needed
4. Test on both iOS and Android platforms

## License

This project is proprietary software. All rights reserved.