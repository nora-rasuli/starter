'use client'

import { Box, Typography } from '@mui/material'

interface EmptyStateProps {
  title?: string
  message?: string
}

export function EmptyState({
  title = 'No data',
  message = 'There is nothing to display here.',
}: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  )
}

