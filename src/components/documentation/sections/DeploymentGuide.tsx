import React from 'react';
import { Cloud, Globe, Smartphone, Settings, CheckCircle, AlertTriangle } from 'lucide-react';

export const DeploymentGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
            <Cloud className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Deployment Guide</h1>
            <p className="text-neutral-600">Production deployment and hosting</p>
          </div>
        </div>
      </div>

      {/* Deployment Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Deployment Overview</h2>
        
        <div className="card p-6 mb-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            OMBARO applications are designed for modern deployment practices with containerization, 
            CI/CD pipelines, and cloud-native hosting solutions.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Web Application</h3>
              <p className="text-neutral-600">Static site deployment to CDN with global distribution</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Mobile Application</h3>
              <p className="text-neutral-600">App store distribution with OTA updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Web Application Deployment */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Web Application Deployment</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Static Site Hosting</h3>
            </div>
            
            <p className="text-neutral-700 mb-4">
              The web application builds to static files that can be deployed to any static hosting provider.
            </p>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Build Process</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`# Build for production
npm run build

# Preview build locally
npm run preview

# Build output directory
dist/`}</pre>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                  <h4 className="font-semibold text-primary-900 mb-2">Netlify</h4>
                  <ul className="text-primary-800 text-sm space-y-1">
                    <li>• Automatic deployments</li>
                    <li>• Branch previews</li>
                    <li>• Form handling</li>
                    <li>• Edge functions</li>
                  </ul>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                  <h4 className="font-semibold text-secondary-900 mb-2">Vercel</h4>
                  <ul className="text-secondary-800 text-sm space-y-1">
                    <li>• Zero-config deployment</li>
                    <li>• Global CDN</li>
                    <li>• Serverless functions</li>
                    <li>• Analytics</li>
                  </ul>
                </div>
                
                <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                  <h4 className="font-semibold text-accent-900 mb-2">Bolt Hosting</h4>
                  <ul className="text-accent-800 text-sm space-y-1">
                    <li>• Integrated hosting</li>
                    <li>• Custom domains</li>
                    <li>• SSL certificates</li>
                    <li>• Performance optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Environment Configuration</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Production Environment</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`# Production .env
VITE_API_URL=https://api.ombaro.com
VITE_MAPS_API_KEY=prod_google_maps_key
VITE_SUPABASE_URL=https://prod.supabase.co
VITE_SUPABASE_ANON_KEY=prod_anon_key
VITE_STRIPE_PUBLIC_KEY=pk_live_...`}</pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Staging Environment</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`# Staging .env
VITE_API_URL=https://staging-api.ombaro.com
VITE_MAPS_API_KEY=staging_google_maps_key
VITE_SUPABASE_URL=https://staging.supabase.co
VITE_SUPABASE_ANON_KEY=staging_anon_key
VITE_STRIPE_PUBLIC_KEY=pk_test_...`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Application Deployment */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Mobile Application Deployment</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Expo Build Service</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Development Testing</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Clear cache and restart
npx expo start --clear`}</pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Production Builds</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`# Build for Android
eas build --platform android --profile production

# Build for iOS
eas build --platform ios --profile production

# Build for both platforms
eas build --platform all --profile production`}</pre>
                </div>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">App Store Distribution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Google Play Store</h4>
                <div className="space-y-3">
                  <div className="bg-accent-50 rounded-lg p-3">
                    <h5 className="font-medium text-accent-900 mb-1">Requirements</h5>
                    <ul className="text-accent-800 text-sm space-y-1">
                      <li>• Signed APK/AAB file</li>
                      <li>• App metadata and descriptions</li>
                      <li>• Screenshots and graphics</li>
                      <li>• Privacy policy URL</li>
                      <li>• Content rating</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <pre className="text-accent-400 font-mono text-xs">{`# Submit to Play Store
eas submit --platform android`}</pre>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Apple App Store</h4>
                <div className="space-y-3">
                  <div className="bg-secondary-50 rounded-lg p-3">
                    <h5 className="font-medium text-secondary-900 mb-1">Requirements</h5>
                    <ul className="text-secondary-800 text-sm space-y-1">
                      <li>• Signed IPA file</li>
                      <li>• App Store Connect setup</li>
                      <li>• App review guidelines compliance</li>
                      <li>• TestFlight beta testing</li>
                      <li>• App Store review process</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <pre className="text-accent-400 font-mono text-xs">{`# Submit to App Store
