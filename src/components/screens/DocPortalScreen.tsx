import React from 'react';
import { Book, LayoutGrid as Layout, Code } from 'lucide-react';
import { DocPortal } from '../documentation/DocPortal';

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
        content: `OMBARO is a comprehensive beauty and wellness platform designed to connect customers with spa, salon, and wellness service providers. It features multi-portal authentication for various user roles including customers, employees, vendors, and administrators, ensuring a tailored experience for each. The platform aims to provide seamless service discovery, booking, payment, and tracking functionalities.
        
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
        content: `OMBARO employs a modern full-stack architecture designed for scalability, performance, and maintainability. It separates concerns between frontend clients (web and mobile) and a centralized backend API, with a robust database for data persistence.

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
   cd OmbaroMobile
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
OmbaroMobile/
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
- Adhere to platform design guidelines (Material Design for Android, Human Interface Guidelines for iOS).`
      }
    ]
  }
];

export const DocPortalScreen: React.FC<DocPortalScreenProps> = ({ onBack }) => {
  return <DocPortal onBack={onBack} />;
};