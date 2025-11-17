'use client'

import { Alert } from '@mui/material'

interface InlineErrorProps {
  message: string
  onRetry?: () => void
}

export function InlineError({ message, onRetry }: InlineErrorProps) {
  return (
    <Alert severity="error" action={onRetry ? <button onClick={onRetry}>Retry</button> : undefined}>
      {message}
    </Alert>
  )
}

