#!/usr/bin/env node

/**
 * Page generator script
 * Usage: node scripts/generate-page.js page-name [--protected] [--client]
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const pageName = args[0]
const isProtected = args.includes('--protected')
const isClient = args.includes('--client')

if (!pageName) {
  console.error('❌ Error: Page name is required')
  console.log('Usage: node scripts/generate-page.js page-name [--protected] [--client]')
  console.log('Example: node scripts/generate-page.js settings --protected --client')
  process.exit(1)
}

// Validate kebab-case
if (!/^[a-z][a-z0-9-]*$/.test(pageName)) {
  console.error('❌ Error: Page name must be in kebab-case (e.g., my-page)')
  process.exit(1)
}

const baseDir = isProtected
  ? path.join(process.cwd(), 'src', 'app', 'protected', pageName)
  : path.join(process.cwd(), 'src', 'app', pageName)

const pagePath = path.join(baseDir, 'page.tsx')

if (fs.existsSync(pagePath)) {
  console.error(`❌ Error: Page ${pageName} already exists`)
  process.exit(1)
}

// Create directory if it doesn't exist
fs.mkdirSync(baseDir, { recursive: true })

const pageTitle = pageName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')

const clientDirective = isClient ? "'use client'\n\n" : ''
const imports = `import { Container, Typography, Paper } from '@mui/material'
import { PageHeader } from '@/components/PageHeader'`

const authWrapper = isProtected
  ? `import { RequireAuth } from '@/lib/guards'
import { isAuthenticated } from '@/lib/auth-mock'
import { useState, useEffect } from 'react'

export default function ${pageName
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')}Page() {
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window !== 'undefined') {
      return isAuthenticated()
    }
    return false
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthed(isAuthenticated())
    }
  }, [])

  return (
    <RequireAuth isAuthed={isAuthed}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageHeader title="${pageTitle}" subtitle="Your ${pageTitle.toLowerCase()} page" />

        <Paper sx={{ p: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Your ${pageTitle.toLowerCase()} content goes here.
          </Typography>
        </Paper>
      </Container>
    </RequireAuth>
  )
}`
  : `export default function ${pageName
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('')}Page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <PageHeader title="${pageTitle}" subtitle="Your ${pageTitle.toLowerCase()} page" />

      <Paper sx={{ p: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Your ${pageTitle.toLowerCase()} content goes here.
        </Typography>
      </Paper>
    </Container>
  )
}`

const pageTemplate = `${clientDirective}${imports}
${isProtected ? '' : ''}
${authWrapper}
`

fs.writeFileSync(pagePath, pageTemplate)
console.log(`✅ Created page: ${pagePath}`)
console.log(`   Route: /${isProtected ? 'protected/' : ''}${pageName}`)
