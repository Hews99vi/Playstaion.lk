# Deployment Guide for Namecheap Shared Hosting

## Pre-Deployment Checklist

### 1. Environment Variables
Create `.env` file in project root (if using Gemini AI):
```
GEMINI_API_KEY=your_api_key_here
```

### 2. Update Domain URLs
Replace `https://playstation.lk` with your actual domain in:
- `components/SEO.tsx` (line ~8)
- `index.html` (Open Graph and Twitter Card URLs)

### 3. Build the Project
```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Deployment Steps

### Step 1: Access cPanel File Manager
1. Log into your Namecheap cPanel
2. Open "File Manager"
3. Navigate to `public_html/` directory

### Step 2: Clear Old Files (if any)
1. Select all files in `public_html/`
2. Delete them (backup first if needed)

### Step 3: Upload Build Files
1. Upload ALL contents from the `dist/` folder to `public_html/`
   - index.html
   - assets/ folder
   - favicon files
   - robots.txt
   - sitemap.xml
   - site.webmanifest
   - .htaccess

### Step 4: Set Permissions
1. Right-click `.htaccess` → Change Permissions → 644
2. Right-click `index.html` → Change Permissions → 644
3. Set `assets/` folder → 755

### Step 5: Verify Deployment
Visit your domain: `https://yourdomain.com`

## Troubleshooting

### Issue: Blank page after deployment
**Solution**: Check browser console for errors. Ensure all files uploaded correctly.

### Issue: 404 on page refresh
**Solution**: Verify `.htaccess` file is present and mod_rewrite is enabled.

### Issue: Images not loading
**Solution**: Check file paths in cPanel. Ensure `assets/` folder uploaded correctly.

### Issue: Routing not working
**Solution**: The app uses HashRouter (URLs have `#`). This works on all servers without configuration.

## File Structure in public_html/
```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico
├── favicon.svg
├── favicon-96x96.png
├── apple-touch-icon.png
├── web-app-manifest-192x192.png
├── web-app-manifest-512x512.png
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [image files]
```

## Post-Deployment

### 1. Test All Features
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Shop page displays products
- [ ] Product details page works
- [ ] Repair booking form functions
- [ ] WhatsApp links work (+94 75 318 0148)
- [ ] Admin panel (login with credentials)
- [ ] Mobile responsiveness

### 2. SEO Verification
- [ ] Check `https://yourdomain.com/robots.txt`
- [ ] Check `https://yourdomain.com/sitemap.xml`
- [ ] Submit sitemap to Google Search Console
- [ ] Test Open Graph tags (share on Facebook/LinkedIn)

### 3. Performance Check
- [ ] Test page load speed (should be <3 seconds)
- [ ] Check mobile performance (Google PageSpeed Insights)
- [ ] Verify all images load correctly

## Maintenance

### Updating Content
1. Make changes locally
2. Run `npm run build`
3. Upload ONLY changed files from `dist/` to `public_html/`

### Backup
- Regular backups via cPanel
- Keep git repository updated

## Support
For hosting issues, contact Namecheap support.
For code issues, refer to project documentation.
