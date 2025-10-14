# OAuth Social Login Setup Guide

This guide will help you configure Google and Facebook OAuth providers for vendor quick signup functionality.

## Current Issue

The error **"Unsupported provider: provider is not enabled"** occurs because OAuth providers need to be enabled and configured in your Supabase project before they can be used.

## Prerequisites

- Access to Supabase Dashboard: https://vspkiuissuuesjsnnpqr.supabase.co
- Google Cloud Console account
- Facebook Developer account

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

### Common Errors

**Error: "Provider is not enabled"**
- Solution: Enable the provider in Supabase Dashboard
- Verify Client ID and Client Secret are saved

**Error: "Redirect URI mismatch"**
- Solution: Ensure redirect URIs match exactly in both provider console and Supabase
- Check for trailing slashes or http vs https

**Error: "Invalid client"**
- Solution: Verify Client ID and Client Secret are correct
- Check that credentials are from the correct project/app

**Error: "Access denied"**
- Solution: Ensure OAuth consent screen is published
- Verify required scopes are approved

### Testing in Development

For local testing:
1. Use `http://localhost:5173` as origin
2. Update redirect URIs in provider consoles
3. Test with test accounts first

### Security Best Practices

1. Never commit Client Secrets to version control
2. Use environment variables for sensitive data
3. Regularly rotate OAuth credentials
4. Monitor OAuth usage in provider dashboards
5. Enable 2FA on provider accounts
6. Set up alerts for suspicious OAuth activity

---

## Step 7: Code Changes Summary

### Fixed Issues:

1. **Instagram Button Handler**
   - Changed from incorrect Facebook provider to helpful info message
   - Users are directed to use Facebook login for Instagram authentication

2. **Enhanced Error Handling**
   - Added specific error message for "provider not enabled" error
   - Displays alternative signup options when OAuth fails
   - Shows helpful troubleshooting steps

3. **OAuth Redirect Configuration**
   - Updated redirect URL to use `/auth/callback` route
   - Added proper OAuth query parameters for Google
   - Created dedicated AuthCallback component

4. **AuthCallback Component**
   - Handles OAuth redirect after provider authentication
   - Extracts user data from OAuth session
   - Redirects to mobile verification screen
   - Displays loading and error states

### Files Modified:

- `src/components/auth/VendorQuickSignupScreen.tsx` - Fixed OAuth handlers
- `src/components/auth/AuthCallback.tsx` - New callback handler
- `src/AppRouter.tsx` - Added callback route

---

## Next Steps

1. **Configure OAuth Providers** in Supabase Dashboard
2. **Set up Google Cloud Console** credentials
3. **Set up Facebook Developer** app
4. **Test OAuth flows** in development
5. **Update production URLs** before deployment
6. **Monitor OAuth usage** and errors

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