eas submit --platform ios`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CI/CD Pipeline */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">CI/CD Pipeline</h2>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Automated Deployment</h3>
          
          <div className="space-y-6">
            <div className="bg-neutral-50 rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-3">GitHub Actions Workflow</h4>
              <div className="bg-neutral-900 rounded-lg p-4">
                <pre className="text-accent-400 font-mono text-sm">{`name: Deploy OMBARO
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test
      - run: npm run build

  deploy-web:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/deploy@master
        with:
          publish-dir: ./dist`}</pre>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Test</h4>
                <p className="text-neutral-600 text-sm">Run automated tests and linting</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-secondary-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Build</h4>
                <p className="text-neutral-600 text-sm">Create optimized production builds</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-accent-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">Deploy</h4>
                <p className="text-neutral-600 text-sm">Deploy to production hosting</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environment Management */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Environment Management</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Development</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-accent-50 rounded-lg p-3">
                <h4 className="font-medium text-accent-900 mb-1">Features</h4>
                <ul className="text-accent-800 text-sm space-y-1">
                  <li>• Hot module replacement</li>
                  <li>• Source maps enabled</li>
                  <li>• Debug logging</li>
                  <li>• Mock data services</li>
                </ul>
              </div>
              
              <div className="bg-neutral-900 rounded-lg p-3">
                <pre className="text-accent-400 font-mono text-xs">{`VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development`}</pre>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Staging</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-warning-50 rounded-lg p-3">
                <h4 className="font-medium text-warning-900 mb-1">Features</h4>
                <ul className="text-warning-800 text-sm space-y-1">
                  <li>• Production-like environment</li>
                  <li>• Test data sets</li>
                  <li>• Performance monitoring</li>
                  <li>• User acceptance testing</li>
                </ul>
              </div>
              
              <div className="bg-neutral-900 rounded-lg p-3">
                <pre className="text-accent-400 font-mono text-xs">{`VITE_API_URL=https://staging-api.ombaro.com
VITE_NODE_ENV=staging`}</pre>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error-100 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-error-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Production</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-error-50 rounded-lg p-3">
                <h4 className="font-medium text-error-900 mb-1">Features</h4>
                <ul className="text-error-800 text-sm space-y-1">
                  <li>• Optimized builds</li>
                  <li>• Error tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• Security hardening</li>
                </ul>
              </div>
              
              <div className="bg-neutral-900 rounded-lg p-3">
                <pre className="text-accent-400 font-mono text-xs">{`VITE_API_URL=https://api.ombaro.com
VITE_NODE_ENV=production`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Deployment */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Mobile Application Deployment</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">EAS Build Configuration</h3>
            
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <pre className="text-accent-400 font-mono text-sm">{`// eas.json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "env": {
        "EXPO_PUBLIC_API_URL": "https://api.ombaro.com"
      }
    }
  },
  "submit": {
    "production": {}
  }
}`}</pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary-50 rounded-lg p-4">
                <h4 className="font-semibold text-secondary-900 mb-2">Build Profiles</h4>
                <ul className="text-secondary-800 text-sm space-y-1">
                  <li>• <strong>Development:</strong> Debug builds with dev tools</li>
                  <li>• <strong>Preview:</strong> Internal testing builds</li>
                  <li>• <strong>Production:</strong> App store ready builds</li>
                </ul>
              </div>
              
              <div className="bg-accent-50 rounded-lg p-4">
                <h4 className="font-semibold text-accent-900 mb-2">Distribution</h4>
                <ul className="text-accent-800 text-sm space-y-1">
                  <li>• <strong>Internal:</strong> TestFlight/Internal testing</li>
                  <li>• <strong>Store:</strong> Public app store release</li>
                  <li>• <strong>Simulator:</strong> Development testing only</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">App Store Guidelines</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">iOS App Store</h4>
                <div className="space-y-3">
                  <div className="bg-primary-50 rounded-lg p-3">
                    <h5 className="font-medium text-primary-900 mb-1">Review Guidelines</h5>
                    <ul className="text-primary-800 text-sm space-y-1">
                      <li>• App functionality must be clear</li>
                      <li>• No placeholder content</li>
                      <li>• Privacy policy required</li>
                      <li>• In-app purchases properly implemented</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <pre className="text-accent-400 font-mono text-xs">{`# Submit to App Store
eas submit --platform ios --latest`}</pre>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Google Play Store</h4>
                <div className="space-y-3">
                  <div className="bg-secondary-50 rounded-lg p-3">
                    <h5 className="font-medium text-secondary-900 mb-1">Policy Requirements</h5>
                    <ul className="text-secondary-800 text-sm space-y-1">
                      <li>• Target API level compliance</li>
                      <li>• Permissions justification</li>
                      <li>• Data safety form completion</li>
                      <li>• Content rating certification</li>
                    </ul>
                  </div>
                  
                  <div className="bg-neutral-900 rounded-lg p-3">
                    <pre className="text-accent-400 font-mono text-xs">{`# Submit to Play Store
eas submit --platform android --latest`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring & Maintenance */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Monitoring & Maintenance</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Performance Monitoring</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Application performance monitoring (APM)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Real user monitoring (RUM)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Error tracking and alerting</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Uptime monitoring</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Maintenance Tasks</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning-600" />
                  <span className="text-neutral-700">Regular dependency updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning-600" />
                  <span className="text-neutral-700">Security patch management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning-600" />
                  <span className="text-neutral-700">Database maintenance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-warning-600" />
                  <span className="text-neutral-700">Backup verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};