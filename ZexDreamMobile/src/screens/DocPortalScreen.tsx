```typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';
import {
  Book, Lock, User, ArrowLeft, Home, Info, Settings, Code, Database, GitBranch, Layout, Zap, Shield, Users, BarChart3, FileText, DollarSign, Scale, Headphones as HeadphonesIcon, UserCheck, List, Briefcase, Monitor, Crown, Building, Building2, Gavel, Calculator, UserCog, Heart,
} from 'lucide-react-native'; // Import Lucide icons

type DocPortalScreenNavigationProp = StackNavigationProp<any, 'DocPortal'>;

interface Props {
  navigation: DocPortalScreenNavigationProp;
}

interface DocSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>; // Lucide icon component
  content: {
    type: 'heading' | 'paragraph' | 'list' | 'code';
    text?: string;
    items?: string[];
    level?: 1 | 2 | 3; // For headings
  }[];
}

const DOC_CONTENT: DocSection[] = [
  {
    id: 'overview',
    title: 'Overview',
    icon: Home,
    content: [
      { type: 'heading', level: 1, text: 'Project Overview: ZexDream - Beauty & Wellness Platform' },
      { type: 'paragraph', text: 'ZexDream is a comprehensive digital platform designed to connect users with a wide range of beauty and wellness services. It features multi-portal authentication, catering to customers, employees, vendors, and administrators, ensuring a tailored experience for each user type. The platform aims to streamline service discovery, booking, payment, and management within the beauty and wellness industry.' },
      { type: 'heading', level: 2, text: 'Vision & Mission' },
      { type: 'paragraph', text: 'To be the leading digital hub for beauty and wellness services, empowering service providers and enhancing customer well-being through seamless technology.' },
      { type: 'heading', level: 2, text: 'Core Problem Solved' },
      { type: 'paragraph', text: 'Fragmented service discovery, inefficient booking processes, and lack of centralized management for beauty and wellness businesses and consumers.' },
      { type: 'heading', level: 2, text: 'Target Audience' },
      { type: 'list', items: ['Individual customers seeking beauty/wellness services.', 'Independent beauty/wellness professionals (therapists, stylists).', 'Spa and salon businesses.', 'Internal management and administrative staff.'] },
      { type: 'heading', level: 2, text: 'Key Features' },
      { type: 'list', items: [
        'Customer Portal: Service discovery, booking system, payment integration, order tracking, review system.',
        'Employee Portal: Spa onboarding, vendor management, attendance tracking, leave management, HR documents.',
        'Vendor Portal: Service management, booking management, analytics dashboard, customer reviews.',
        'Admin Portal: User management, spa approval, system analytics, security monitoring, real-time location tracking.'
      ] },
    ],
  },
  {
    id: 'architecture',
    title: 'Architecture Blueprint',
    icon: Layout,
    content: [
      { type: 'heading', level: 1, text: 'System Architecture: Microservices & Cloud-Native' },
      { type: 'paragraph', text: 'ZexDream follows a microservices-oriented architecture, separating concerns into distinct, independently deployable services. This approach enhances scalability, maintainability, and fault isolation. Communication between services is primarily via RESTful APIs.' },
      { type: 'heading', level: 2, text: 'Overall System Diagram (Conceptual)' },
      { type: 'paragraph', text: 'Clients (Web/Mobile) -> API Gateway -> Microservices (User, Booking, Payment, Notification, Location, HR, Vendor) -> Database (PostgreSQL) / Cache (Redis).' },
      { type: 'heading', level: 2, text: 'Frontend Layer' },
      { type: 'list', items: [
        'Web Application: React + TypeScript + Vite (Responsive, PWA capabilities).',
        'Mobile Application: React Native + Expo + TypeScript (Native iOS/Android experience).'
      ] },
      { type: 'heading', level: 2, text: 'Backend Layer (Microservices)' },
      { type: 'list', items: [
        'API Gateway: Single entry point, request routing, authentication, rate limiting.',
        'User Service: Authentication, authorization, user profiles (all types).',
        'Booking Service: Appointment scheduling, availability management.',
        'Payment Service: Payment gateway integration (Stripe), transaction processing.',
        'Notification Service: Push, SMS, Email alerts.',
        'Location Service: Real-time tracking, geo-fencing, proximity search.',
        'HR Service: Employee records, attendance, leave.',
        'Vendor Service: Vendor profiles, service listings, performance.'
      ] },
      { type: 'heading', level: 2, text: 'Data Layer' },
      { type: 'list', items: [
        'Primary Database: PostgreSQL (Relational, ACID compliant).',
        'Caching/Messaging: Redis (In-memory, high-speed data access, pub/sub).',
        'Supabase Integration: Managed PostgreSQL, Authentication, Realtime, Edge Functions (for webhooks/serverless tasks).'
      ] },
      { type: 'heading', level: 2, text: 'Third-Party Integrations' },
      { type: 'list', items: [
        'Payment Gateways (e.g., Stripe for secure transactions).',
        'SMS Providers (e.g., Twilio for OTPs and notifications).',
        'Location APIs (e.g., Google Maps API for mapping and geocoding).'
      ] },
      { type: 'heading', level: 2, text: 'Communication Flow' },
      { type: 'paragraph', text: 'Clients send requests to the API Gateway. The Gateway authenticates and forwards requests to the relevant microservice. Microservices interact with the database and other services as needed. Responses are returned via the Gateway to the client.' },
    ],
  },
  {
    id: 'development_flow',
    title: 'Development Flow',
    icon: GitBranch,
    content: [
      { type: 'heading', level: 1, text: 'Development Workflow & CI/CD' },
      { type: 'paragraph', text: 'Our development process adheres to Agile principles, fostering iterative development, collaboration, and continuous improvement. We operate in 2-week sprints.' },
      { type: 'heading', level: 2, text: 'Agile Methodology' },
      { type: 'list', items: [
        'Scrum Framework: Daily Stand-ups, Sprint Planning, Sprint Reviews, Sprint Retrospectives.',
        'User Stories: Features defined from the user\'s perspective with clear acceptance criteria.'
      ] },
      { type: 'heading', level: 2, text: 'Version Control Strategy (Git)' },
      { type: 'list', items: [
        'Repository: GitHub for all project repositories (frontend, backend, mobile).',
        'Branching Model: Feature Branching (each new feature/bug fix gets a dedicated branch from \`develop`).',
        'Pull Requests (PRs): Mandatory for all code changes, requiring at least one approval and passing CI checks before merging to `develop` or `main`.'
      ] },
      { type: 'heading', level: 2, text: 'CI/CD Pipelines' },
      { type: 'paragraph', text: 'Automated pipelines ensure code quality, consistency, and rapid deployment.' },
      { type: 'list', items: [
        'Trigger: Pushing code to feature branches, `develop`, or `main`.',
        'Stages: Linting, Unit Tests, Integration Tests, Build Artifacts, Docker Image Creation (for backend), Deployment to Staging, Deployment to Production (manual trigger for production).'
      ] },
      { type: 'heading', level: 2, text: 'Code Review Process' },
      { type: 'paragraph', text: 'All code changes undergo peer review to maintain quality, share knowledge, and catch potential issues early.' },
      { type: 'list', items: [
        'Tool: GitHub Pull Request review system.',
        'Checklist: Code style, logic correctness, test coverage, performance implications, security vulnerabilities.'
      ] },
      { type: 'heading', level: 2, text: 'Testing Strategy' },
      { type: 'list', items: [
        'Unit Tests: For individual functions/components (Jest, Pytest).',
        'Integration Tests: For interactions between modules/services.',
        'End-to-End (E2E) Tests: Simulating user flows (Cypress, Playwright).',
        'Manual QA: Dedicated QA cycles on staging environments.'
      ] },
      { type: 'heading', level: 2, text: 'Deployment Environments' },
      { type: 'list', items: [
        'Development: Local machines for rapid iteration.',
        'Staging: Mirror of production for UAT and final testing.',
        'Production: Live environment accessible to users.'
      ] },
      { type: 'heading', level: 2, text: 'Issue Tracking & Collaboration' },
      { type: 'list', items: [
        'Tool: Jira for task management, bug tracking, and sprint planning.',
        'Communication: Slack/Microsoft Teams for daily communication and quick queries.'
      ] },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Code,
    content: [
      { type: 'heading', level: 1, text: 'Frontend Development: User Interfaces' },
      { type: 'paragraph', text: 'The frontend consists of a responsive web application and native mobile applications, ensuring a consistent user experience across devices.' },
      { type: 'heading', level: 2, text: 'Web Application' },
      { type: 'list', items: [
        'Technology: React 18, TypeScript, Vite.',
        'Styling: Tailwind CSS (utility-first, highly customizable).',
        'State Management: React Context API + React Hooks (for global and local state).',
        'Routing: React Router DOM for declarative navigation.',
        'UI Components: Custom-built reusable components following a defined design system.',
        'API Integration: Axios for HTTP requests, integrated with React Query for data fetching/caching.',
        'Performance: Code splitting, lazy loading, image optimization.',
        'PWA: Service workers for offline capabilities and installability.'
      ] },
      { type: 'heading', level: 2, text: 'Mobile Application' },
      { type: 'list', items: [
        'Technology: React Native, Expo, TypeScript.',
        'Styling: React Native StyleSheet (platform-specific optimizations).',
        'Navigation: React Navigation (stack, tab, drawer navigators).',
        'State Management: React Context API + React Hooks.',
        'Platform Features: Expo SDK for accessing native device capabilities (Location, Notifications, Camera, etc.).',
        'Performance: Optimized for mobile performance (FlatList for lists, image caching).',
        'Build & Release: Expo EAS for building and submitting to App Store/Google Play.'
      ] },
      { type: 'heading', level: 2, text: 'Shared Frontend Principles' },
      { type: 'list', items: [
        'Code Organization: Modular structure (components, hooks, utilities, types).',
        'Type Safety: Extensive use of TypeScript for robust and maintainable codebases.',
        'Design System: Consistent UI/UX across platforms using shared design tokens (colors, typography, spacing, etc.).',
        'Accessibility: Adherence to WCAG guidelines for inclusive design.',
        'Error Handling: User-friendly error messages and robust error boundaries.'
      ] },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Zap,
    content: [
      { type: 'heading', level: 1, text: 'Backend Development: Core Services' },
      { type: 'paragraph', text: 'The backend is built as a collection of microservices, primarily using FastAPI for its performance and developer experience, complemented by Bun for specific high-performance or JavaScript-native tasks.' },
      { type: 'heading', level: 2, text: 'FastAPI (Python)' },
      { type: 'list', items: [
        'Primary Framework: For most business logic and API endpoints.',
        'Language: Python 3.9+.',
        'Features: Asynchronous support (`async/await`), Pydantic for data validation/serialization, automatic OpenAPI/Swagger documentation.',
        'Performance: Built on Starlette (ASGI framework) and Uvicorn (ASGI server) for high throughput.'
      ] },
      { type: 'heading', level: 2, text: 'Bun (JavaScript Runtime)' },
      { type: 'list', items: [
        'Usage: For specific microservices requiring JavaScript ecosystem tools, or for extremely low-latency, high-concurrency tasks where Bun\'s native performance is critical (e.g., real-time chat backend, lightweight webhook handlers).',
        'Features: Fast startup, native Web APIs, built-in bundler/transpiler.'
      ] },
      { type: 'heading', level: 2, text: 'Microservice Breakdown (Examples)' },
      { type: 'list', items: [
        'User Service: User registration, login, profile management, role-based access.',
        'Booking Service: Appointment creation, modification, cancellation, availability checks.',
        'Payment Service: Integration with Stripe, transaction processing, refund management.',
        'Notification Service: Sending SMS, email, push notifications.',
        'Location Service: Geo-coding, proximity search, real-time tracking.',
        'HR Service: Employee data, attendance, leave management.',
        'Vendor Service: Spa/salon onboarding, service catalog management.'
      ] },
      { type: 'heading', level: 2, text: 'API Design Principles' },
      { type: 'list', items: [
        'RESTful: Resource-oriented URLs, standard HTTP methods.',
        'Versioning: To manage API evolution (e.g., `/v1/users`).',
        'Authentication: JWT (JSON Web Tokens) for stateless authentication.',
        'Authorization: Role-Based Access Control (RBAC) enforced at API endpoints.',
        'Error Handling: Consistent JSON error responses with appropriate HTTP status codes.'
      ] },
      { type: 'heading', level: 2, text: 'Data Handling & Caching' },
      { type: 'list', items: [
        'Redis: Used as an in-memory data store for caching frequently accessed data (e.g., session tokens, popular service listings), rate limiting, and potentially as a message broker for inter-service communication.'
      ] },
      { type: 'heading', level: 2, text: 'Background Tasks & Asynchronous Processing' },
      { type: 'list', items: [
        'Celery (Python) or BullMQ (Node.js/Bun): For long-running tasks (e.g., sending bulk notifications, report generation) to avoid blocking API responses.'
      ] },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    icon: Database,
    content: [
      { type: 'heading', level: 1, text: 'Database Management: PostgreSQL' },
      { type: 'paragraph', text: 'PostgreSQL serves as the primary relational database for ZexDream, chosen for its robustness, reliability, and advanced features. We leverage Supabase for managed PostgreSQL services.' },
      { type: 'heading', level: 2, text: 'PostgreSQL Features Utilized' },
      { type: 'list', items: [
        'ACID Compliance: Ensures data integrity and reliability.',
        'JSONB Support: For flexible schema needs (e.g., storing dynamic service attributes).',
        'Geospatial Data: PostGIS extension for location-based queries (e.g., finding nearby spas).',
        'Indexing: B-tree, GIN, GiST indexes for query performance optimization.',
        'Transactions: Ensuring atomicity of complex operations.'
      ] },
      { type: 'heading', level: 2, text: 'Key Data Models (Schemas)' },
      { type: 'list', items: [
        'Users: `id`, `email`, `mobile`, `password_hash`, `name`, `role`, `status`, `created_at`, `last_login`.',
        'Service_Providers: `id`, `name`, `address`, `location (geo)`, `contact`, `rating`, `operating_hours`, `amenities`, `specialties`.',
        'Services: `id`, `provider_id`, `name`, `description`, `price`, `duration`, `category`, `image_url`.',
        'Bookings: `id`, `user_id`, `provider_id`, `service_ids`, `scheduled_datetime`, `status`, `total_amount`, `payment_status`.',
        'Payments: `id`, `booking_id`, `transaction_id`, `amount`, `status`, `method`, `timestamp`.',
        'Reviews: `id`, `user_id`, `provider_id`, `booking_id`, `rating`, `comment`, `timestamp`.',
        'Employees: `id`, `user_id`, `employee_id`, `department`, `designation`, `joining_date`, `attendance_records`, `leave_requests`.',
        'Vendors: `id`, `user_id`, `company_name`, `registration_details`, `commission_rate`.',
        'Notifications: `id`, `user_id`, `type`, `message`, `read_status`, `timestamp`.'
      ] },
      { type: 'heading', level: 2, text: 'Supabase Integration' },
      { type: 'list', items: [
        'Managed Database: Supabase handles PostgreSQL hosting, backups, and scaling.',
        'Authentication: Supabase Auth for user management (can be integrated with custom user service).',
        'Realtime: WebSocket capabilities for live updates (e.g., order tracking).',
        'Edge Functions: Serverless functions for backend logic, triggered by database events or HTTP requests (e.g., Stripe webhooks, custom API endpoints).'
      ] },
      { type: 'heading', level: 2, text: 'Database Access & ORM' },
      { type: 'list', items: [
        'Backend: SQLAlchemy (Python ORM) for interacting with PostgreSQL.',
        'Frontend: Direct API calls to backend services; no direct database access from frontend.'
      ] },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    icon: Shield,
    content: [
      { type: 'heading', level: 1, text: 'Security Measures: Protecting Data & Users' },
      { type: 'paragraph', text: 'Security is a foundational aspect of ZexDream, implemented across all layers of the application to protect user data and ensure system integrity.' },
      { type: 'heading', level: 2, text: 'Authentication & Authorization' },
      { type: 'list', items: [
        'Password Hashing: All passwords are hashed using strong, adaptive algorithms (e.g., bcrypt) before storage. Never stored in plain text.',
        'JWT (JSON Web Tokens): Used for stateless authentication. Tokens are short-lived and signed with a strong secret.',
        'Role-Based Access Control (RBAC): Granular permissions are defined for each user role (customer, employee, vendor, admin, departmental roles) to restrict access to specific modules, features, and data.',
        'OTP Verification: Multi-factor authentication via One-Time Passwords sent to mobile numbers for critical actions like registration, login, and password resets.',
        'Aadhaar Verification (India Specific): Integration with authorized Aadhaar APIs for identity verification, enhancing trust and compliance for customer bookings.'
      ] },
      { type: 'heading', level: 2, text: 'Data Protection' },
      { type: 'list', items: [
        'Encryption in Transit: All communication between client applications and backend services, and between microservices, is encrypted using HTTPS/SSL/TLS.',
        'Encryption at Rest: Database data, backups, and stored files are encrypted at rest using industry-standard encryption algorithms.',
        'Data Minimization: Only essential user data required for service provision and legal compliance is collected and stored.',
        'Regular Backups: Automated, encrypted backups of the entire database are performed daily and stored securely off-site to prevent data loss.'
      ] },
      { type: 'heading', level: 2, text: 'Application Security' },
      { type: 'list', items: [
        'Input Validation: Strict server-side validation of all user inputs to prevent common web vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), and other injection attacks.',
        'Rate Limiting: Implemented on critical API endpoints (e.g., login, OTP requests) to prevent brute-force attacks and API abuse.',
        'Secure Coding Practices: Developers adhere to OWASP Top 10 guidelines and follow secure coding standards (e.g., least privilege, secure defaults).',
        'Dependency Scanning: Automated tools regularly scan third-party libraries and dependencies for known vulnerabilities (CVEs).',
        'Cross-Origin Resource Sharing (CORS): Properly configured to allow only trusted origins to access API resources.',
        'Session Management: Secure session handling with appropriate timeouts and invalidation mechanisms.'
      ] },
      { type: 'heading', level: 2, text: 'Monitoring & Auditing' },
      { type: 'list', items: [
        'Security Logging: Comprehensive logging of security-relevant events (e.g., failed logins, access attempts, data modifications).',
        'Real-time Monitoring: Tools for real-time monitoring of system health and suspicious activities.',
        'Audit Trails: Detailed audit trails for administrative actions and sensitive data access.'
      ] },
    ],
  },
  {
    id: 'deployment',
    title: 'Deployment',
    icon: Info,
    content: [
      { type: 'heading', level: 1, text: 'Deployment Strategy: Automation, Scalability & Reliability' },
      { type: 'paragraph', text: 'ZexDream\'s deployment strategy is designed for efficiency, ensuring high availability, scalability, and rapid iteration cycles through automation.' },
      { type: 'heading', level: 2, text: 'Continuous Integration/Continuous Deployment (CI/CD)' },
      { type: 'list', items: [
        'Automated Builds: Every code commit triggers automated build processes for both frontend and backend components.',
        'Automated Testing: Unit, integration, and static analysis tests are run automatically in the pipeline.',
        'Artifact Generation: Successful builds generate deployable artifacts (e.g., Docker images for backend, bundled JS/CSS for web, mobile app binaries via Expo EAS).',
        'Automated Deployments: Artifacts are automatically deployed to staging environments upon successful CI. Production deployments are typically manually triggered after UAT.'
      ] },
      { type: 'heading', level: 2, text: 'Frontend Deployment' },
      { type: 'list', items: [
        'Web Application: Deployed to static hosting providers (e.g., Netlify, Vercel) leveraging their global Content Delivery Networks (CDNs) for low latency and high availability.',
        'Mobile Application: Built using Expo EAS (Expo Application Services) for generating standalone iOS and Android app binaries. Distribution is handled via Apple App Store and Google Play Store.'
      ] },
      { type: 'heading', level: 2, text: 'Backend Deployment' },
      { type: 'list', items: [
        'Containerization: All backend microservices are containerized using Docker, ensuring consistent environments from development to production.',
        'Orchestration: Kubernetes (or similar platforms like AWS ECS, Google Cloud Run) is used for managing, scaling, and deploying containerized microservices, providing self-healing capabilities.',
        'Cloud Providers: Deployment on leading cloud platforms (e.g., AWS, Google Cloud, Azure) for scalable infrastructure, managed services, and global reach.',
        'Supabase: Utilized for its managed PostgreSQL database and serverless Edge Functions, simplifying database operations and backend logic deployment.'
      ] },
      { type: 'heading', level: 2, text: 'Monitoring, Logging & Alerting' },
      { type: 'list', items: [
        'Centralized Logging: Aggregation of logs from all services and applications into a centralized system (e.g., ELK Stack, Grafana Loki) for easy analysis and debugging.',
        'Performance Monitoring: Tools (e.g., Prometheus, Grafana, cloud-native monitoring services) track system health, API response times, resource utilization (CPU, memory, network), and application-specific metrics.',
        'Alerting Mechanisms: Configured alerts notify relevant teams (e.g., Slack, PagerDuty) of critical issues, performance degradation, or security incidents in real-time.',
        'Distributed Tracing: (Future enhancement) For end-to-end visibility of requests across microservices.'
      ] },
      { type: 'heading', level: 2, text: 'Backup & Disaster Recovery' },
      { type: 'list', items: [
        'Automated Database Backups: Regular, encrypted backups of PostgreSQL database to ensure data durability.',
        'Disaster Recovery Plan: Defined procedures for restoring services in case of major outages or data loss.'
      ] },
      { type: 'heading', level: 2, text: 'Rollback Strategy' },
      { type: 'list', items: [
        'Automated Rollbacks: CI/CD pipelines are configured to automatically roll back to the previous stable version in case of critical errors detected post-deployment.',
        'Manual Rollbacks: Capability for manual intervention to revert deployments if automated rollbacks fail or specific issues arise.'
      ] },
    ],
  },
];

const DocPortalScreen: React.FC<Props> = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeSection, setActiveSection] = useState(DOC_CONTENT[0].id); // Default to first section

  const handleLogin = () => {
    if (username === 'doc' && password === '1234') {
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Invalid credentials. Please use id: doc, password: 1234');
    }
  };

  const renderSidebar = () => (
    <View style={styles.sidebar}>
      <Text style={styles.sidebarTitle}>ZexDream Docs</Text>
      {DOC_CONTENT.map((section) => (
        <TouchableOpacity
          key={section.id}
          onPress={() => setActiveSection(section.id)}
          style={[styles.sidebarItem, activeSection === section.id && styles.sidebarItemActive]}
        >
          <section.icon size={18} color={activeSection === section.id ? colors.primary[700] : colors.gray[600]} />
          <Text style={[styles.sidebarItemText, activeSection === section.id && styles.sidebarItemTextActive]}>
            {section.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContent = () => {
    const currentSection = DOC_CONTENT.find(section => section.id === activeSection);
    if (!currentSection) {
      return (
        <View style={styles.contentContainer}>
          <View style={styles.contentSection}>
            <Text style={styles.contentTitle}>Section Not Found</Text>
            <Text style={styles.contentText}>The requested documentation section could not be found.</Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {currentSection.content.map((block, index) => {
          if (block.type === 'heading') {
            const HeadingTag = block.level === 1 ? Text : block.level === 2 ? Text : Text; // Simulate h1, h2, h3
            const headingStyle = block.level === 1 ? styles.contentTitle : block.level === 2 ? styles.contentSubtitle : styles.contentSubSubtitle;
            return <HeadingTag key={index} style={headingStyle}>{block.text}</HeadingTag>;
          } else if (block.type === 'paragraph') {
            return <Text key={index} style={styles.contentText}>{block.text}</Text>;
          } else if (block.type === 'list') {
            return (
              <View key={index} style={styles.contentList}>
                {block.items?.map((item, itemIndex) => (
                  <Text key={itemIndex} style={styles.contentListItem}>• {item}</Text>
                ))}
              </View>
            );
          } else if (block.type === 'code') {
            return (
              <View key={index} style={styles.contentCodeBlock}>
                <Text style={styles.contentCodeText}>{block.text}</Text>
              </View>
            );
          }
          return null;
        })}
      </ScrollView>
    );
  };

  if (!isLoggedIn) {
    return (
      <LinearGradient colors={[colors.primary[50], colors.secondary[50], '#EEF2FF']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Documentation Portal</Text>
            <View style={styles.spacer} />
          </View>
          <View style={styles.loginContainer}>
            <View style={styles.iconSection}>
              <LinearGradient
                colors={[colors.primary[600], colors.secondary[500]]}
                style={styles.iconContainer}
              >
                <Book size={48} color={colors.white} />
              </LinearGradient>
              <Text style={styles.title}>Access Documentation</Text>
              <Text style={styles.description}>
                Please log in to view the ZexDream project documentation.
              </Text>
            </View>
            <View style={styles.formSection}>
              <View style={styles.inputGroup}>
                <User size={20} color={colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputGroup}>
                <Lock size={20} color={colors.gray[400]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
              {loginError ? <Text style={styles.errorText}>{loginError}</Text> : null}
              <Button title="Login" onPress={handleLogin} size="lg" style={styles.loginButton} />
            </View>
            <View style={styles.demoCredentials}>
              <Text style={styles.demoTitle}>Demo Credentials</Text>
              <Text style={styles.demoText}>
                <Text style={styles.demoBold}>ID:</Text> doc{"\n"}
                <Text style={styles.demoBold}>Password:</Text> 1234
              </Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={[colors.gray[50], colors.gray[100]]} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>ZexDream Documentation</Text>
          <View style={styles.spacer} />
        </View>
        <View style={styles.mainContent}>
          {renderSidebar()}
          {renderContent()}
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
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  iconSection: {
    alignItems: 'center',
    marginBottom: spacing['3xl'],
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.xl,
  },
  title: {
    fontSize: typography['2xl'],
    fontWeight: 'bold',
    color: colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.base,
    color: colors.gray[600],
    textAlign: 'center',
  },
  formSection: {
    width: '100%',
    maxWidth: 400,
    marginBottom: spacing['3xl'],
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: borderRadius.xl,
    backgroundColor: colors.white,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  inputIcon: {
    marginRight: spacing.md,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.md,
    fontSize: typography.base,
    color: colors.gray[900],
  },
  errorText: {
    fontSize: typography.sm,
    color: colors.error[600],
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  loginButton: {
    width: '100%',
  },
  demoCredentials: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.sm,
  },
  demoTitle: {
    fontSize: typography.base,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  demoText: {
    fontSize: typography.sm,
    color: '#1D4ED8',
    lineHeight: typography.xl,
    textAlign: 'center',
  },
  demoBold: {
    fontWeight: '600',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 200,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.gray[100],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sidebarTitle: {
    fontSize: typography.lg,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xs,
  },
  sidebarItemActive: {
    backgroundColor: colors.primary[50],
  },
  sidebarItemText: {
    fontSize: typography.base,
    color: colors.gray[700],
    marginLeft: spacing.sm,
  },
  sidebarItemTextActive: {
    fontWeight: '600',
    color: colors.primary[700],
  },
  contentContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  contentSection: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.sm,
  },
  contentTitle: {
    fontSize: typography.xl,
    fontWeight: 'bold',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  contentSubtitle: {
    fontSize: typography.lg,
    fontWeight: '600',
    color: colors.gray[800],
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  contentSubSubtitle: { // For h3
    fontSize: typography.base,
    fontWeight: '600',
    color: colors.gray[700],
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  contentText: {
    fontSize: typography.base,
    color: colors.gray[700],
    lineHeight: typography.xl,
    marginBottom: spacing.sm,
  },
  contentList: {
    marginBottom: spacing.sm,
  },
  contentListItem: {
    fontSize: typography.base,
    color: colors.gray[700],
    lineHeight: typography.xl,
    marginLeft: spacing.md,
  },
  contentCodeBlock: {
    backgroundColor: colors.gray[800],
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  contentCodeText: {
    fontFamily: 'monospace',
    fontSize: typography.sm,
    color: colors.white,
  },
});

export default DocPortalScreen;

```