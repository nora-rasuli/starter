'use client'

import { Container, Typography, Box, Paper, Avatar, Grid } from '@mui/material'
import { PageHeader } from '@/components/PageHeader'
import { getMockSession, isAuthenticated } from '@/lib/auth-mock'
import { useEffect, useState } from 'react'
import { RequireAuth } from '@/lib/guards'

export default function ProfilePage() {
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <RequireAuth isAuthed={isAuthed}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <PageHeader title="Profile" subtitle="View and manage your profile information" />

        {session && (
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  mb: 2,
                }}
              >
                {getInitials(session.name)}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {session.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {session.email}
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    User ID
                  </Typography>
                  <Typography variant="body1">{session.userId}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Email Address
                  </Typography>
                  <Typography variant="body1">{session.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Display Name
                  </Typography>
                  <Typography variant="body1">{session.name}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Container>
    </RequireAuth>
  )
}
