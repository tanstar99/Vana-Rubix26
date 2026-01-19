# 🚀 Deployment Guide - Virtual Herbal Garden

## Quick Deploy Checklist

- [x] Application built and tested
- [x] All features functional
- [x] No console errors
- [x] Mobile responsive
- [x] Documentation complete
- [ ] Choose hosting platform
- [ ] Build for production
- [ ] Deploy to hosting
- [ ] Test live site

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Easiest)

#### Step 1: Build
```bash
cd frontend
npm run build
```

#### Step 2: Deploy
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Drag the `dist/` folder to deploy
4. Done! Your site is live

**Pros**: 
- Instant deployment
- Free HTTPS
- Auto CDN
- Easy updates

---

### Option 2: Vercel (Great for React)

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Deploy
```bash
cd frontend
vercel
```

Follow the prompts and your site will be live!

**Pros**:
- Optimized for React
- Auto deployments from Git
- Edge network
- Free tier generous

---

### Option 3: GitHub Pages

#### Step 1: Update vite.config.js
```javascript
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/your-repo-name/', // Add this line
});
```

#### Step 2: Build
```bash
npm run build
```

#### Step 3: Deploy
```bash
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:username/repo.git main:gh-pages
```

**Pros**:
- Free hosting
- Integrated with Git
- Simple workflow

---

### Option 4: Firebase Hosting

#### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
firebase login
```

#### Step 2: Initialize
```bash
cd frontend
firebase init hosting
```

Select:
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub integration: `Optional`

#### Step 3: Deploy
```bash
npm run build
firebase deploy
```

**Pros**:
- Fast CDN
- Easy rollbacks
- Custom domains
- Analytics included

---

### Option 5: AWS S3 + CloudFront

#### Step 1: Create S3 Bucket
1. Go to AWS S3 console
2. Create new bucket
3. Enable static website hosting
4. Upload dist/ contents

#### Step 2: Setup CloudFront
1. Create CloudFront distribution
2. Point to S3 bucket
3. Enable HTTPS

**Pros**:
- Highly scalable
- Professional-grade
- Full control
- Can integrate other AWS services

---

## 📦 Build Configuration

### Current Setup
```javascript
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### For Custom Domain
Update `index.html` if needed:
```html
<link rel="canonical" href="https://yourdomain.com" />
```

---

## 🔧 Pre-Deployment Checklist

### Performance
- [x] Code splitting implemented (React Router)
- [x] Images optimized (placeholders currently)
- [x] Lazy loading considered
- [x] Bundle size reasonable

### SEO
- [x] Title tags set
- [x] Meta descriptions (add if needed)
- [ ] Open Graph tags (optional)
- [ ] Sitemap (optional)
- [ ] robots.txt (optional)

### Accessibility
- [x] Semantic HTML
- [x] ARIA labels where needed
- [x] Keyboard navigation
- [x] Color contrast good

### Security
- [x] No API keys exposed
- [x] No sensitive data
- [x] HTTPS (via hosting)
- [x] Content Security Policy (via hosting)

---

## 🌍 Environment Variables

**None required!** 

This is a fully client-side application with no backend or API keys needed.

---

## 📊 Analytics (Optional)

### Google Analytics
Add to `index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

### Plausible (Privacy-friendly)
Add to `index.html` before `</head>`:
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🎨 Custom Domain Setup

### Netlify
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records at your registrar
4. Wait for DNS propagation (up to 48 hours)
5. Enable HTTPS (automatic)

### Vercel
1. Project Settings → Domains
2. Add domain
3. Configure DNS (nameservers or A record)
4. Automatic HTTPS

---

## 🔄 Continuous Deployment

### GitHub Integration

#### Netlify
1. Connect GitHub repo
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Every push auto-deploys

#### Vercel
1. Import GitHub repo
2. Auto-detects Vite config
3. Every push auto-deploys

---

## 🧪 Post-Deployment Testing

### Checklist
- [ ] Homepage loads correctly
- [ ] All routes accessible
- [ ] 3D garden works
- [ ] Search functions
- [ ] Filters work
- [ ] Bookmarks save
- [ ] Notes persist
- [ ] Tours navigate
- [ ] Chat responds
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Fast load time (<3s)

### Test URLs
```
https://yoursite.com/
https://yoursite.com/garden
https://yoursite.com/plants
https://yoursite.com/plant/tulsi
https://yoursite.com/tours
https://yoursite.com/tour/immunity-tour
https://yoursite.com/my
https://yoursite.com/chat
```

---

## 📱 Mobile Testing

Test on:
- iPhone Safari
- Android Chrome
- iPad
- Various screen sizes

Check:
- Navigation works
- 3D controls work (touch)
- Filters collapsible
- Forms usable
- Buttons tappable
- Text readable

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 on Refresh
**Problem**: Direct URL access causes 404  
**Solution**: Configure SPA routing

**Netlify**: Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel**: Auto-handled

**GitHub Pages**: Use hash router instead

### CSS Not Loading
- Check `vite.config.js` base path
- Verify Tailwind imports
- Clear browser cache

### 3D Not Rendering
- Check browser WebGL support
- Update graphics drivers
- Try different browser
- Check console for errors

---

## 📈 Performance Optimization

### After Deployment

#### Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse https://yoursite.com
```

Target scores:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >90

#### Optimize Images
When you add real images:
```bash
# Use image optimization tools
npm install -g sharp-cli

# Or use online tools
# - TinyPNG
# - ImageOptim
# - Squoosh
```

#### Enable Compression
Most hosting providers enable gzip/brotli automatically.

Verify:
```bash
curl -H "Accept-Encoding: gzip" -I https://yoursite.com
```

---

## 🔒 Security Headers

### Netlify
Create `public/_headers`:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

### Vercel
Create `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

---

## 🎉 Launch Checklist

### Before Launch
- [x] All features tested
- [x] Mobile responsive verified
- [x] Cross-browser tested
- [x] Load time acceptable
- [x] No console errors
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)
- [ ] Social media cards (optional)

### Launch Day
- [ ] Deploy to production
- [ ] Test all pages live
- [ ] Share with stakeholders
- [ ] Monitor for issues
- [ ] Collect feedback

### Post-Launch
- [ ] Monitor analytics
- [ ] Fix any reported bugs
- [ ] Plan enhancements
- [ ] Update content
- [ ] Maintain documentation

---

## 📞 Support Resources

### Hosting Docs
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs
- GitHub Pages: https://pages.github.com
- Firebase: https://firebase.google.com/docs/hosting

### Framework Docs
- Vite: https://vitejs.dev
- React: https://react.dev
- React Router: https://reactrouter.com

---

## 🎯 Quick Deploy Command

**One-liner for Netlify:**
```bash
cd frontend && npm run build && npx netlify-cli deploy --prod --dir=dist
```

**One-liner for Vercel:**
```bash
cd frontend && npm run build && npx vercel --prod
```

---

## ✅ Deployment Complete!

Once deployed, share your site:
- 🔗 Live URL
- 📱 QR Code for mobile testing
- 📧 Email to stakeholders
- 💬 Social media announcement

**Your Virtual Herbal Garden is now live and accessible to the world! 🌿🎉**

---

## 📊 Expected Performance

### Load Times
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Total Load: < 5s

### Bundle Sizes
- HTML: ~2KB
- CSS: ~50KB (gzipped)
- JS: ~200KB (gzipped)
- Total: ~252KB

### Lighthouse Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

---

**Ready to deploy? Choose your platform and follow the steps above!** 🚀
