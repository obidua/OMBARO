import React from 'react';
import { Code, Terminal, Smartphone, Globe, Settings, CheckCircle } from 'lucide-react';

export const DevelopmentGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Code className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Development Guide</h1>
            <p className="text-neutral-600">Setup, guidelines, and best practices</p>
          </div>
        </div>
      </div>

      {/* Getting Started */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Getting Started</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Web Application Setup */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Web Application</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Install Dependencies</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">npm install</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Start Development Server</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">npm run dev</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Build for Production</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">npm run build</code>
                </div>
              </div>
              
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <p className="text-primary-800 text-sm">
                  <strong>Note:</strong> The web application uses Vite for fast development and build processes, 
                  and Tailwind CSS for utility-first styling.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Application Setup */}
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900">Mobile Application</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">1. Navigate to Mobile Directory</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">cd OmbaroMobile</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">2. Install Dependencies</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">npm install</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">3. Start Expo Development Server</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <code className="text-accent-400 font-mono text-sm">npx expo start</code>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">4. Run on Platforms</h4>
                <div className="space-y-2">
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <code className="text-accent-400 font-mono text-sm">iOS: Press 'i' or scan QR with iOS device</code>
                  </div>
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <code className="text-accent-400 font-mono text-sm">Android: Press 'a' or scan QR with Android device</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Organization */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Code Organization</h2>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">General Guidelines</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-accent-100 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Component Size</h4>
                  <p className="text-sm text-neutral-600">Keep components under 200 lines for readability and maintainability</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary-100 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Type Safety</h4>
                  <p className="text-sm text-neutral-600">Use TypeScript extensively for type safety across the entire codebase</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-secondary-100 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Error Handling</h4>
                  <p className="text-sm text-neutral-600">Implement proper error handling for all API calls and critical operations</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-warning-100 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-warning-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Best Practices</h4>
                  <p className="text-sm text-neutral-600">Follow platform-specific best practices for UI/UX and performance</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-error-100 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-error-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Testing</h4>
                  <p className="text-sm text-neutral-600">Write comprehensive tests for business logic and critical user flows</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-neutral-200 rounded-lg flex items-center justify-center mt-0.5">
                  <CheckCircle className="w-4 h-4 text-neutral-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-neutral-900">Documentation</h4>
                  <p className="text-sm text-neutral-600">Maintain clear documentation for all components and business logic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* File Structure */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Project File Structure</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Web Application</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <pre className="text-sm text-neutral-700 font-mono whitespace-pre-wrap">{`src/
├── components/
│   ├── auth/              # Authentication screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   └── DashboardScreens.tsx
│   ├── common/            # Shared components
│   │   ├── SalonCard.tsx
│   │   ├── CategoryCard.tsx
│   │   └── ServiceCard.tsx
│   ├── layout/            # Layout components
│   │   ├── FixedHeader.tsx
│   │   └── FixedFooter.tsx
│   ├── screens/           # Main screens
│   │   ├── HomeScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── ui/                # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Map.tsx
│   └── documentation/     # Documentation portal
│       └── sections/      # Doc sections
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript definitions
└── main.tsx              # Entry point`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mobile Application</h3>
            <div className="bg-neutral-50 rounded-lg p-4">
              <pre className="text-sm text-neutral-700 font-mono whitespace-pre-wrap">{`OmbaroMobile/
├── src/
│   ├── components/
│   │   └── ui/            # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── RadioGroup.tsx
│   ├── context/           # React Context
│   │   └── AuthContext.tsx
│   ├── screens/           # Screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── BookingScreen.tsx
│   ├── types/             # TypeScript definitions
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── roles.ts
│   └── constants/         # Theme constants
│       └── theme.ts
├── assets/                # Images and assets
├── app.json              # Expo configuration
└── App.tsx               # Main component`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Development Workflow */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Development Workflow</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Recommended Workflow</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Plan & Design</h4>
                <p className="text-sm text-neutral-600">Define requirements, create wireframes, and plan component structure</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Develop & Test</h4>
                <p className="text-sm text-neutral-600">Build components, implement features, and write comprehensive tests</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Deploy & Monitor</h4>
                <p className="text-sm text-neutral-600">Deploy to production and monitor performance and user feedback</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styling Guidelines */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Styling Guidelines</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Web Application Styling</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Primarily use <strong>Tailwind CSS</strong> utility classes for rapid UI development</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Implement <strong>responsive design</strong> principles for all screen sizes</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use <strong>custom CSS</strong> minimally, only for complex animations</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Follow <strong>design system</strong> tokens for consistency</span>
              </li>
            </ul>
            
            <div className="mt-4 bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-primary-900 mb-2">Example Usage</h4>
              <div className="bg-neutral-900 rounded p-3">
                <code className="text-accent-400 font-mono text-xs">
                  {`<div className="card card-hover p-6">
  <Button variant="primary" size="lg">
    Primary Action
  </Button>
</div>`}
                </code>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mobile Application Styling</h3>
            <ul className="space-y-3 text-neutral-700">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use <strong>StyleSheet.create</strong> for performance optimization</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Follow <strong>platform design guidelines</strong> (Material Design, HIG)</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Maintain <strong>visual consistency</strong> with web application</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use <strong>shared design tokens</strong> from constants/theme.ts</span>
              </li>
            </ul>
            
            <div className="mt-4 bg-secondary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-900 mb-2">Example Usage</h4>
              <div className="bg-neutral-900 rounded p-3">
                <code className="text-accent-400 font-mono text-xs">
                  {`const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },
});`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* State Management */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">State Management</h2>
        
        <div className="card p-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Both applications utilize React Context for global state management, suitable for sharing authentication 
            status, user preferences, and other application-wide data.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Key Principles</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Keep local component state minimal and focused on UI-specific concerns</li>
                <li>• Implement clear loading and error states for async operations</li>
                <li>• Use Context for authentication, user preferences, and global app state</li>
                <li>• Avoid prop drilling by using Context appropriately</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">Context Structure</h3>
              <div className="bg-neutral-50 rounded-lg p-4">
                <pre className="text-sm text-neutral-700 font-mono">{`// AuthContext example
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<{
  authState: AuthState;
  login: (credentials) => Promise<void>;
  logout: () => void;
}>();`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Setup */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Environment Setup</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Web Environment (.env)</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`VITE_API_URL=your_api_url
VITE_MAPS_API_KEY=your_maps_api_key
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key`}</pre>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Mobile Environment (.env)</h3>
            <div className="bg-neutral-900 rounded-lg p-4">
              <pre className="text-accent-400 font-mono text-sm">{`EXPO_PUBLIC_API_URL=your_api_url
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key`}</pre>
            </div>
          </div>
        </div>
        
        <div className="bg-warning-50 rounded-lg p-4 border border-warning-200 mt-6">
          <div className="flex items-start space-x-3">
            <Settings className="w-5 h-5 text-warning-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-warning-900 mb-1">Important Note</h4>
              <p className="text-warning-800 text-sm">
                Ensure these environment variables are correctly configured in your local development environment 
                and deployment pipelines. Never commit sensitive keys to version control.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};