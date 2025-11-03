#!/bin/bash

# GitHub Pages Deployment Script
# This script builds and deploys the React app to GitHub Pages

set -e  # Exit on error

echo "🚀 Starting GitHub Pages deployment..."

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "📦 Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Build the application
echo "🔨 Building the application..."
npm run build

# Deploy to GitHub Pages
echo "📤 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deployment complete!"
echo "🌐 Your site will be available at: https://webdeverdan.github.io/baker-cost-profit-calculator"
