'use client'

import { Container, Typography, Paper } from '@mui/material'
import { PageHeader } from '@/components/PageHeader'
import { getMockSession, isAuthenticated } from '@/lib/auth-mock'
import { useEffect, useState } from 'react'
import { RequireAuth } from '@/lib/guards'

export default function DashboardPage() {
  // Initialize auth state synchronously on client side
  const [session, setSession] = useState<ReturnType<typeof getMockSession>>(() => {
    if (typeof window !== 'undefined') {
      return getMockSession()
    }
    return null
  })
  const [isAuthed, setIsAuthed] = useState(() => {
    if (typeof window !== 'undefined') {
      return isAuthenticated()
    }
    return false
  })

  useEffect(() => {
    // Double-check authentication status after mount
    const authed = isAuthenticated()
    setIsAuthed(authed)

    if (authed) {
      setSession(getMockSession())
    }
  }, [])

  return (
    <RequireAuth isAuthed={isAuthed}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <PageHeader
          title="Dashboard"
          subtitle={session ? `Welcome back, ${session.name}!` : 'Welcome to your dashboard'}
        />

        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Your dashboard content goes here. This is a placeholder page that you can customize for
            your project.
          </Typography>
        </Paper>
      </Container>
    </RequireAuth>
  )
}
