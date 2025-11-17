'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import { getConfig } from '@/lib/config'
import Link from 'next/link'

interface ErrorPageProps {
  error?: Error | null
  reset?: () => void
}

export function ErrorPage({ error, reset }: ErrorPageProps) {
  const config = getConfig()
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          gap: 3,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1">
          {config.pages.error.title}
        </Typography>

        {isDev && error && (
          <Box
            sx={{
              p: 2,
              bgcolor: 'error.light',
              borderRadius: 1,
              width: '100%',
              textAlign: 'left',
            }}
          >
            <Typography variant="body2" component="pre" sx={{ whiteSpace: 'pre-wrap' }}>
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {reset && (
            <Button variant="contained" onClick={reset}>
              Try again
            </Button>
          )}
          <Button component={Link} href="/" variant="outlined">
            Home
          </Button>
          <Button
            component="a"
            href={`mailto:${config.pages.error.supportEmail}`}
            variant="text"
          >
            Contact support
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

