'use client'

import { Box, Container, Typography } from '@mui/material'
import { getConfig } from '@/lib/config'

export function Footer() {
  const config = getConfig()

  if (!config.ui.showFooter) {
    return null
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} {config.appName}. All rights reserved.
        </Typography>
      </Container>
    </Box>
  )
}

