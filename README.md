# Clippy Website

A modern, responsive website for Clippy - an AI-first digital agency that transforms ideas into intelligent digital experiences.

## Features

- **Modern Design**: Clean, professional design with AI-themed visual elements
- **Fully Responsive**: Optimized for all devices (mobile, tablet, desktop)
- **Conversion Focused**: Clear CTAs and lead capture forms throughout
- **Performance Optimized**: Fast loading times and smooth animations
- **Accessibility**: WCAG compliant with proper semantic HTML
- **SEO Ready**: Proper meta tags and structured data

## Pages

1. **Homepage** - Hero section, value propositions, services preview, portfolio highlight
2. **Services** - Detailed AI-powered service offerings with case study teasers
3. **Portfolio** - Case studies with filtering by industry and service type
4. **About** - Company story, mission, values, and team profiles
5. **Contact** - Multiple contact options with forms and consultation booking

## Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties (CSS variables), Flexbox, Grid
- **JavaScript** - Vanilla JS for interactivity
- **Fonts** - Inter (Google Fonts)
- **Icons** - Emoji and custom CSS icons
- **No Frameworks** - Lightweight, no external dependencies

## Branding Guidelines

- **Primary Colors**: 
  - Clippy Blue: `#2A5CAA`
  - AI Teal: `#00C1D4`
  - Neural Purple: `#7B61FF`
- **Typography**: Inter (300, 400, 600, 700 weights)
- **Spacing**: Consistent 8px grid system
- **Border Radius**: 4px, 8px, 12px, 16px
- **Shadows**: Subtle, layered shadows for depth

## Project Structure

```
clippy-website/
├── index.html          # Homepage
├── services.html       # Services page
├── portfolio.html      # Portfolio page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── styles.css      # All styles
├── js/
│   └── script.js       # All JavaScript
├── images/             # Image assets
├── deploy.sh           # Deployment script
├── DEPLOYMENT.md       # Deployment guide
└── README.md           # This file
```

## Getting Started

### Local Development

1. Clone or download the project
2. Open `index.html` in a browser
3. Or run a local server:
   ```bash
   # Python 3
   python3 -m http.server 8080
   
   # Node.js
   npx serve .
   ```

### Development Server

The project includes a simple test server. To run:

```bash
# Start the server
cd clippy-website
python3 -m http.server 8080 &
```

Then open http://localhost:8080 in your browser.

## Deployment

### Quick Deployment Options

1. **Netlify** (Recommended):
   ```bash
   ./deploy.sh netlify
   ```

2. **Vercel**:
   ```bash
   ./deploy.sh vercel
   ```

3. **GitHub Pages**:
   ```bash
   ./deploy.sh github
   ```

4. **Traditional Hosting**:
   ```bash
   ./deploy.sh ftp
   ```

### Custom Domain Setup

To use `clippy.world`:

1. Purchase domain from registrar
2. Configure DNS as per DEPLOYMENT.md
3. Set up SSL/HTTPS
4. Update CNAME/A records

## Performance

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Optimization Features
- Minimal HTTP requests
- Optimized images (WebP format recommended)
- CSS/JS minification (see deploy.sh)
- Lazy loading for images
- Proper caching headers

## Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome for Android)

## Accessibility

- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatible
- Proper color contrast ratios
- Focus indicators for interactive elements

## Maintenance

### Regular Updates
1. Update portfolio with new case studies
2. Refresh blog/content (when added)
3. Update team information
4. Test forms and links regularly

### Monitoring
1. Uptime monitoring (recommended: UptimeRobot)
2. Form submission tracking
3. Performance monitoring
4. Security scanning

## License

All rights reserved. This website is proprietary to Clippy.

## Contact

For website issues or updates:
- Email: hello@clippy.world
- Issue: Submit via repository (if public)

---

**Built with ❤️ by the Clippy Team**  
*Last Updated: April 2024*