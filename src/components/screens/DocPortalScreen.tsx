import React, { useState } from 'react';
import { ArrowLeft, Search, Book, Code, GitBranch, Database, Shield, Cloud, Layout, Smartphone, Palette, Zap, Users, DollarSign, FileText, BarChart3, Settings, Gavel, Headphones, UserCog, Building, Building2, Calculator, Monitor, List, Briefcase, Heart, Star, Megaphone, MessageSquare, MessageCircle, UserPlus, TrendingUp, Package, Calendar, CreditCard, PieChart, User, UserCheck, MapPin, Scale, AlertTriangle, CheckCircle, Clock, Gift, RotateCcw, Eye, Trash2, Ban, XCircle, Coffee, Home, Navigation, Loader2, Download, Upload, Award } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface DocPortalScreenProps {
  onBack: () => void;
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
        content: `ZexDream is a comprehensive beauty and wellness platform designed to connect customers with spa, salon, and wellness service providers. It features multi-portal authentication for various user roles including customers, employees, vendors, and administrators, ensuring a tailored experience for each. The platform aims to provide seamless service discovery, booking, payment, and tracking functionalities.
        
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
        content: `ZexDream employs a modern full-stack architecture designed for scalability, performance, and maintainability. It separates concerns between frontend clients (web and mobile) and a centralized backend API, with a robust database for data persistence.

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
        content: `To ensure consistency and reduce redundancy, both the web and mobile applications share several key components:
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
        content: `1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
2. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
3. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`
The web application uses Vite for fast development and build processes, and Tailwind CSS for utility-first styling.`
      },
      {
        id: 'getting_started_mobile',
        title: 'Getting Started (Mobile Application)',
        content: `1. **Navigate to mobile directory:**
   \`\`\`bash
   cd ZexDreamMobile
   \`\`\`
2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`
3. **Start Expo development server:**
   \`\`\`bash
   npx expo start
   \`\`\`
4. **Run on platforms:**
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
ZexDreamMobile/
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
    content: `The primary database for ZexDream is PostgreSQL, managed via Supabase. Key entities include:

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

This schema provides a foundation for managing all core operations of the ZexDream platform.`
  },
  {
    id: 'security',
    title: 'Security Considerations',
    icon: Shield,
    content: `Security is paramount for ZexDream, especially given the sensitive nature of personal and financial data.

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
  {
    id: 'role_system',
    title: 'Role & Permission System',
    icon: Shield,
    content: [
      {
        id: 'role_overview',
        title: 'Role System Overview',
        content: `ZexDream implements a comprehensive role-based access control (RBAC) system with multiple user types and departmental roles:

**Core User Types:**
- Customer: Standard app users booking services
- Employee: Internal staff managing operations
- Vendor: Service providers offering spa/salon services
- Admin: System administrators with elevated privileges

**Departmental Roles:**
- Accounts Department: Financial accounting and bookkeeping
- Marketing Department: Brand promotion and customer acquisition
- Finance Department: Financial planning and analysis
- Legal Department: Legal affairs and compliance
- Customer Care: Customer support operations
- Staff Department: Staff management and coordination
- HR Department: Human resources and employee management
- IT Department: Technology infrastructure and support
- Super Admin: Ultimate system control and oversight

Each role has specific modules, permissions, and reporting hierarchies defined in the system.`
      },
      {
        id: 'permission_matrix',
        title: 'Permission Matrix',
        content: `The permission system is built around modules and actions:

**Modules:**
- User Management
- Financial Management
- Operations Management
- Marketing & Promotions
- Legal & Compliance
- Customer Support
- Human Resources
- System Administration

**Actions:**
- create, read, update, delete, approve, export

**Example Permissions:**
- \`users:read\` - View user information
- \`finance:approve\` - Approve financial transactions
- \`spas:create\` - Add new spa locations
- \`reports:export\` - Export system reports

The Super Admin role has wildcard permissions (*) granting access to all system functions.`
      },
    ],
  },
  {
    id: 'service_catalog',
    title: 'Service Catalog',
    icon: Star,
    content: [
      {
        id: 'massage_services',
        title: 'Massage Services',
        content: `ZexDream features a comprehensive massage catalog with detailed service specifications:

**Service Categories:**
- Relaxation & Wellness
- Therapeutic & Clinical
- Specialty Treatments
- Couples & Group
- Holistic Wellness

**Popular Services:**
- Swedish Massage (₹2,200 for 60 min)
- Deep Tissue Massage (₹2,500 for 60 min)
- Aromatherapy Massage (₹2,400 for 60 min)
- Hot Stone Massage (₹2,800 for 60 min)
- Thai Massage (₹2,500 for 60 min)
- Ayurvedic Abhyanga (₹2,800 for 60 min)

Each service includes detailed information about techniques, focus areas, benefits, contraindications, and recommended add-ons.`
      },
      {
        id: 'addon_services',
        title: 'Add-on Services',
        content: `Enhance your spa experience with these add-on services:

- Cupping Therapy (₹800 for 15 min)
- Gua Sha (₹600 for 15 min)
- Scalp Massage (₹500 for 15 min)
- Aromatherapy Enhancement (₹300)
- Heat Pack (₹400 for 10 min)
- Foot Scrub (₹700 for 15 min)
- Paraffin Wrap (₹900 for 20 min)
- Stretching Session (₹600 for 15 min)
- Percussive Therapy (₹500 for 10 min)
- Sound Bath Mini (₹800 for 10 min)

Add-ons can be combined with main services for a customized wellness experience.`
      },
    ],
  },
  {
    id: 'hr_system',
    title: 'HR Management System',
    icon: UserCog,
    content: [
      {
        id: 'employee_management',
        title: 'Employee Management',
        content: `The HR system manages comprehensive employee data and operations:

**Employee Records:**
- Personal information (name, contact, emergency contacts)
- Employment details (ID, department, designation, joining date)
- Status tracking (active, inactive, terminated)
- Profile photos and documentation

**Attendance Tracking:**
- Real-time check-in/check-out with location tagging
- Status options: Present, Absent, Late, Half Day, Leave, Work from Home
- GPS coordinates and address logging
- Working hours calculation
- Manager approval workflows

**Leave Management:**
- Multiple leave types: Sick, Casual, Earned, Maternity, Paternity, Emergency
- Leave balance tracking
- Application and approval workflows
- Document upload support
- Calendar integration`
      },
      {
        id: 'payroll_system',
        title: 'Payroll & Documents',
        content: `**Salary Management:**
- Basic salary and allowances (HRA, Transport, Medical)
- Deductions (PF, ESI, Tax)
- Gross and net salary calculations
- Payment status tracking
- Monthly salary slip generation

**HR Documents:**
- Offer letters and appointment letters
- Employment contracts
- Increment letters
- Appreciation certificates
- Warning letters
- Performance reviews
- Document upload and download functionality

**Performance Reviews:**
- Periodic performance evaluations
- Goal setting and achievement tracking
- 360-degree feedback system
- Rating scales and comments
- Performance improvement plans`
      },
    ],
  },
];

