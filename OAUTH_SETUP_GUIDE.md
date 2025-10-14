# OAuth Social Login Setup Guide

This guide provides step-by-step instructions to configure Google and Facebook OAuth providers for vendor quick signup functionality in the OMBARO platform.

## Overview

The OMBARO vendor onboarding system supports three authentication methods:
1. **Google OAuth** - Sign up using Google account
2. **Facebook OAuth** - Sign up using Facebook account
3. **Instagram** - Uses Facebook OAuth (Instagram is owned by Meta)

## Current Issue

If you see the error **"Provider is not enabled"**, it means OAuth providers need to be configured in your Supabase project.

## Prerequisites

- Access to Supabase Dashboard: https://vspkiuissuuesjsnnpqr.supabase.co
- Google Cloud Console account (for Google OAuth)
- Facebook Developer account (for Facebook OAuth)
- Domain with SSL certificate (for production deployment)

---

## Quick Start Guide (Summary)

If you're already familiar with OAuth setup, here's the TL;DR:

1. **Supabase Configuration:**
   - Go to Authentication → Providers in Supabase Dashboard
   - Enable Google provider with Client ID and Client Secret
   - Enable Facebook provider with App ID and App Secret
   - Set Site URL to your application URL
   - Add redirect URLs to the allow list

2. **Google Cloud Console:**
   - Create OAuth 2.0 Client ID (Web application)
   - Add `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback` to Authorized redirect URIs
   - Add your domain to Authorized JavaScript origins
   - Copy Client ID and Secret to Supabase

3. **Facebook Developer Console:**
   - Create a Facebook App
   - Add Facebook Login product
   - Add `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback` to Valid OAuth Redirect URIs
   - Copy App ID and App Secret to Supabase
   - Set app to Live mode

4. **Test the Flow:**
   - Navigate to vendor signup page
   - Click "Quick Signup"
   - Test Google and Facebook login buttons
   - Verify redirect to mobile verification screen

For detailed step-by-step instructions, continue reading below.

---

## Step 1: Configure Google OAuth Provider

### 1.1 Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable Google+ API:
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google+ API"
   - Click "Enable"

### 1.2 Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Configure OAuth consent screen if prompted:
   - User Type: External
   - App name: OMBARO Vendor Platform
   - User support email: Your email
   - Developer contact: Your email
   - Scopes: email, profile, openid
4. Application type: Web application
5. Name: OMBARO Vendor OAuth
6. Authorized JavaScript origins:
   ```
   http://localhost:5173
   https://your-production-domain.com
   ```
7. Authorized redirect URIs:
   ```
   https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   http://localhost:54321/auth/v1/callback
   ```
8. Click "Create"
9. Copy your **Client ID** and **Client Secret**

### 1.3 Configure in Supabase

