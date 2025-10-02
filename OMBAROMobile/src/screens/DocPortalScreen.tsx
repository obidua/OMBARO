```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  ArrowLeft,
  Search,
  Book,
  Code,
  GitBranch,
  Database,
  Shield,
  Cloud,
  Layout,
  Smartphone,
  Palette,
  Zap,
  Users,
  DollarSign,
  FileText,
  BarChart3,
  Settings,
  Gavel,
  Headphones,
  UserCog,
  Building,
  Building2,
  Calculator,
  Monitor,
  List,
  Briefcase,
  Heart,
  Star,
  Megaphone,
  MessageSquare,
  MessageCircle,
  UserPlus,
  TrendingUp,
  Package,
  Calendar,
  CreditCard,
  PieChart,
  MegaphoneIcon,
  User,
  UserCheck,
  MapPin,
  Scale,
  AlertTriangle,
  CheckCircle,
  Clock,
  Gift,
  RotateCcw,
  Eye,
  Trash2,
  Ban,
  XCircle,
  Coffee,
  Home,
  Navigation,
  Loader2,
  Download,
  Upload,
  Award,
} from 'lucide-react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

type DocPortalScreenNavigationProp = StackNavigationProp<any, 'DocPortal'>;

interface Props {
  navigation: DocPortalScreenNavigationProp;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  content: string | DocSubsection[];
}

interface DocSubsection {
  id: string;
  title: string;
  content: string;
}

const DOC_CONTENT: DocSection[] = [
  {
    id: 'overview',
    title: 'Project Overview',
    icon: Book,
    content: [
      {
        id: 'project_summary',
        title: 'Project Summary',
        content: \`OMBARO is a comprehensive beauty and wellness platform designed to connect customers with spa, salon, and wellness service providers. It features multi-portal authentication for various user roles including customers, employees, vendors, and administrators, ensuring a tailored experience for each. The platform aims to provide seamless service discovery, booking, payment, and tracking functionalities.
        
        The project is structured into two main applications: a web application built with React, TypeScript, and Vite, and a mobile application built with React Native, Expo, and TypeScript. Both applications share core business logic, type definitions, and API integrations to maintain consistency and efficiency.`
      },
      {
        id: 'key_features',
        title: 'Key Features',
        content: `**Customer Portal:**
        - Service Discovery: Find nearby spas and wellness centers.
        - Booking System: Schedule appointments with real-time availability.
        - Payment Integration: Secure payment processing.
        - Order Tracking: Real-time tracking of service providers.
        - Review System: Rate and review completed services.
        
        **Employee Portal:**
        - Spa Onboarding: Add new spas to the platform.
        - Vendor Management: Manage spa partnerships.
        - Attendance Tracking: Self-attendance with location tagging.
        - Leave Management: Apply for and track leave requests.
        - HR Documents: Access salary slips and official documents.
        
        **Vendor Portal:**
        - Service Management: Add and manage offered services.
        - Booking Management: View and manage customer bookings.
        - Analytics Dashboard: Track performance and revenue.
        - Customer Reviews: Monitor and respond to feedback.
        
        **Admin Portal:**
        - User Management: Manage all platform users.
        - Spa Approval: Review and approve new spa registrations.
        - System Analytics: Platform-wide performance metrics.
        - Security Monitoring: Track system security and alerts.
        - Location Tracking: Monitor employee locations in real-time.`
      },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture Blueprint',
    icon: Layout,
    content: [
      {
        id: 'full_stack_overview',
        title: 'Full-Stack Overview',
        content: \`OMBARO employs a modern full-stack architecture designed for scalability, performance, and maintainability. It separates concerns between frontend clients (web and mobile) and a centralized backend API, with a robust database for data persistence.
        
        **Frontend:**
        - Web Application: React 18, TypeScript, Vite, Tailwind CSS, Lucide React.
        - Mobile Application: React Native with Expo, TypeScript, React Navigation, Expo Location, Expo Notifications.
        
        **Backend:** (Assumed based on typical Bolt projects, as backend details are not in provided READMEs)
        - Node.js/Express.js or similar for API layer.
        - Supabase for database, authentication, and edge functions.
        
        **Database:**
        - PostgreSQL (via Supabase) for structured data storage.`
      },
      {
        id: 'shared_components',
        title: 'Shared Components',
        content: \`To ensure consistency and reduce redundancy, both the web and mobile applications share several key components:
        - Type Definitions: Common TypeScript interfaces for data models (e.g., User, ServiceProvider, Booking).
        - Business Logic: Core functionalities like authentication, booking processes, and data manipulation logic.
        - API Integration: A shared service layer for communicating with the backend API, ensuring consistent data fetching and submission.
        - Design System: Consistent color palettes, spacing, and typography defined in shared theme constants.`
      },
    ],
  },
  {
    id: 'development_guide',
    title: 'Development Guide',
    icon: Code,
    content: [
      {
        id: 'getting_started_web',
        title: 'Getting Started (Web Application)',
        content: \`1.  **Install dependencies:**
            \`\`\`bash
            npm install
            \`\`\`
        2.  **Start development server:**
            \`\`\`bash
            npm run dev
            \`\`\`
        3.  **Build for production:**
            \`\`\`bash
            npm run build
            \`\`\`
        The web application uses Vite for fast development and build processes, and Tailwind CSS for utility-first styling.`
      },
      {
        id: 'getting_started_mobile',
        title: 'Getting Started (Mobile Application)',
        content: `1.  **Navigate to mobile directory:**
            \`\`\`bash
            cd OMBAROMobile
            \`\`\`
        2.  **Install dependencies:**
            \`\`\`bash
            npm install
            \`\`\`
        3.  **Start Expo development server:**
            \`\`\`bash
            npx expo start
            \`\`\`
        4.  **Run on platforms:**
            - iOS: Press \`i\` or scan QR with iOS device.
            - Android: Press \`a\` or scan QR with Android device.
        The mobile application leverages Expo for a streamlined development workflow and React Native StyleSheet for platform-specific styling.`
      },
      {
        id: 'code_organization',
        title: 'Code Organization',
        content: `**General Guidelines:**
        - Keep components under 200 lines for readability and maintainability.
        - Use TypeScript extensively for type safety across the entire codebase.
        - Implement proper error handling mechanisms for all API calls and critical operations.
        - Follow platform-specific best practices for UI/UX and performance.
        
        **Project Structure (Mobile Example):**
        \`\`\`
        OMBAROMobile/
        ├── src/
        │   ├── components/
        │   │   └── ui/           # Reusable UI components
        │   ├── context/          # React Context for state management
        │   ├── screens/          # Screen components
        │   ├── types/            # TypeScript type definitions
        │   └── utils/            # Utility functions
        ├── assets/               # Images, fonts, and other assets
        ├── app.json             # Expo configuration
        └── App.tsx              # Main app component
        \`\`\``
      },
      {
        id: 'styling_guidelines',
        title: 'Styling Guidelines',
        content: `**Web Application:**
        - Primarily use Tailwind CSS utility classes for rapid UI development and responsive design.
        - Custom CSS should be minimal and used only for complex, non-utility-based styles.
        
        **Mobile Application:**
        - Use \`StyleSheet.create\` for defining styles to optimize performance in React Native.
        - Adhere to platform design guidelines (Material Design for Android, Human Interface Guidelines for iOS).
        - Implement responsive design principles to ensure optimal display across various screen sizes.
        - Maintain visual consistency with the web application using shared design tokens (colors, spacing, typography).`
      },
      {
        id: 'state_management',
        title: 'State Management',
        content: `Both applications utilize React Context for global state management, suitable for sharing authentication status, user preferences, and other application-wide data.
        
        **Key Principles:**
        - Keep local component state minimal and focused on UI-specific concerns.
        - Implement clear loading and error states for asynchronous operations to provide good user feedback.`
      },
    ],
  },
  {
    id: 'api_integration',
    title: 'API Integration',
    icon: GitBranch,
    content: `The platform communicates with a centralized backend API for all data operations. A shared service layer handles API requests, responses, and error handling.
    
    **Environment Variables:**
    API URLs and other sensitive keys are managed via environment variables.
    
    **Web (.env):**
    \`\`\`
    VITE_API_URL=your_api_url
    VITE_MAPS_API_KEY=your_maps_api_key
    \`\`\`
    
    **Mobile (.env):**
    \`\`\`
    EXPO_PUBLIC_API_URL=your_api_url
    EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
    \`\`\`
    
    Ensure these variables are correctly configured in your local development environment and deployment pipelines.`
  },
  {
    id: 'database',
    title: 'Database Schema',
    icon: Database,
    content: `The primary database for OMBARO is PostgreSQL, managed via Supabase. Key entities include:
    
    **Users:**
    - \`id\`: Unique identifier (UUID)
    - \`name\`: Full name
    - \`email\`: Email address
    - \`mobile\`: Mobile number (unique)
    - \`gender\`: 'male' | 'female' | 'other'
    - \`dateOfBirth\`: Date of birth
    - \`isVerified\`: Boolean, indicates if mobile/email is verified
    - \`role\`: 'customer' | 'employee' | 'vendor' | 'admin' | 'super_admin' | 'department_role'
    - \`password\`: Hashed password (for portal users)
    - \`createdAt\`, \`updatedAt\`, \`lastLogin\`, \`status\` etc.
    
    **Service Providers (Spas/Salons):**
    - \`id\`: Unique identifier
    - \`name\`: Spa/Salon name
    - \`address\`: Physical address
    - \`latitude\`, \`longitude\`: Geographic coordinates
    - \`rating\`, \`reviewCount\`: Aggregated ratings and reviews
    - \`image\`: URL to main image
    - \`isOpen\`: Boolean, current operating status
    - \`specialties\`: Array of strings (e.g., 'Deep Tissue Massage', 'Hair Styling')
    - \`priceRange\`: 'budget' | 'mid' | 'premium'
    - \`contactInfo\`, \`website\`, \`socialMediaLinks\` etc.
    
    **Services (Offered by Providers):**
    - \`id\`: Unique identifier
    - \`name\`: Service name (e.g., 'Swedish Massage', 'Hair Cut')
    - \`description\`: Detailed description
    - \`price\`: Base price
    - \`duration\`: Duration in minutes
    - \`category\`: 'massage' | 'spa' | 'facial' | 'hair' | 'nails' etc.
    - \`image\`: URL to service image
    - \`providerId\`: Foreign key to Service Providers
    
    **Bookings:**
    - \`id\`: Unique identifier
    - \`userId\`: Foreign key to Users (customer)
    - \`providerId\`: Foreign key to Service Providers
    - \`serviceIds\`: Array of service IDs booked
    - \`scheduledDateTime\`: Date and time of appointment
    - \`totalAmount\`: Total booking cost
    - \`status\`: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
    - \`paymentStatus\`: 'pending' | 'paid' | 'failed'
    - \`customerAddress\`: Address for home services
    - \`therapistId\`: Foreign key to Employees (if assigned)
    - \`createdAt\`, \`updatedAt\` etc.
    
    **Employees:**
    - \`id\`: Unique identifier
    - \`employeeId\`: Internal employee ID
    - \`name\`, \`email\`, \`mobile\`, \`department\`, \`designation\` etc.
    - \`profilePhoto\`: URL to employee photo
    - \`status\`: 'active' | 'inactive' | 'terminated'
    
    **Attendance & Leave:**
    - Separate tables for tracking employee attendance (check-in/out, location) and leave requests (type, dates, status).
    
    **Reviews:**
    - \`id\`: Unique identifier
    - \`bookingId\`: Foreign key to Bookings
    - \`userId\`: Foreign key to Users
    - \`providerId\`: Foreign key to Service Providers
    - \`rating\`: 1-5 stars
    - \`comment\`: Text review
    - \`photos\`: Array of photo URLs
    - \`createdAt\`
    
    This schema provides a foundation for managing all core operations of the OMBARO platform.`
  },
  {
    id: 'security',
    title: 'Security Considerations',
    icon: Shield,
    content: `Security is paramount for OMBARO, especially given the sensitive nature of personal and financial data.
    
    **Authentication & Authorization:**
    - Multi-portal authentication ensures role-based access control.
    - Passwords are to be securely hashed (e.g., bcrypt).
    - JWTs (JSON Web Tokens) or session-based authentication for API access.
    - Implement robust authorization checks on the backend for all data access and modifications.
    
    **Data Protection:**
    - All data in transit (API communication) must be encrypted using HTTPS/SSL.
    - Sensitive data at rest (database) should be encrypted where appropriate.
    - Regular database backups and disaster recovery plans.
    
    **Identity Verification:**
    - Aadhaar OTP verification for customers adds an extra layer of identity confirmation for secure bookings.
    
    **Zero Tolerance Policy:**
    - Strict enforcement of the platform's zero-tolerance policy against inappropriate activities, human trafficking, or exploitation. This includes clear terms & conditions, reporting mechanisms, and cooperation with law enforcement.`
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Cloud,
    content: [
      {
        id: 'web_deployment',
        title: 'Web Application Deployment',
        content: `The web application is a static site that can be deployed to any static hosting provider.
        
        **Build Command:**
        \`\`\`bash
        npm run build
        \`\`\`
        
        **Recommended Platforms:**
        - Netlify
        - Vercel
        - Bolt Hosting (for integrated hosting solutions)
        
        Ensure environment variables (\`VITE_API_URL\`, \`VITE_MAPS_API_KEY\`) are configured correctly in the deployment environment.`
      },
      {
        id: 'mobile_deployment',
        title: 'Mobile Application Deployment',
        content: `The mobile application uses Expo for building and distribution.
        
        **Development:**
        - Use Expo Go app for quick testing on physical devices during development.
        
        **Production Builds:**
        - Build standalone apps for iOS and Android using Expo's build service:
          \`\`\`bash
          npx expo build:android
          npx expo build:ios
          \`\`\`
        
        **Distribution:**
        - Submit the built binaries to Google Play Store and Apple App Store.
        - Follow platform-specific guidelines and requirements for app store listings.
        
        Ensure environment variables (\`EXPO_PUBLIC_API_URL\`, \`EXPO_PUBLIC_MAPS_API_KEY\`) are correctly set in \`app.json\` or via Expo's build configuration.`
      },
    ],
  },
];

