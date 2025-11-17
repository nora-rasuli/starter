'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getConfig } from './config'

interface RequireAuthProps {
  children: React.ReactNode
  isAuthed?: boolean
}

export function RequireAuth({ children, isAuthed }: RequireAuthProps) {
  const router = useRouter()
  const config = getConfig()
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Give a moment for auth state to initialize
    setIsChecking(false)
  }, [])

  useEffect(() => {
    // Only redirect after we've finished checking
    if (!isChecking && config.auth.enabled && !isAuthed) {
      router.push('/login')
    }
  }, [isAuthed, isChecking, router, config.auth.enabled])

  // Show nothing while checking or if not authenticated
  if (isChecking || (config.auth.enabled && !isAuthed)) {
    return null
  }

  return children as React.ReactElement
}

export async function requireAuthServer(): Promise<boolean> {
  // In a real app, this would check cookies/headers
  // For now, we'll rely on client-side checks
  return false
}
