# OAuth Setup Checklist

Use this checklist to configure OAuth authentication for the OMBARO vendor onboarding system.

## Pre-Setup

- [ ] Read OAUTH_SETUP_GUIDE.md for detailed instructions
- [ ] Have access to Supabase Dashboard
- [ ] Have Google Cloud Console account ready
- [ ] Have Facebook Developer account ready

---

## Google OAuth Setup

### Google Cloud Console

- [ ] Go to https://console.cloud.google.com/
- [ ] Create or select a project
- [ ] Enable Google+ API (or People API)
- [ ] Go to "APIs & Services" → "Credentials"
- [ ] Click "Create Credentials" → "OAuth client ID"
- [ ] Configure OAuth consent screen if prompted
  - [ ] User Type: External
  - [ ] App name: OMBARO Vendor Platform
  - [ ] User support email: Your email
  - [ ] Developer contact: Your email
  - [ ] Scopes: email, profile, openid
- [ ] Create OAuth Client ID
  - [ ] Application type: Web application
  - [ ] Name: OMBARO Vendor OAuth
- [ ] Add Authorized JavaScript origins:
  - [ ] `http://localhost:5173` (for local testing)
  - [ ] Your production domain (e.g., `https://yourdomain.com`)
- [ ] Add Authorized redirect URIs:
  - [ ] `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback`
- [ ] Click "Create"
- [ ] **Copy Client ID** (save it temporarily)
- [ ] **Copy Client Secret** (save it temporarily)

### Supabase Dashboard - Google

- [ ] Go to https://vspkiuissuuesjsnnpqr.supabase.co
- [ ] Navigate to Authentication → Providers
- [ ] Find "Google" and click to expand
- [ ] Toggle "Enable Sign in with Google"
- [ ] Paste **Client ID** from Google Cloud Console
- [ ] Paste **Client Secret** from Google Cloud Console
- [ ] Leave other settings as default
- [ ] Click "Save"

### Test Google OAuth

- [ ] Run `npm run dev`
- [ ] Go to http://localhost:5173/become-a-partner
- [ ] Select vendor category → Continue to Signup → Quick Signup
- [ ] Click "Continue with Google"
- [ ] Should redirect to Google login (not show error)
- [ ] After login, should redirect to mobile verification screen

---

## Facebook OAuth Setup

### Facebook Developer Console

- [ ] Go to https://developers.facebook.com/
- [ ] Click "My Apps" → "Create App"
- [ ] Choose "Consumer" as app type
- [ ] App name: OMBARO Vendor Platform
- [ ] App contact email: Your email
- [ ] Click "Create App"
- [ ] In app dashboard, click "Add Product"
- [ ] Find "Facebook Login" and click "Set Up"
- [ ] Choose "Web" as platform
- [ ] Enter site URL: Your domain
- [ ] Click "Save" and "Continue"

### Configure Facebook Login

- [ ] Go to "Facebook Login" → "Settings"
- [ ] Add Valid OAuth Redirect URIs:
  - [ ] `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback`
- [ ] Client OAuth Login: Yes
- [ ] Web OAuth Login: Yes
- [ ] Force Web OAuth Reauthentication: No
- [ ] Use Strict Mode for Redirect URIs: Yes
- [ ] Click "Save Changes"

### Get App Credentials

- [ ] Go to "Settings" → "Basic"
- [ ] **Copy App ID** (save it temporarily)
- [ ] Click "Show" next to App Secret
- [ ] **Copy App Secret** (save it temporarily)
- [ ] Add your domain to "App Domains"
- [ ] Add Privacy Policy URL (required)
- [ ] Add Terms of Service URL (optional but recommended)
- [ ] Click "Save Changes"

### Set App to Live

- [ ] Toggle "App Mode" from Development to Live
  - Note: You may need to complete App Review for certain features
  - For basic email and profile access, review is usually not needed
- [ ] Confirm the mode change

### Supabase Dashboard - Facebook

- [ ] Go to https://vspkiuissuuesjsnnpqr.supabase.co
- [ ] Navigate to Authentication → Providers
- [ ] Find "Facebook" and click to expand
- [ ] Toggle "Enable Sign in with Facebook"
- [ ] Paste **App ID** as Client ID
- [ ] Paste **App Secret** as Client Secret
- [ ] Leave other settings as default
- [ ] Click "Save"

### Test Facebook OAuth

