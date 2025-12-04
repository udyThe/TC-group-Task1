# Setup Instructions

## Problem: App not displaying correctly (white background, full width)

If your app looks different from Figma (white background, no mobile frame), follow these steps:

## Quick Fix

1. **Stop the development server** (Press Ctrl+C in terminal)

2. **Delete node_modules and package-lock.json:**
   ```bash
   rm -rf node_modules package-lock.json
   ```
   
   On Windows:
   ```bash
   rmdir /s node_modules
   del package-lock.json
   ```

3. **Reinstall dependencies:**
   ```bash
   npm install
   ```

4. **Start the dev server again:**
   ```bash
   npm run dev
   ```

5. **Clear browser cache and refresh:**
   - Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or open in incognito/private mode

## What Changed

✅ Updated Tailwind CSS from v4 to v3.4.1 (more stable)  
✅ Simplified globals.css with proper Tailwind directives  
✅ Added tailwind.config.ts for proper configuration  
✅ Fixed body styling to ensure dark background  
✅ Added proper viewport meta tag  

## Expected Result

After following these steps, you should see:
- ✅ Black background with centered mobile frame (max-width: 430px)
- ✅ Dark mode styling throughout
- ✅ Purple/blue gradient accents
- ✅ Proper mobile responsive design
- ✅ Onboarding screens on first load

## If Still Not Working

1. **Check browser console** for errors (F12)
2. **Verify all files exist:**
   - `/styles/globals.css`
   - `/tailwind.config.ts`
   - `/postcss.config.js`
   - All component files in `/components/`

3. **Try different browser** (Chrome, Firefox, Edge)

4. **Check if Vite is running properly:**
   ```bash
   npm run dev -- --host
   ```

## File Checklist

Make sure you have all these files:

```
✅ package.json
✅ vite.config.ts
✅ tsconfig.json
✅ tsconfig.node.json
✅ postcss.config.js
✅ tailwind.config.ts
✅ index.html
✅ main.tsx
✅ App.tsx
✅ styles/globals.css
✅ components/ (with all 25+ component files)
✅ components/figma/ImageWithFallback.tsx
```

## Port Issues

If you get a port conflict:
```bash
npm run dev -- --port 3001
```

Then open `http://localhost:3001`

## Still Need Help?

Check the browser console (F12 → Console tab) and look for any error messages.
