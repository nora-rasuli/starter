'use client'

import { Skeleton, Box } from '@mui/material'

interface LoadingSkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular'
  width?: number | string
  height?: number
  count?: number
}

export function LoadingSkeleton({
  variant = 'rectangular',
  width = '100%',
  height = 40,
  count = 1,
}: LoadingSkeletonProps) {
  return (
    <Box>
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          variant={variant}
          width={width}
          height={height}
          sx={{ mb: count > 1 ? 2 : 0 }}
        />
      ))}
    </Box>
  )
}

