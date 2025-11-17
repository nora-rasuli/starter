#!/usr/bin/env node

/**
 * Interactive setup script for the starter template
 * Prompts user for initial configuration values
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise(resolve => rl.question(query, resolve))
}

async function setup() {
  console.log('🚀 Welcome to the Next.js Portfolio Starter Setup!\n')
  console.log('This script will help you configure your project.\n')

  const appName = (await question('App name (default: My App): ')) || 'My App'
  const primaryColor = (await question('Primary color (hex, default: #1976d2): ')) || '#1976d2'
  const description =
    (await question('App description (default: A modern web app starter.): ')) ||
    'A modern web app starter.'
  const theme = (await question('Default theme (light/dark, default: light): ')) || 'light'
  const enableAuth =
    ((await question('Enable authentication? (y/n, default: n): ')) || 'n').toLowerCase() === 'y'

  const config = {
    appName,
    brand: {
      primaryColor,
      logoPath: '/logo.svg',
    },
    auth: {
      enabled: enableAuth,
    },
    ui: {
      theme,
      showFooter: true,
    },
    pages: {
      home: {
        hero: {
          title: `Welcome to ${appName}`,
          description: description,
          ctaText: 'Get Started',
        },
        about: {
          title: 'About This Project',
          paragraphs: [
            `This is a modern web application starter built with Next.js, TypeScript, and Material UI. It provides a solid foundation for building production-ready applications with authentication, routing, and a beautiful UI out of the box.`,
            `The starter includes everything you need to get started quickly: authentication, protected routes, form handling, data fetching, and a comprehensive set of reusable components.`,
            `Customize the branding, colors, and content through the configuration file to make it your own.`,
          ],
        },
      },
      login: {
        title: 'Welcome back',
        subtitle: 'Sign in to continue',
        allowGuest: false,
      },
      error: {
        title: 'Something went wrong',
        supportEmail: 'support@example.com',
      },
    },
    metadata: {
      title: appName,
      description,
      ogImage: '/logo.svg',
    },
  }

  const configPath = path.join(process.cwd(), 'app.config.json')
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

  console.log('\n✅ Configuration saved to app.config.json!')
  console.log('\n📦 Next steps:')
  console.log('  1. Run: pnpm install')
  console.log('  2. Run: pnpm dev')
  console.log('  3. Visit: http://localhost:3000\n')

  rl.close()
}

setup().catch(console.error)