const DocPortalScreen: React.FC<Props> = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [activeSubsection, setActiveSubsection] = useState<string>('project_summary');
  const [searchQuery, setSearchQuery] = useState('');

  const currentSection = DOC_CONTENT.find(section => section.id === activeSection);

  const filteredSections = DOC_CONTENT.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (Array.isArray(section.content) &&
      section.content.some(subsection =>
        subsection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        subsection.content.toLowerCase().includes(searchQuery.toLowerCase())
      ))
  );

  const renderContent = () => {
    if (!currentSection) return <Text style={styles.noContentText}>Select a section from the sidebar.</Text>;

    if (typeof currentSection.content === 'string') {
      return <Text style={styles.contentText}>{currentSection.content}</Text>;
    }

    const currentSub = currentSection.content.find(sub => sub.id === activeSubsection);
    if (currentSub) {
      return (
        <ScrollView style={styles.contentScrollView} showsVerticalScrollIndicator={false}>
          <Text style={styles.contentTitle}>{currentSub.title}</Text>
          <Text style={styles.contentText}>{currentSub.content}</Text>
        </ScrollView>
      );
    }

    return <Text style={styles.noContentText}>Select a subsection.</Text>;
  };

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
        <Text style={styles.headerTitle}>OMBARO Development Docs</Text>
        <View style={styles.spacer} />
      </View>

      <View style={styles.mainContent}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          <View style={styles.searchContainer}>
            <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search documentation..."
              placeholderTextColor={colors.gray[500]}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView style={styles.sidebarScrollView} showsVerticalScrollIndicator={false}>
            {filteredSections.map((section) => (
              <View key={section.id}>
                <TouchableOpacity
                  style={[
                    styles.sectionHeader,
                    activeSection === section.id && styles.sectionHeaderActive,
                  ]}
                  onPress={() => {
                    setActiveSection(section.id);
                    if (Array.isArray(section.content) && section.content.length > 0) {
                      setActiveSubsection(section.content[0].id);
                    } else {
                      setActiveSubsection('');
                    }
                  }}
                >
                  {React.createElement(section.icon, { size: 20, color: activeSection === section.id ? colors.primary[600] : colors.gray[700] })}
                  <Text
                    style={[
                      styles.sectionTitle,
                      activeSection === section.id && styles.sectionTitleActive,
                    ]}
                  >
                    {section.title}
                  </Text>
                </TouchableOpacity>
                {activeSection === section.id && Array.isArray(section.content) && (
                  <View style={styles.subsectionContainer}>
                    {section.content.map((subsection) => (
                      <TouchableOpacity
                        key={subsection.id}
                        style={[
                          styles.subsectionItem,
                          activeSubsection === subsection.id && styles.subsectionItemActive,
                        ]}
                        onPress={() => setActiveSubsection(subsection.id)}
                      >
                        <Text
                          style={[
                            styles.subsectionText,
                            activeSubsection === subsection.id && styles.subsectionTextActive,
                          ]}
                        >
                          {subsection.title}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
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
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.gray[100],
    paddingVertical: spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.sm,
    marginBottom: spacing.md,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: typography.base,
    color: colors.gray[900],
  },
  sidebarScrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  sectionHeaderActive: {
    backgroundColor: colors.primary[50],
  },
  sectionTitle: {
    fontSize: typography.base,
    fontWeight: '500',
    color: colors.gray[700],
    marginLeft: spacing.sm,
  },
  sectionTitleActive: {
    color: colors.primary[600],
  },
  subsectionContainer: {
    marginLeft: spacing.xl,
    paddingLeft: spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: colors.gray[200],
    marginBottom: spacing.sm,
  },
  subsectionItem: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  subsectionItemActive: {
    backgroundColor: colors.primary[50],
  },
  subsectionText: {
    fontSize: typography.sm,
    color: colors.gray[600],
  },
  subsectionTextActive: {
    fontWeight: '600',
    color: colors.primary[700],
  },
  contentArea: {
    flex: 1,
    padding: spacing.lg,
  },
  contentScrollView: {
    flex: 1,
  },
  contentTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  contentText: {
    fontSize: typography.base,
    color: colors.gray[700],
    lineHeight: typography.lg,
  },
  noContentText: {
    fontSize: typography.base,
    color: colors.gray[500],
    textAlign: 'center',
    marginTop: spacing['5xl'],
  },
});

export default DocPortalScreen;
```