#!/bin/bash

# Clippy Website - DEPLOY NOW Script
# GitHub Username: khurramaziz9101112

echo "🚀 CLIPPY WEBSITE DEPLOYMENT - STARTING NOW!"
echo "============================================"
echo "GitHub Username: khurramaziz9101112"
echo "Repository: clippy-website"
echo "Domain: clippy.world"
echo ""

# Check current directory
if [ ! -f "index.html" ] || [ ! -f "CNAME" ]; then
    echo "❌ ERROR: Must run from clippy-website directory"
    echo "   Current: $(pwd)"
    echo "   Expected: /data/.openclaw/workspace/clippy-website"
    exit 1
fi

echo "✅ Step 1: Checking Git status..."
git status
echo ""

echo "✅ Step 2: Adding GitHub remote..."
echo "Command: git remote add origin https://github.com/khurramaziz9101112/clippy-website.git"
git remote add origin https://github.com/khurramaziz9101112/clippy-website.git
if [ $? -eq 0 ]; then
    echo "✓ GitHub remote added successfully"
else
    echo "⚠️ Remote may already exist, checking..."
    git remote -v
fi
echo ""

echo "✅ Step 3: Pushing to GitHub..."
echo "Command: git push -u origin main"
git push -u origin main
if [ $? -eq 0 ]; then
    echo "✓ Code pushed to GitHub successfully!"
    echo ""
    echo "🎉 DEPLOYMENT PHASE 1 COMPLETE!"
    echo "================================"
    echo ""
    echo "📋 NEXT STEPS:"
    echo "1. Go to: https://github.com/khurramaziz9101112/clippy-website"
    echo "2. Click 'Settings' → 'Pages' (left sidebar)"
    echo "3. Under 'Source', select: 'Deploy from a branch'"
    echo "4. Branch: 'main', Folder: '/' (root)"
    echo "5. Click 'Save'"
    echo "6. Add custom domain: 'clippy.world'"
    echo "7. Click 'Save' again"
    echo ""
    echo "🔧 DNS CONFIGURATION:"
    echo "At your domain registrar, add these 4 A records:"
    echo "185.199.108.153"
    echo "185.199.109.153"
    echo "185.199.110.153"
    echo "185.199.111.153"
    echo ""
    echo "⏳ Wait 5-60 minutes for DNS propagation"
    echo "🌐 Test at: https://clippy.world"
    echo "📊 Check: https://whatsmydns.net/#A/clippy.world"
else
    echo "❌ Push failed. Possible reasons:"
    echo "   - GitHub repository doesn't exist"
    echo "   - Need to create repo first: https://github.com/new"
    echo "   - Repository name: clippy-website"
    echo "   - Make it PUBLIC"
    echo "   - DO NOT initialize with README"
fi

echo ""
echo "📁 FILES DEPLOYED:"
echo "================="
ls -la | grep -E "\.(html|css|js|md|sh)$" | head -20
echo ""
echo "💰 COST: FREE (GitHub Pages)"
echo "⏱️ TIME: 15-30 minutes total"
echo ""