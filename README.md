# OMBARO - Beauty & Wellness Platform

A comprehensive beauty and wellness platform with both web and mobile applications, featuring multi-portal authentication for customers, employees, vendors, therapists, and administrators.

## Project Structure

This repository contains two main applications:

### 1. Web Application (Current Directory)
- **Technology**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Features**: Responsive web interface, PWA capabilities
- **Target**: Desktop and mobile browsers

### 2. Mobile Application (`/OmbaroMobile`)
- **Technology**: React Native + Expo + TypeScript
- **Styling**: React Native StyleSheet
- **Features**: Native mobile experience for iOS and Android
- **Target**: iOS and Android app stores

## Features

### Customer Portal
- **Service Discovery**: Find nearby spas and wellness centers
- **Booking System**: Schedule appointments with real-time availability
- **Payment Integration**: Secure payment processing
- **Order Tracking**: Real-time tracking of service providers
- **Review System**: Rate and review completed services

### Employee Portal
- **Spa Onboarding**: Add new spas to the platform
- **Vendor Management**: Manage spa partnerships
- **Attendance Tracking**: Self-attendance with location tagging
- **Leave Management**: Apply for and track leave requests
- **HR Documents**: Access salary slips and official documents

### Vendor Portal
- **Service Management**: Add and manage offered services
- **Booking Management**: View and manage customer bookings
- **Therapist Management**: Add, manage, and assign therapists to bookings
- **Task Assignment**: Assign spa services to therapists with scheduling
- **Analytics Dashboard**: Track performance and revenue
- **Customer Reviews**: Monitor and respond to feedback

### Therapist Portal
- **Assignment Dashboard**: View and manage assigned tasks
- **Schedule Management**: Manage availability and working hours
- **Leave Requests**: Apply for and track leave requests
- **Location Tracking**: Real-time location sharing during service
- **Performance Metrics**: Track ratings, earnings, and completion rates

### Admin Portal
- **User Management**: Manage all platform users
- **Spa Approval**: Review and approve new spa registrations
- **System Analytics**: Platform-wide performance metrics
- **Security Monitoring**: Track system security and alerts
- **Location Tracking**: Monitor employee locations in real-time

## Getting Started

### Web Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

### Mobile Application

1. Navigate to mobile directory:
   ```bash
   cd ZexDreamMobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start Expo development server:
   ```bash
   npx expo start
   ```

4. Run on platforms:
   - iOS: Press `i` or scan QR with iOS device
   - Android: Press `a` or scan QR with Android device

## Technology Stack

### Web Application
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **Build Tool**: Vite
- **Deployment**: Static hosting (Netlify, Vercel)

### Mobile Application
- **Framework**: React Native with Expo
- **Navigation**: React Navigation 6
- **Location**: Expo Location
- **Notifications**: Expo Notifications
- **Styling**: React Native StyleSheet
- **State Management**: React Context
- **Build**: Expo Build Service

## Shared Components

Both applications share:
- **Type Definitions**: Common TypeScript interfaces
- **Business Logic**: Authentication, booking, and data management
- **API Integration**: Shared service layer for backend communication
- **Design System**: Consistent colors, spacing, and typography

## Development Guidelines

### Code Organization
- Keep components under 200 lines
- Use TypeScript for type safety
- Implement proper error handling
- Follow platform-specific best practices

### Styling
- **Web**: Use Tailwind CSS utility classes
- **Mobile**: Use React Native StyleSheet with consistent design tokens
- Maintain visual consistency across platforms

### State Management
- Use React Context for global state
- Keep local state minimal and focused
- Implement proper loading and error states

## Deployment

### Web Application
- Build: `npm run build`
- Deploy to static hosting providers
- Configure environment variables

### Mobile Application
- **Development**: Use Expo Go for testing
- **Production**: Build standalone apps with `expo build`
- **Distribution**: Submit to App Store and Google Play

## Environment Setup

### Web (.env)
```
VITE_API_URL=your_api_url
VITE_MAPS_API_KEY=your_maps_api_key
```

### Mobile (.env)
```
EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

## Contributing

1. Follow existing code patterns and conventions
2. Write tests for new features
3. Update documentation as needed
4. Test on both web and mobile platforms
5. Ensure responsive design for web
6. Test on both iOS and Android for mobile

## License

This project is proprietary software. All rights reserved.

## Support

For technical support or questions, please contact the development team.