1. Go to [Supabase Dashboard](https://vspkiuissuuesjsnnpqr.supabase.co)
2. Navigate to Authentication > Providers
3. Find "Google" and click to expand
4. Enable the provider
5. Paste your **Client ID**
6. Paste your **Client Secret**
7. Configure additional settings:
   - Skip nonce check: false
   - Redirect URL: Use the auto-generated URL
8. Click "Save"

---

## Step 2: Configure Facebook OAuth Provider

### 2.1 Facebook Developer Setup

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" > "Create App"
3. Choose "Consumer" as app type
4. App name: OMBARO Vendor Platform
5. App contact email: Your email
6. Click "Create App"

### 2.2 Add Facebook Login Product

1. In your app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as platform
4. Enter your site URL: `https://your-domain.com`
5. Click "Save" and "Continue"

### 2.3 Configure OAuth Settings

1. Go to "Facebook Login" > "Settings"
2. Add Valid OAuth Redirect URIs:
   ```
   https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   http://localhost:54321/auth/v1/callback
   ```
3. Client OAuth Login: Yes
4. Web OAuth Login: Yes
5. Force Web OAuth Reauthentication: No
6. Use Strict Mode for Redirect URIs: Yes
7. Click "Save Changes"

### 2.4 Get App Credentials

1. Go to "Settings" > "Basic"
2. Copy your **App ID**
3. Click "Show" next to **App Secret** and copy it
4. Add your domain to "App Domains"
5. Add Privacy Policy URL
6. Add Terms of Service URL
7. Click "Save Changes"

### 2.5 Configure in Supabase

1. Go to [Supabase Dashboard](https://vspkiuissuuesjsnnpqr.supabase.co)
2. Navigate to Authentication > Providers
3. Find "Facebook" and click to expand
4. Enable the provider
5. Paste your **App ID** (as Client ID)
6. Paste your **App Secret** (as Client Secret)
7. Configure additional settings:
   - Skip nonce check: false
   - Redirect URL: Use the auto-generated URL
8. Click "Save"

### 2.6 Set App to Live Mode

1. In Facebook Developer dashboard, toggle "App Mode" from Development to Live
2. Note: You may need to complete App Review for certain permissions

---

## Step 3: Instagram Authentication

**Important:** Instagram login uses Facebook's OAuth system. When users click "Continue with Instagram":

1. They will be redirected to Facebook login
2. They can choose to log in with their Instagram account through Facebook
3. The authentication uses the same Facebook OAuth configuration

**Current Implementation:** The Instagram button now displays a helpful message directing users to use the Facebook button.

**Future Enhancement:** You can enable Instagram Basic Display API separately if needed, but it requires additional Facebook Business integration.

---

## Step 4: Configure Redirect URLs

### 4.1 Update Environment Variables (if needed)

Your `.env` file already contains:
```
VITE_SUPABASE_URL=https://vspkiuissuuesjsnnpqr.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

No additional environment variables needed for OAuth.

### 4.2 Production Redirect URLs

When deploying to production, update OAuth redirect URLs in both:

1. **Google Cloud Console:**
   - Add production domain to Authorized JavaScript origins
   - Add production callback URL to Authorized redirect URIs

2. **Facebook Developer Console:**
   - Add production domain to App Domains
   - Add production callback URL to Valid OAuth Redirect URIs

3. **Supabase Dashboard:**
   - Add production URL to "Site URL" in Authentication settings
   - Add production URL to "Redirect URLs" list

---

## Step 5: Testing OAuth Flow

### 5.1 Test Google Login

1. Navigate to vendor onboarding: `/become-a-partner`
2. Select "Spa & Massage" category
3. Click "Continue to Signup"
4. Click "Quick Signup"
5. Click "Continue with Google"
6. Complete Google OAuth flow
7. Verify redirect to mobile verification screen

### 5.2 Test Facebook Login

1. Follow same steps as Google
2. Click "Continue with Facebook"
3. Complete Facebook OAuth flow
4. Verify redirect to mobile verification screen

### 5.3 Verify Database Records

After successful OAuth login, check Supabase:

1. Go to Authentication > Users
2. Verify new user is created
3. Check `auth.users` table for user metadata
4. Verify `user_profiles` table entry (if applicable)

---

## Step 6: Troubleshooting

### Common Errors and Solutions

#### Error: "Provider is not enabled" or "Unsupported provider"

**Cause:** OAuth provider is not configured in Supabase

**Solution:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Find the provider (Google or Facebook)
3. Toggle it to "Enabled"
4. Add Client ID and Client Secret
5. Click "Save"

**Verification:**
```javascript
// The error appears here in console:
console.error('OAuth error:', error);
// Message: "provider is not enabled"
```

---

#### Error: "Redirect URI mismatch"

**Cause:** The redirect URI in your OAuth provider settings doesn't match Supabase's callback URL

**Solution:**

For Google:
1. Go to Google Cloud Console → Credentials
2. Edit your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", ensure you have:
   ```
   https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   ```
4. Make sure there's no trailing slash
5. Use HTTPS, not HTTP (except for localhost)

For Facebook:
1. Go to Facebook Developer Console → Your App → Facebook Login → Settings
2. Under "Valid OAuth Redirect URIs", ensure you have:
   ```
   https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   ```
3. Click "Save Changes"

---

#### Error: "Invalid client" or "Invalid client_id"

**Cause:** Client ID or Client Secret is incorrect

**Solution:**
1. Verify you copied the correct credentials from the provider console
2. Check for extra spaces or characters
3. Ensure you're using credentials from the correct project/app
4. For Facebook, use App ID as Client ID, not some other ID

**How to verify:**
- Google: Go to Credentials page and check the Client ID
- Facebook: Go to Settings → Basic and check App ID

---

#### Error: "Access denied" or "consent_required"

**Cause:** OAuth consent screen not properly configured or user cancelled

**Solution:**

For Google:
1. Go to OAuth consent screen in Google Cloud Console
2. Ensure app is published (or add test users if in testing mode)
3. Verify required scopes are added (email, profile)
4. Check that your email is listed as a test user if app is not published

For Facebook:
1. Ensure app is in "Live" mode (not Development)
2. Check that Privacy Policy URL is set
3. Verify Terms of Service URL is set
4. Make sure your account is listed as an app admin/developer

---

#### Error: "No session found"

**Cause:** Session was not created properly after OAuth callback

**Solution:**
1. Check browser console for any errors
2. Verify `detectSessionInUrl: true` is set in Supabase client config
3. Clear browser cookies and try again
4. Check if sessionStorage is being blocked by browser settings

**Verification:**
```javascript
// In AuthCallback.tsx
const { data: { session }, error } = await supabase.auth.getSession();
console.log('Session:', session); // Should not be null
```

---

#### Error: OAuth flow completes but mobile verification screen doesn't show

**Cause:** App component is not reading OAuth data from sessionStorage

**Solution:**
1. Check browser console for errors
2. Verify sessionStorage contains 'oauthData'
3. Check URL parameters include `?screen=vendorMobileVerification&oauth=true`
4. Ensure App.tsx useEffect is running

**Debug steps:**
```javascript
// Check in browser console:
console.log(sessionStorage.getItem('oauthData'));
console.log(window.location.search);
```

---

### Testing in Development

For local testing:

1. **Update OAuth Provider Settings:**
   - Add `http://localhost:5173` to authorized origins
   - Keep the Supabase callback URL (it stays the same)
   - No need to add localhost to redirect URIs

2. **Test with Personal Accounts:**
   - Use your own Google/Facebook account for initial testing
   - Add test accounts in provider console for team testing

3. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Check Console tab for errors
   - Check Network tab for failed requests
   - Check Application → Session Storage for oauth data

4. **Common Local Issues:**
   - HTTPS required for OAuth (Supabase handles this)
   - Cookies must be enabled
   - Third-party cookies should be allowed
   - Pop-up blocker might interfere

---

### Security Best Practices

1. **Never commit secrets:**
   - Client Secrets should only be in Supabase Dashboard
   - Never in your code or .env files that get committed

2. **Use environment variables:**
   - Store Supabase URL and anon key in .env
   - Add .env to .gitignore

3. **Regularly rotate credentials:**
   - Change OAuth secrets every 90 days
   - Update in both provider console and Supabase

4. **Monitor OAuth usage:**
   - Check Google Cloud Console for API usage
   - Check Facebook Developer Console for app usage
   - Set up alerts for unusual activity

5. **Enable 2FA:**
   - Enable two-factor authentication on Google account
   - Enable two-factor authentication on Facebook account
   - Protects against credential theft

6. **Restrict scope:**
   - Only request email and profile scopes
   - Don't ask for unnecessary permissions
   - Users trust apps that request minimal data

7. **Production security:**
   - Use HTTPS for all URLs
   - Set proper CORS settings
   - Implement rate limiting
   - Monitor for suspicious patterns

---

## Step 7: Code Implementation Summary

The following code changes have been implemented to support OAuth authentication:

### 1. AuthCallback Component (`src/components/auth/AuthCallback.tsx`)

**Key Features:**
- Handles OAuth redirect after provider authentication
- Creates user profile in `user_profiles` table if it doesn't exist
- Stores OAuth data in sessionStorage for App component
- Provides comprehensive error handling and user feedback
- Redirects to mobile verification screen with OAuth context

**Database Operations:**
- Checks for existing user profile
- Creates new profile with OAuth metadata (signup_method: 'social', social_provider, profile_completed: false)
- Sets role as 'vendor' for all OAuth signups

### 2. VendorQuickSignupScreen Component

**Enhancements:**
- Stores vendor category in sessionStorage before OAuth redirect
- Improved error messages for different OAuth failure scenarios
- Proper scope configuration for Google and Facebook
- Conditional query parameters for different providers

### 3. App Component Integration

**OAuth Flow Handler:**
- Checks URL parameters for OAuth callback indicator
- Retrieves OAuth data from sessionStorage
- Sets current screen to mobile verification
- Cleans up sessionStorage and URL after processing

### 4. OAuth Flow Diagram

```
User clicks "Continue with Google/Facebook"
    ↓
Store vendor category in sessionStorage
    ↓
Call supabase.auth.signInWithOAuth()
    ↓
Redirect to Provider Login Page
    ↓
User authorizes application
    ↓
Provider redirects to /auth/callback
    ↓
AuthCallback component activates
    ↓
Get session from Supabase
    ↓
Create/update user_profiles table
    ↓
Store OAuth data in sessionStorage
    ↓
Redirect to /app?screen=vendorMobileVerification&oauth=true
    ↓
App component reads OAuth data
    ↓
Navigate to Mobile Verification Screen
    ↓
User enters mobile number and verifies OTP
    ↓
Update user profile with mobile number
    ↓
Create quick_signup_profiles record
    ↓
Show success screen
```

### 5. Database Schema Used

**Tables:**
- `user_profiles` - Main user data with OAuth metadata
- `social_auth_providers` - OAuth provider linkage (optional)
- `otp_verifications` - Mobile verification codes
- `quick_signup_profiles` - Incomplete vendor registrations
- `vendor_categories` - Available business categories

---

## Step 8: Testing Your OAuth Setup

### Testing Checklist

- [ ] Google OAuth provider enabled in Supabase
- [ ] Facebook OAuth provider enabled in Supabase
- [ ] Redirect URIs configured in Google Cloud Console
- [ ] Redirect URIs configured in Facebook Developer Console
- [ ] Site URL set in Supabase Authentication settings
- [ ] Test Google login flow from start to finish
- [ ] Test Facebook login flow from start to finish
- [ ] Verify user_profiles record created with correct data
- [ ] Verify mobile verification works after OAuth
- [ ] Test error scenarios (cancelled login, invalid credentials)
- [ ] Verify session persists across page refreshes

### How to Test

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Navigate to Vendor Signup**
   - Go to http://localhost:5173/become-a-partner
   - Select a vendor category (e.g., "Spa & Massage")
   - Click "Continue to Signup"
   - Click "Quick Signup"

3. **Test Google OAuth**
   - Click "Continue with Google"
   - If error appears, follow the error message guidance
   - If successful, you should be redirected to Google login
   - After authorization, you should land on mobile verification screen

4. **Test Facebook OAuth**
   - Click "Continue with Facebook"
   - Follow same verification steps as Google

5. **Verify Database Records**
   - Open Supabase Dashboard
   - Go to Authentication → Users
   - Verify new user appears with correct email
   - Check user_profiles table for the new record
   - Verify signup_method = 'social' and social_provider is set

---

## Step 9: Next Steps After Configuration

1. **Complete OAuth Setup** in Supabase Dashboard
2. **Configure Provider Credentials** (Google, Facebook)
3. **Test in Development** environment
4. **Update Production URLs** before deploying
5. **Monitor OAuth Usage** through provider dashboards
6. **Set Up Error Monitoring** for OAuth failures
7. **Configure Email Templates** for OAuth users (optional)
8. **Review Privacy Policy** to include OAuth disclosures

---

## Support Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Supabase Discord Community](https://discord.supabase.com/)

---

## Quick Reference

### Supabase Dashboard URLs
- Project: https://vspkiuissuuesjsnnpqr.supabase.co
- Authentication: https://vspkiuissuuesjsnnpqr.supabase.co/project/_/auth/providers

### OAuth Callback URL
```
https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
```

### Application Redirect URL
```
https://your-domain.com/auth/callback
```

---

**Last Updated:** October 2025
**Version:** 1.0
