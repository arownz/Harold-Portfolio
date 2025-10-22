# 🚀 Deploy Your Portfolio to Netlify (Free)

## Why Netlify?

✅ **100% Free** for personal projects  
✅ **Automatic HTTPS** with SSL certificate  
✅ **Custom domain** support (free subdomain or your own)  
✅ **Continuous deployment** from Git  
✅ **Fast CDN** - Global edge network  
✅ **Easy updates** - Push to Git = Auto deploy  

---

## Option 1: Deploy via Netlify CLI (Recommended)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This will open your browser to authenticate.

### Step 3: Initialize and Deploy

```bash
# Navigate to your project
cd c:\Users\pasio\Downloads\MyPorfolio\my-portfolio1

# Build your project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

Follow the prompts:
- **Create & configure a new site**: Yes
- **Team**: Select your team
- **Site name**: `harold-pasion-portfolio` (or your choice)
- **Publish directory**: `dist`

Your site will be live at: `https://harold-pasion-portfolio.netlify.app`

---

## Option 2: Deploy via Netlify Dashboard (Easiest)

### Step 1: Build Your Project

```bash
npm run build
```

This creates a `dist` folder with your production files.

### Step 2: Go to Netlify

1. Visit [https://app.netlify.com/](https://app.netlify.com/)
2. Sign up/Login (free account)
3. Click **"Add new site"** → **"Deploy manually"**

### Step 3: Drag & Drop

1. Drag the entire `dist` folder to the upload area
2. Wait for deployment (usually 30 seconds)
3. Your site is live! 🎉

**Your URL**: `https://random-name-123.netlify.app`

### Step 4: Customize Site Name (Optional)

1. Go to **Site settings** → **Site details**
2. Click **"Change site name"**
3. Enter: `harold-pasion-portfolio`
4. Your new URL: `https://harold-pasion-portfolio.netlify.app`

---

## Option 3: Deploy from GitHub (Best for Updates)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial portfolio commit"

# Create a new repo on GitHub, then:
git remote add origin https://github.com/yourusername/portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**

### Benefits:
- ✅ Every Git push = Automatic deployment
- ✅ Preview deployments for branches
- ✅ Rollback to previous versions
- ✅ Build logs and error tracking

---

## Custom Domain (Optional)

### Free Netlify Subdomain:
- `https://harold-pasion-portfolio.netlify.app`

### Your Own Domain:
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Netlify: **Domain settings** → **Add custom domain**
3. Update your domain's DNS settings
4. Netlify provides free HTTPS automatically

---

## Environment Variables (For EmailJS)

If you want to hide your EmailJS credentials:

1. Go to **Site settings** → **Environment variables**
2. Add variables:
   - `VITE_EMAILJS_SERVICE_ID` = `service_hootxr7`
   - `VITE_EMAILJS_TEMPLATE_ID` = `template_lemm6u7`
   - `VITE_EMAILJS_PUBLIC_KEY` = `UCFzr7LWiiuQHaXcj`

3. Update `ContactSection.vue`:
```typescript
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
```

---

## Updating Your Portfolio

### If using Git + Netlify:
```bash
# Make changes to your code
git add .
git commit -m "Update portfolio"
git push
# Netlify auto-deploys! ✨
```

### If using manual deploy:
```bash
npm run build
netlify deploy --prod
```

---

## Troubleshooting

### Build fails?
- Check `npm run build` works locally first
- Verify Node version (18+)
- Check build logs in Netlify dashboard

### Resume not downloading?
- Make sure `Harold_Resume.pdf` is in the `public` folder
- Rebuild and redeploy

### EmailJS not working?
- Verify credentials in `ContactSection.vue`
- Check browser console for errors
- Test locally first with `npm run dev`

---

## 🎉 Your Portfolio is Live!

Share your portfolio:
- **Portfolio**: `https://harold-pasion-portfolio.netlify.app`
- **LinkedIn**: Add to your profile
- **Resume**: Include the link
- **GitHub**: Add to your README

---

## Other Free Hosting Options

If you want alternatives:

1. **Vercel** - Similar to Netlify, great for Next.js
2. **GitHub Pages** - Free, but requires some setup
3. **Cloudflare Pages** - Fast CDN, free tier
4. **Render** - Good for full-stack apps

But **Netlify is the easiest** for Vue/Vite projects! 🚀
