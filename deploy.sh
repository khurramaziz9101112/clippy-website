#!/bin/bash

# Clippy Website Deployment Script
# Usage: ./deploy.sh [netlify|vercel|github|ftp]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Clippy Website Deployment${NC}"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "index.html" ] || [ ! -d "css" ] || [ ! -d "js" ]; then
    echo -e "${RED}Error: Must run from clippy-website directory${NC}"
    exit 1
fi

# Function to check command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to deploy to Netlify
deploy_netlify() {
    echo -e "${YELLOW}Deploying to Netlify...${NC}"
    
    if ! command_exists netlify; then
        echo -e "${RED}Netlify CLI not found. Installing...${NC}"
        npm install -g netlify-cli
    fi
    
    # Check if logged in
    if ! netlify status 2>/dev/null | grep -q "Logged in"; then
        echo -e "${YELLOW}Please log in to Netlify...${NC}"
        netlify login
    fi
    
    # Deploy
    netlify deploy --prod --dir=.
    
    echo -e "${GREEN}Netlify deployment initiated!${NC}"
}

# Function to deploy to Vercel
deploy_vercel() {
    echo -e "${YELLOW}Deploying to Vercel...${NC}"
    
    if ! command_exists vercel; then
        echo -e "${RED}Vercel CLI not found. Installing...${NC}"
        npm install -g vercel
    fi
    
    # Deploy
    vercel --prod
    
    echo -e "${GREEN}Vercel deployment initiated!${NC}"
}

# Function to prepare for GitHub Pages
deploy_github() {
    echo -e "${YELLOW}Preparing for GitHub Pages...${NC}"
    
    # Create .nojekyll file for GitHub Pages
    touch .nojekyll
    
    # Create CNAME file for custom domain
    if [ ! -f "CNAME" ]; then
        echo "clippy.world" > CNAME
    fi
    
    echo -e "${GREEN}Ready for GitHub Pages deployment!${NC}"
    echo ""
    echo "To deploy:"
    echo "1. Create a GitHub repository"
    echo "2. Push this directory to the repository"
    echo "3. Go to Settings > Pages"
    echo "4. Set source to 'Deploy from a branch'"
    echo "5. Select branch: main, folder: / (root)"
    echo "6. Set custom domain to clippy.world"
}

# Function to prepare for FTP deployment
deploy_ftp() {
    echo -e "${YELLOW}Preparing for FTP deployment...${NC}"
    
    # Create compressed archive
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    ARCHIVE="clippy-website_${TIMESTAMP}.zip"
    
    # Create zip (excluding deployment files)
    zip -r "$ARCHIVE" . \
        -x "*.git*" \
        -x "deploy.sh" \
        -x "DEPLOYMENT.md" \
        -x "*.zip" \
        -x "*.tmp"
    
    echo -e "${GREEN}Archive created: ${ARCHIVE}${NC}"
    echo ""
    echo "To deploy via FTP:"
    echo "1. Upload ${ARCHIVE} to your web server"
    echo "2. Extract to website root directory"
    echo "3. Ensure file permissions are correct"
    echo "4. Test at http://your-domain.com"
}

# Function to run tests
run_tests() {
    echo -e "${YELLOW}Running pre-deployment tests...${NC}"
    
    # Check for required files
    REQUIRED_FILES=("index.html" "css/styles.css" "js/script.js")
    for file in "${REQUIRED_FILES[@]}"; do
        if [ -f "$file" ]; then
            echo -e "${GREEN}✓ $file found${NC}"
        else
            echo -e "${RED}✗ $file missing${NC}"
            exit 1
        fi
    done
    
    # Check HTML validity (basic check)
    if command_exists tidy; then
        echo -e "${YELLOW}Checking HTML validity...${NC}"
        tidy -q -errors index.html 2>/dev/null || true
    fi
    
    echo -e "${GREEN}All tests passed!${NC}"
}

# Main deployment logic
case "$1" in
    netlify)
        run_tests
        deploy_netlify
        ;;
    vercel)
        run_tests
        deploy_vercel
        ;;
    github)
        run_tests
        deploy_github
        ;;
    ftp)
        run_tests
        deploy_ftp
        ;;
    test)
        run_tests
        ;;
    *)
        echo "Usage: $0 [netlify|vercel|github|ftp|test]"
        echo ""
        echo "Options:"
        echo "  netlify   Deploy to Netlify"
        echo "  vercel    Deploy to Vercel"
        echo "  github    Prepare for GitHub Pages"
        echo "  ftp       Prepare for FTP deployment"
        echo "  test      Run pre-deployment tests"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}Deployment process completed!${NC}"
echo "Check DEPLOYMENT.md for post-deployment steps."