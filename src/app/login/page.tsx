'use client'

import { Container, Box, Typography, Paper } from '@mui/material'
import { LoginForm } from '@/components/LoginForm'
import { getConfig } from '@/lib/config'

export default function LoginPage() {
  const config = getConfig()

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {config.pages.login.title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {config.pages.login.subtitle}
          </Typography>
        </Box>
        <LoginForm />
      </Paper>
    </Container>
  )
}

