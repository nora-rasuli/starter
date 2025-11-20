#!/bin/bash

# Deploy script for Next.js starter
# This script runs pre-deployment checks and optionally deploys to Vercel

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
  echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
  print_error "pnpm is not installed. Please install it first: npm install -g pnpm"
  exit 1
fi

print_success "pnpm is installed"

# Run pre-deployment checks
echo ""
echo "📋 Running pre-deployment checks..."

# Type check
echo "  Running type check..."
if pnpm typecheck; then
  print_success "Type check passed"
else
  print_error "Type check failed"
  exit 1
fi

# Lint
echo "  Running linter..."
if pnpm lint; then
  print_success "Lint passed"
else
  print_error "Lint failed"
  exit 1
fi

# Tests
echo "  Running tests..."
if pnpm test --run; then
  print_success "Tests passed"
else
  print_error "Tests failed"
  exit 1
fi

# Build
echo "  Building for production..."
if pnpm build; then
  print_success "Build successful"
else
  print_error "Build failed"
  exit 1
fi

echo ""
print_success "All pre-deployment checks passed!"

# Check if Vercel CLI is installed
if command -v vercel &> /dev/null; then
  echo ""
  echo "📦 Vercel CLI detected"
  read -p "Deploy to Vercel now? (y/n) " -n 1 -r
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Deploying to Vercel..."
    vercel --prod
    print_success "Deployment complete!"
  else
    print_warning "Skipping Vercel deployment. You can deploy manually with: vercel --prod"
  fi
else
  echo ""
  print_warning "Vercel CLI not found. Install it with: npm install -g vercel"
  print_warning "Or deploy via Vercel's Git integration (recommended for CI/CD)"
fi

echo ""
echo "✨ Done! Your project is ready to deploy."

