import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import configData from './app.config.json'

const appConfig = configData as { auth: { enabled: boolean } }

export function middleware(request: NextRequest) {
  // Only enforce auth if enabled in config
  if (!appConfig.auth.enabled) {
    return NextResponse.next()
  }

  // Check if accessing protected routes
  if (request.nextUrl.pathname.startsWith('/protected')) {
    // In a real app, check for auth token/cookie
    // For now, we'll let client-side guards handle it
    // This is a placeholder for server-side auth checks
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/protected/:path*', '/dashboard/:path*'],
}
