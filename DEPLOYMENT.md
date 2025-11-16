# Deployment Guide

This guide will help you deploy your Job Application Tracker to popular hosting platforms.

## Prerequisites

- A GitHub account (recommended for all platforms)
- Your code in a Git repository

## Option 1: Vercel (Recommended - Easiest)

Vercel is optimized for React/Vite apps and offers the simplest deployment process.

### Steps:

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   - Create a new repository on GitHub
   - Follow GitHub's instructions to push your code:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
     git branch -M main
     git push -u origin main
     ```

3. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and sign in with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Click "Deploy"
   - Your site will be live in ~1 minute! 🎉

## Option 2: Netlify

Netlify is another excellent choice with great features.

### Steps:

1. **Initialize Git and push to GitHub** (same as Vercel steps 1-2 above)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign Up" and sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Choose "GitHub" and select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click "Deploy site"
   - Your site will be live in ~1 minute! 🎉

## Option 3: GitHub Pages

Free hosting directly from your GitHub repository.

### Steps:

1. **Install gh-pages package**:
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json** - Add homepage and deploy scripts:
   ```json
   {
     "homepage": "https://YOUR_USERNAME.github.io/REPO_NAME",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js** - Add base path:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/REPO_NAME/',
   })
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages, /(root)
   - Save

## Option 4: Cloudflare Pages

Fast and free hosting with great performance.

### Steps:

1. **Initialize Git and push to GitHub** (same as Vercel steps 1-2)

2. **Deploy to Cloudflare Pages**:
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign up/Login
   - Click "Create a project"
   - Connect to GitHub and select your repository
   - Configure build:
     - Build command: `npm run build`
     - Build output directory: `dist`
   - Click "Save and Deploy"

## Quick Deploy via CLI (Vercel)

If you prefer command-line deployment:

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy
vercel

# Follow the prompts, and you're done!
```

## Notes

- All platforms offer free tiers perfect for this app
- Your app uses localStorage, so data is stored locally in each user's browser
- No backend or database configuration needed
- HTTPS is automatically provided on all platforms
- Custom domains can be added on all platforms

## Recommended: Vercel or Netlify

Both are excellent choices with:
- Automatic deployments on git push
- Free SSL certificates
- Great performance
- Easy setup
- Generous free tiers

Choose Vercel if you want the absolute easiest setup, or Netlify if you want more control and features.
