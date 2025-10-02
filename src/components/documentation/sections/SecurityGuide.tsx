import React from 'react';
import { Shield, Lock, Key, AlertTriangle, CheckCircle, Eye } from 'lucide-react';

export const SecurityGuide: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center">
            <Shield className="w-6 h-6 text-error-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Security Guide</h1>
            <p className="text-neutral-600">Security measures and best practices</p>
          </div>
        </div>
      </div>

      {/* Security Overview */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Security Overview</h2>
        
        <div className="card p-6 mb-6">
          <p className="text-lg text-neutral-700 leading-relaxed mb-6">
            Security is paramount for OMBARO, especially given the sensitive nature of personal and financial data. 
            The platform implements multiple layers of security to protect user information and ensure safe operations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Authentication</h3>
              <p className="text-neutral-600">Multi-factor authentication and secure login</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Authorization</h3>
              <p className="text-neutral-600">Role-based access control and permissions</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Data Protection</h3>
              <p className="text-neutral-600">Encryption and secure data handling</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warning-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-warning-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">Monitoring</h3>
              <p className="text-neutral-600">Security monitoring and audit trails</p>
            </div>
          </div>
        </div>
      </section>

      {/* Authentication & Authorization */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Authentication & Authorization</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Authentication Methods</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <h4 className="font-semibold text-primary-900 mb-2">Multi-Portal Authentication</h4>
                <ul className="text-primary-800 text-sm space-y-1">
                  <li>• Customer: Mobile OTP verification</li>
                  <li>• Employee: Mobile + Password</li>
                  <li>• Vendor: Email/Mobile + Password</li>
                  <li>• Admin: Secure credentials + 2FA</li>
                </ul>
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <h4 className="font-semibold text-secondary-900 mb-2">Identity Verification</h4>
                <ul className="text-secondary-800 text-sm space-y-1">
                  <li>• Aadhaar OTP verification for customers</li>
                  <li>• Document verification for vendors</li>
                  <li>• Background checks for employees</li>
                  <li>• Multi-factor authentication for admins</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary-100 rounded-lg flex items-center justify-center">
                <Key className="w-5 h-5 text-secondary-600" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Authorization System</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Role-Based Access Control</h4>
                <div className="bg-neutral-900 rounded-lg p-4">
                  <pre className="text-accent-400 font-mono text-sm">{`// Role hierarchy example
const ROLE_HIERARCHY = {
  'super_admin': ['*'], // All permissions
  'admin': ['users:read', 'users:create', 'spas:approve'],
  'employee': ['spas:create', 'vendors:manage'],
  'vendor': ['services:manage', 'bookings:view'],
  'customer': ['bookings:create', 'reviews:create']
};`}</pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Permission Matrix</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-accent-50 rounded p-3">
                    <p className="font-medium text-accent-900">Module Permissions</p>
                    <p className="text-accent-700">create, read, update, delete</p>
                  </div>
                  <div className="bg-warning-50 rounded p-3">
                    <p className="font-medium text-warning-900">Special Permissions</p>
                    <p className="text-warning-700">approve, export, admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Protection */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Data Protection</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Encryption Standards</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Data in Transit</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>HTTPS/TLS 1.3 for all API communication</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>Certificate pinning for mobile apps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>End-to-end encryption for sensitive data</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-3">Data at Rest</h4>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>AES-256 encryption for sensitive fields</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>Bcrypt for password hashing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-accent-600" />
                    <span>Encrypted database backups</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Privacy Compliance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <h4 className="font-semibold text-primary-900 mb-2">GDPR Compliance</h4>
                <ul className="text-primary-800 text-sm space-y-1">
                  <li>• Right to data portability</li>
                  <li>• Right to be forgotten</li>
                  <li>• Consent management</li>
                  <li>• Data minimization</li>
                </ul>
              </div>
              
              <div className="bg-secondary-50 rounded-lg p-4 border border-secondary-200">
                <h4 className="font-semibold text-secondary-900 mb-2">Data Retention</h4>
                <ul className="text-secondary-800 text-sm space-y-1">
                  <li>• Automatic data purging</li>
                  <li>• Retention policy enforcement</li>
                  <li>• Audit trail maintenance</li>
                  <li>• Backup lifecycle management</li>
                </ul>
              </div>
              
              <div className="bg-accent-50 rounded-lg p-4 border border-accent-200">
                <h4 className="font-semibold text-accent-900 mb-2">Access Controls</h4>
                <ul className="text-accent-800 text-sm space-y-1">
                  <li>• Principle of least privilege</li>
                  <li>• Regular access reviews</li>
                  <li>• Session management</li>
                  <li>• API rate limiting</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zero Tolerance Policy */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Zero Tolerance Policy</h2>
        
        <div className="card p-6">
          <div className="bg-error-50 border-2 border-error-200 rounded-xl p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-error-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-error-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-error-900 mb-3">Strict Policy Enforcement</h3>
                <p className="text-error-800 mb-4">
                  OMBARO maintains a zero-tolerance policy against inappropriate activities, human trafficking, 
                  or exploitation of any kind. The platform is designed exclusively for legitimate wellness services.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-error-900 mb-2">Prevention Measures</h4>
                    <ul className="text-error-800 text-sm space-y-1">
                      <li>• Clear terms and conditions</li>
                      <li>• Service provider verification</li>
                      <li>• Customer identity verification</li>
                      <li>• Automated content monitoring</li>
                      <li>• Regular compliance audits</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-error-900 mb-2">Enforcement Actions</h4>
                    <ul className="text-error-800 text-sm space-y-1">
                      <li>• Immediate account suspension</li>
                      <li>• Law enforcement cooperation</li>
                      <li>• Legal action when necessary</li>
                      <li>• Permanent platform bans</li>
                      <li>• Industry blacklisting</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Implementation */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Security Implementation</h2>
        
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">Password Security</h3>
            
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <pre className="text-accent-400 font-mono text-sm">{`// Password hashing with bcrypt
import bcrypt from 'bcrypt';

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (
  password: string, 
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};`}</pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-accent-50 rounded-lg p-4">
                <h4 className="font-semibold text-accent-900 mb-2">Password Requirements</h4>
                <ul className="text-accent-800 text-sm space-y-1">
                  <li>• Minimum 8 characters</li>
                  <li>• At least one uppercase letter</li>
                  <li>• At least one lowercase letter</li>
                  <li>• At least one number</li>
                  <li>• At least one special character</li>
                </ul>
              </div>
              
              <div className="bg-warning-50 rounded-lg p-4">
                <h4 className="font-semibold text-warning-900 mb-2">Security Measures</h4>
                <ul className="text-warning-800 text-sm space-y-1">
                  <li>• Account lockout after failed attempts</li>
                  <li>• Password history tracking</li>
                  <li>• Regular password expiry</li>
                  <li>• Breach detection monitoring</li>
                  <li>• Secure password reset flow</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-neutral-900 mb-4">JWT Token Management</h3>
            
            <div className="bg-neutral-900 rounded-lg p-4 mb-4">
              <pre className="text-accent-400 font-mono text-sm">{`// JWT token structure
{
  "sub": "user_id",
  "role": "customer",
  "permissions": ["bookings:create", "reviews:create"],
  "iat": 1641234567,
  "exp": 1641321567,
  "iss": "ombaro-api",
  "aud": "ombaro-app"
}`}</pre>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Token Security</h4>
                <ul className="space-y-1 text-neutral-700 text-sm">
                  <li>• Short expiration times (15 minutes)</li>
                  <li>• Refresh token rotation</li>
                  <li>• Secure storage (httpOnly cookies)</li>
                  <li>• Token blacklisting on logout</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-neutral-900 mb-2">Validation</h4>
                <ul className="space-y-1 text-neutral-700 text-sm">
                  <li>• Signature verification</li>
                  <li>• Expiration checking</li>
                  <li>• Issuer validation</li>
                  <li>• Audience verification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Security */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">API Security</h2>
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Security Headers</h3>
          
          <div className="bg-neutral-900 rounded-lg p-4 mb-6">
            <pre className="text-accent-400 font-mono text-sm">{`// Security headers configuration
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});`}</pre>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="font-semibold text-primary-900 mb-2">Rate Limiting</h4>
              <ul className="text-primary-800 text-sm space-y-1">
                <li>• 100 requests/minute per IP</li>
                <li>• 1000 requests/hour per user</li>
                <li>• Exponential backoff</li>
                <li>• DDoS protection</li>
              </ul>
            </div>
            
            <div className="bg-secondary-50 rounded-lg p-4">
              <h4 className="font-semibold text-secondary-900 mb-2">Input Validation</h4>
              <ul className="text-secondary-800 text-sm space-y-1">
                <li>• Schema validation</li>
                <li>• SQL injection prevention</li>
                <li>• XSS protection</li>
                <li>• CSRF tokens</li>
              </ul>
            </div>
            
            <div className="bg-accent-50 rounded-lg p-4">
              <h4 className="font-semibold text-accent-900 mb-2">Monitoring</h4>
              <ul className="text-accent-800 text-sm space-y-1">
                <li>• Failed login tracking</li>
                <li>• Suspicious activity alerts</li>
                <li>• API usage analytics</li>
                <li>• Security event logging</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Security Checklist */}
      <section>
        <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Security Checklist</h2>
        
        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Development Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Environment variables secured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Dependencies regularly updated</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Code security scanning enabled</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Secrets management implemented</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Security testing automated</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Production Security</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">SSL certificates configured</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Database access restricted</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Monitoring and alerting active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Regular security audits scheduled</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent-600" />
                  <span className="text-neutral-700">Incident response plan ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};