export const DocPortalScreen: React.FC<DocPortalScreenProps> = ({ onBack }) => {
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
    if (!currentSection) return <p className="text-gray-500">Select a section from the sidebar.</p>;

    if (typeof currentSection.content === 'string') {
      return (
        <div className="prose prose-gray max-w-none">
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {currentSection.content}
          </div>
        </div>
      );
    }

    const currentSub = currentSection.content.find(sub => sub.id === activeSubsection);
    if (currentSub) {
      return (
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{currentSub.title}</h2>
          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
            {currentSub.content}
          </div>
        </div>
      );
    }

    return <p className="text-gray-500">Select a subsection.</p>;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              aria-label="Go back to welcome screen"
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">ZexDream Docs</h1>
            </div>
            <div className="w-10" />
          </div>

          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search documentation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4 text-gray-400" />}
              className="bg-white/95 backdrop-blur-sm border-0 shadow-lg text-sm"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {filteredSections.map((section) => (
              <div key={section.id}>
                <button
                  onClick={() => {
                    setActiveSection(section.id);
                    if (Array.isArray(section.content) && section.content.length > 0) {
                      setActiveSubsection(section.content[0].id);
                    } else {
                      setActiveSubsection('');
                    }
                  }}
                  className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left ${
                    activeSection === section.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
                
                {activeSection === section.id && Array.isArray(section.content) && (
                  <div className="ml-8 mt-2 space-y-1">
                    {section.content.map((subsection) => (
                      <button
                        key={subsection.id}
                        onClick={() => setActiveSubsection(subsection.id)}
                        className={`w-full text-left p-2 rounded-lg transition-colors duration-200 text-sm ${
                          activeSubsection === subsection.id
                            ? 'bg-purple-50 text-purple-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {subsection.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentSection?.title || 'Documentation'}
              </h1>
              <p className="text-gray-600">ZexDream Development Documentation</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};