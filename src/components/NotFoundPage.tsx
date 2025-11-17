'use client'

import { Box, Button, Container, Typography } from '@mui/material'
import Link from 'next/link'

export function NotFoundPage() {
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
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h5" component="h2">
          Page not found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The page you&apos;re looking for doesn&apos;t exist.
        </Typography>
        <Button component={Link} href="/" variant="contained">
          Go home
        </Button>
      </Box>
    </Container>
  )
}