- [ ] Run `npm run dev` (if not already running)
- [ ] Go to http://localhost:5173/become-a-partner
- [ ] Select vendor category → Continue to Signup → Quick Signup
- [ ] Click "Continue with Facebook"
- [ ] Should redirect to Facebook login (not show error)
- [ ] After login, should redirect to mobile verification screen

---

## Supabase General Configuration

- [ ] Go to Authentication → URL Configuration
- [ ] Set Site URL to your application URL:
  - Development: `http://localhost:5173`
  - Production: Your production domain
- [ ] Add Redirect URLs (if needed):
  - [ ] `http://localhost:5173/**`
  - [ ] Your production domain with wildcard
- [ ] Click "Save"

---

## Final Testing

### Complete OAuth Flow Test

- [ ] Test Google OAuth flow:
  - [ ] Click "Continue with Google"
  - [ ] Authorize with Google
  - [ ] Redirected to mobile verification
  - [ ] Enter mobile number
  - [ ] Receive OTP (currently 1234 for testing)
  - [ ] Verify OTP
  - [ ] See success screen
- [ ] Test Facebook OAuth flow:
  - [ ] Click "Continue with Facebook"
  - [ ] Authorize with Facebook
  - [ ] Follow same steps as Google
- [ ] Test Instagram button:
  - [ ] Should show message about using Facebook

### Database Verification

- [ ] Go to Supabase Dashboard
- [ ] Check Authentication → Users
  - [ ] New user appears after OAuth login
  - [ ] Email is populated
- [ ] Check Tables → user_profiles
  - [ ] Record exists for new user
  - [ ] `signup_method` = 'social'
  - [ ] `social_provider` is set (google or facebook)
  - [ ] `role` = 'vendor'
  - [ ] `profile_completed` = false
- [ ] Check Tables → quick_signup_profiles
  - [ ] Record created after mobile verification
  - [ ] Mobile number is stored
  - [ ] `mobile_verified` = true

### Error Testing

- [ ] Test cancelled authentication
  - [ ] Start OAuth flow
  - [ ] Cancel on provider screen
  - [ ] Should show appropriate error message
- [ ] Test with existing account
  - [ ] Use same email for Google and Facebook
  - [ ] System should handle gracefully

---

## Troubleshooting

If you encounter issues, check:

- [ ] Browser console for errors (F12 → Console)
- [ ] Network tab for failed requests (F12 → Network)
- [ ] SessionStorage contains 'oauthData' (F12 → Application → Session Storage)
- [ ] URL parameters after redirect
- [ ] Supabase Dashboard → Authentication → Logs

Common issues and solutions are in `OAUTH_SETUP_GUIDE.md` Step 6.

---

## Production Deployment Checklist

Before deploying to production:

- [ ] Update Google OAuth settings:
  - [ ] Add production domain to Authorized JavaScript origins
  - [ ] Keep Supabase callback URL (doesn't change)
- [ ] Update Facebook OAuth settings:
  - [ ] Add production domain to App Domains
  - [ ] Keep Supabase callback URL (doesn't change)
  - [ ] Ensure app is in Live mode
- [ ] Update Supabase settings:
  - [ ] Set Site URL to production domain
  - [ ] Update Redirect URLs
- [ ] Test OAuth on production:
  - [ ] Google login works
  - [ ] Facebook login works
  - [ ] Mobile verification works
  - [ ] Database records created correctly
- [ ] Monitor for errors:
  - [ ] Check Google Cloud Console quotas
  - [ ] Check Facebook Developer Console usage
  - [ ] Check Supabase logs

---

## Security Checklist

- [ ] Client Secrets are not in code or committed to git
- [ ] .env file is in .gitignore
- [ ] 2FA enabled on Google account
- [ ] 2FA enabled on Facebook account
- [ ] OAuth credentials rotated every 90 days
- [ ] Only necessary scopes requested (email, profile)
- [ ] Privacy policy URL is accessible
- [ ] Terms of service URL is accessible

---

## Completion

- [ ] All OAuth providers configured and tested
- [ ] Documentation reviewed and understood
- [ ] Team members trained on OAuth flow
- [ ] Monitoring set up for OAuth errors
- [ ] Backup plan in place if OAuth fails (detailed signup option)

---

**Need Help?**
- See `OAUTH_SETUP_GUIDE.md` for detailed instructions
- See `OAUTH_FIX_SUMMARY.md` for technical implementation details
- Check Supabase Discord for community support
- Review provider documentation (Google, Facebook)

---

**Checklist Version:** 1.0
**Last Updated:** October 2025
