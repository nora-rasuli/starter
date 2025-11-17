#!/usr/bin/env node

/**
 * Component generator script
 * Usage: node scripts/generate-component.js ComponentName
 */

const fs = require('fs')
const path = require('path')

const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Error: Component name is required')
  console.log('Usage: node scripts/generate-component.js ComponentName')
  process.exit(1)
}

// Validate PascalCase
if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
  console.error('❌ Error: Component name must be in PascalCase (e.g., MyComponent)')
  process.exit(1)
}

const componentDir = path.join(process.cwd(), 'src', 'components')
const componentPath = path.join(componentDir, `${componentName}.tsx`)

if (fs.existsSync(componentPath)) {
  console.error(`❌ Error: Component ${componentName} already exists`)
  process.exit(1)
}

const componentTemplate = `'use client'

import { Box } from '@mui/material'

interface ${componentName}Props {
  // Add your props here
}

export function ${componentName}({}: ${componentName}Props) {
  return (
    <Box>
      {/* Your component content */}
    </Box>
  )
}
`

fs.writeFileSync(componentPath, componentTemplate)
console.log(`✅ Created component: ${componentPath}`)
