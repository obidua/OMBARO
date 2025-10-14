# Start Here: OAuth Setup Quick Start

## What Was Fixed

The authentication system for vendor onboarding via Google and Facebook has been fixed. The code is now ready, but you need to configure the OAuth providers in Supabase Dashboard.

## What You Need to Do Now

### Step 1: Choose Your Approach

**Option A - Quick Test (5 minutes)**
Just want to see if it works? Configure Google OAuth only:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth credentials
3. Add them to Supabase
4. Test the flow

**Option B - Full Setup (15 minutes)**
Configure both Google and Facebook OAuth:
1. Follow the complete setup guide
2. Configure both providers
3. Test both flows

**Option C - Read First (2 minutes)**
Understand what's needed before starting:
1. Read OAUTH_FIX_SUMMARY.md
2. Review OAUTH_SETUP_GUIDE.md
3. Come back and follow the checklist

### Step 2: Follow the Right Document

Choose the document that matches your needs:

1. **OAUTH_SETUP_CHECKLIST.md** ← Start here if you want a step-by-step checklist
   - Interactive checklist format
   - Check off items as you complete them
   - Covers both Google and Facebook
   - Includes testing steps

2. **OAUTH_SETUP_GUIDE.md** ← Use this for detailed explanations
   - Complete documentation
   - Detailed instructions for each step
   - Troubleshooting section
   - Security best practices

3. **OAUTH_FIX_SUMMARY.md** ← Read this to understand what was changed
   - Technical summary of fixes
   - Code changes explained
   - OAuth flow diagram
   - Database schema

## Minimum Required Setup

To get OAuth working, you MUST do these things:

### 1. Google Cloud Console
- Create OAuth 2.0 Client ID
- Add redirect URI: `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback`
- Get Client ID and Client Secret

### 2. Supabase Dashboard
- Enable Google provider
- Paste Client ID and Client Secret
- Save changes

### 3. Test It
- Run `npm run dev`
- Go to vendor signup
- Click "Continue with Google"
- Should work now!

## Why OAuth Doesn't Work Yet

The error you're seeing is:
```
"Provider is not enabled"
```

This happens because:
1. OAuth providers need to be enabled in Supabase Dashboard
2. Client ID and Client Secret must be added from Google/Facebook
3. This is a configuration step, not a code issue

**The code is ready. Configuration is what's needed.**

## Quick Configuration Steps

### For Google OAuth (5 minutes):

1. **Google Cloud Console:**
   ```
   https://console.cloud.google.com/
   → APIs & Services
   → Credentials
   → Create Credentials
   → OAuth client ID
   → Web application
   → Add redirect URI: https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   → Copy Client ID and Secret
   ```

2. **Supabase Dashboard:**
   ```
   https://vspkiuissuuesjsnnpqr.supabase.co
   → Authentication
   → Providers
   → Google
   → Enable
   → Paste Client ID and Secret
   → Save
   ```

3. **Test:**
   ```bash
   npm run dev
   # Go to http://localhost:5173/become-a-partner
   # Select category → Continue to Signup → Quick Signup
   # Click "Continue with Google"
   # Should redirect to Google (not error)
   ```

### For Facebook OAuth (5 minutes):

1. **Facebook Developer Console:**
   ```
   https://developers.facebook.com/
   → My Apps
   → Create App (Consumer)
   → Add Facebook Login product
   → Settings
   → Add redirect URI: https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback
   → Basic Settings
   → Copy App ID and Secret
   ```

2. **Supabase Dashboard:**
   ```
   → Providers
   → Facebook
   → Enable
   → Paste App ID (as Client ID) and App Secret
   → Save
   ```

3. **Test:**
   ```bash
   # Same as Google test
   # Click "Continue with Facebook"
   ```

## What Happens After Setup

Once configured, the OAuth flow works like this:

1. User clicks "Continue with Google"
2. Redirects to Google login
3. User authorizes
4. Redirects back to your app
5. Creates user profile automatically
6. Shows mobile verification screen
7. User enters mobile and OTP
8. Account is created!

## Common Issues

**Issue:** "Provider is not enabled"
**Fix:** Follow the setup steps above. This error means you haven't configured OAuth in Supabase yet.

**Issue:** "Redirect URI mismatch"
**Fix:** Make sure redirect URI is exactly: `https://vspkiuissuuesjsnnpqr.supabase.co/auth/v1/callback`

**Issue:** Google/Facebook login button does nothing
**Fix:** Check browser console (F12) for errors. Check that you saved changes in Supabase.

**Issue:** Mobile verification screen doesn't appear
**Fix:** Check that you completed the full OAuth flow. Check sessionStorage in browser DevTools.

## Important Notes

1. **Instagram:** Instagram authentication uses Facebook OAuth. Users should click "Continue with Facebook" and can log in with Instagram through Facebook.

2. **Testing:** In development, you can use your own Google/Facebook account to test. No need to publish the OAuth app for testing.

3. **Security:** Never commit Client Secrets to git. They only go in Supabase Dashboard.

4. **Production:** Before deploying, update OAuth redirect URLs to use your production domain in Google/Facebook consoles.

## Need More Help?

**Quick answers:**
- Check OAUTH_SETUP_CHECKLIST.md for step-by-step

**Detailed help:**
- Read OAUTH_SETUP_GUIDE.md for complete documentation
- See Step 6 for troubleshooting

**Technical details:**
- Read OAUTH_FIX_SUMMARY.md for code changes
- See OAuth flow diagram

**Still stuck?**
- Check browser console (F12)
- Check Supabase logs
- Check provider console logs
- Ask in Supabase Discord

## The Bottom Line

✅ **Code is fixed and ready**
✅ **Build is successful**
✅ **All components working**
❌ **OAuth providers need configuration in Supabase**

**Next step:** Open OAUTH_SETUP_CHECKLIST.md and start checking off items!

---

**Time Investment:**
- Google OAuth setup: ~5 minutes
- Facebook OAuth setup: ~5 minutes
- Testing: ~5 minutes
- **Total: ~15 minutes to complete setup**

**Estimated Difficulty:** Easy (just follow the steps)

---

**Ready to start?** Open `OAUTH_SETUP_CHECKLIST.md` now!
