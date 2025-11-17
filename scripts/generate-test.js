#!/usr/bin/env node

/**
 * Test generator script
 * Usage: node scripts/generate-test.js path/to/Component [--type component|page|hook]
 * Examples:
 *   node scripts/generate-test.js components/LoginForm
 *   node scripts/generate-test.js app/login/page
 *   node scripts/generate-test.js hooks/useToast
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const filePath = args[0]
const testType = args.includes('--type') 
  ? args[args.indexOf('--type') + 1] || 'component'
  : 'component'

if (!filePath) {
  console.error('❌ Error: File path is required')
  console.log('Usage: node scripts/generate-test.js path/to/File [--type component|page|hook]')
  console.log('Examples:')
  console.log('  node scripts/generate-test.js components/LoginForm')
  console.log('  node scripts/generate-test.js app/login/page --type page')
  console.log('  node scripts/generate-test.js hooks/useToast --type hook')
  process.exit(1)
}

// Determine test file location
const pathParts = filePath.split('/')
const fileName = pathParts[pathParts.length - 1]
const testDir = path.join(process.cwd(), 'src', 'tests')
const testPath = path.join(testDir, `${fileName}.test.tsx`)

if (fs.existsSync(testPath)) {
  console.error(`❌ Error: Test file ${fileName}.test.tsx already exists`)
  process.exit(1)
}

// Determine import path
const importPath = pathParts.length > 1 
  ? `@/${pathParts.join('/')}`
  : `@/components/${fileName}`

// Get component/function name from file name
const componentName = fileName
  .split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join('')

let testTemplate = ''

if (testType === 'component') {
  testTemplate = `import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './utils'
import { screen } from '@testing-library/react'
import { ${componentName} } from '${importPath}'

describe('${componentName}', () => {
  it('renders correctly', () => {
    renderWithProviders(<${componentName} />)
    
    // Add your assertions here
    // expect(screen.getByText('...')).toBeInTheDocument()
  })

  // Add more test cases here
})
`
} else if (testType === 'page') {
  testTemplate = `import { describe, it, expect } from 'vitest'
import { renderWithProviders } from './utils'
import { screen } from '@testing-library/react'
import ${componentName}Page from '${importPath}'

// Mock next/navigation if needed
// import { vi } from 'vitest'
// vi.mock('next/navigation', () => ({
//   useRouter: () => ({
//     push: vi.fn(),
//   }),
// }))

describe('${componentName}Page', () => {
  it('renders correctly', () => {
    renderWithProviders(<${componentName}Page />)
    
    // Add your assertions here
    // expect(screen.getByText('...')).toBeInTheDocument()
  })

  // Add more test cases here
})
`
} else if (testType === 'hook') {
  testTemplate = `import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { renderWithProviders } from './utils'
import { ${componentName} } from '${importPath}'

describe('${componentName}', () => {
  it('works correctly', () => {
    const { result } = renderHook(() => ${componentName}(), {
      wrapper: ({ children }) => renderWithProviders(children),
    })
    
    // Add your assertions here
    // expect(result.current).toBeDefined()
  })

  // Add more test cases here
})
`
} else {
  console.error(`❌ Error: Unknown test type "${testType}". Use: component, page, or hook`)
  process.exit(1)
}

// Ensure test directory exists
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true })
}

fs.writeFileSync(testPath, testTemplate)
console.log(`✅ Created test: ${testPath}`)
console.log(`   Type: ${testType}`)
console.log(`   Testing: ${importPath}`)

