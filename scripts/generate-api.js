#!/usr/bin/env node

/**
 * API route generator script
 * Usage: node scripts/generate-api.js route-name [--post]
 */

const fs = require('fs')
const path = require('path')

const args = process.argv.slice(2)
const routeName = args[0]
const isPost = args.includes('--post')

if (!routeName) {
  console.error('❌ Error: Route name is required')
  console.log('Usage: node scripts/generate-api.js route-name [--post]')
  console.log('Example: node scripts/generate-api.js users --post')
  process.exit(1)
}

// Validate kebab-case
if (!/^[a-z][a-z0-9-]*$/.test(routeName)) {
  console.error('❌ Error: Route name must be in kebab-case (e.g., my-route)')
  process.exit(1)
}

const routeDir = path.join(process.cwd(), 'src', 'app', 'api', routeName)
const routePath = path.join(routeDir, 'route.ts')

if (fs.existsSync(routePath)) {
  console.error(`❌ Error: API route ${routeName} already exists`)
  process.exit(1)
}

// Create directory if it doesn't exist
fs.mkdirSync(routeDir, { recursive: true })

const routeTemplate = isPost
  ? `import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const RequestSchema = z.object({
  // Add your request schema here
  // Example: name: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = RequestSchema.parse(body)

    // Your logic here

    return NextResponse.json({ success: true, data })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
`
  : `import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Your logic here

    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
`

fs.writeFileSync(routePath, routeTemplate)
console.log(`✅ Created API route: ${routePath}`)
console.log(`   Endpoint: /api/${routeName}`)
console.log(`   Method: ${isPost ? 'POST' : 'GET'}`)
