# Clippy Website Deployment Guide

## Overview
This document outlines the deployment process for the Clippy website to a live domain (clippy.world).

## Prerequisites
1. Domain registered (clippy.world)
2. Web hosting service (recommended: Netlify, Vercel, or GitHub Pages)
3. Git repository for the website code

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push code to GitHub/GitLab repository
2. Connect Netlify to your repository
3. Configure build settings:
   - Build command: (none - static site)
   - Publish directory: `clippy-website/`
4. Set custom domain: `clippy.world`
5. Enable HTTPS automatically

### Option 2: Vercel
1. Push code to GitHub repository
2. Import project in Vercel
3. Configure:
   - Framework: Static
   - Output directory: `clippy-website`
4. Set custom domain: `clippy.world`

### Option 3: GitHub Pages
1. Push code to GitHub repository
2. Go to Settings > Pages
3. Configure:
   - Source: Deploy from a branch
   - Branch: main (or master)
   - Folder: `/clippy-website`
4. Set custom domain: `clippy.world`

### Option 4: Traditional Web Hosting
1. Upload all files via FTP/SFTP to web server
2. Ensure directory structure is maintained
3. Configure domain DNS to point to hosting server

## DNS Configuration
For custom domain `clippy.world`:

1. **If using Netlify/Vercel:**
   - Add CNAME record: `clippy.world` → `your-site.netlify.app` (or vercel equivalent)
   - Or use their nameservers

2. **If using traditional hosting:**
   - A record: `clippy.world` → [server IP address]
   - Or CNAME if provided by host

## Build Optimization (Optional)
The site is already optimized for production, but additional steps:

1. **Minify CSS/JS:**
   ```bash
   # Install minification tools
   npm install -g css-minify uglify-js
   
   # Minify CSS
   css-minify -f css/styles.css -o css/
   
   # Minify JS
   uglifyjs js/script.js -o js/script.min.js -c -m
   ```

2. **Image Optimization:**
   - Convert images to WebP format
   - Compress images with tools like ImageOptim or Squoosh

3. **Performance Testing:**
   - Run Lighthouse audit in Chrome DevTools
   - Aim for scores above 90 in all categories

## Post-Deployment Checklist
- [ ] Website loads at https://clippy.world
- [ ] All pages accessible and functional
- [ ] Mobile responsive design works correctly
- [ ] Contact forms submit successfully
- [ ] HTTPS/SSL certificate active
- [ ] Analytics tracking implemented (if needed)
- [ ] SEO meta tags verified
- [ ] Social media previews tested

## Monitoring & Maintenance

### Analytics
1. **Google Analytics:**
   - Add tracking code to all pages
   - Set up goals for contact form submissions

2. **Uptime Monitoring:**
   - Use services like UptimeRobot or Pingdom
   - Set alerts for downtime

### Regular Updates
1. **Content Updates:**
   - Update portfolio with new case studies
   - Refresh blog/content regularly
   - Update team information as needed

2. **Technical Updates:**
   - Keep dependencies updated
   - Regular security audits
   - Performance optimization reviews

### Backup Strategy
1. **Code:** Version control (Git)
2. **Content:** Regular exports of dynamic content
3. **Database:** Regular backups if using CMS

## Troubleshooting

### Common Issues

1. **Domain not resolving:**
   - Check DNS propagation (can take 24-48 hours)
   - Verify DNS records are correct
   - Clear local DNS cache

2. **HTTPS not working:**
   - Ensure SSL certificate is issued
   - Check for mixed content warnings
   - Force HTTPS redirects

3. **Form submissions failing:**
   - Test form endpoint
   - Check spam filters
   - Verify email configuration

4. **Mobile issues:**
   - Test on multiple devices
   - Check viewport meta tag
   - Verify responsive CSS

### Support Contacts
- **Hosting Provider:** [Contact information]
- **Domain Registrar:** [Contact information]
- **Development Team:** hello@clippy.world

## Emergency Procedures

### Site Down
1. Check hosting provider status page
2. Verify DNS configuration
3. Restore from backup if needed
4. Contact support immediately

### Security Breach
1. Take site offline temporarily
2. Change all passwords
3. Scan for malware
4. Restore from clean backup
5. Implement additional security measures

---

**Last Updated:** April 2024  
**Maintained by:** Clippy Development Team