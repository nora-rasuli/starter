'use client'

import { ReactNode, useState } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { createQueryClient } from '@/lib/queryClient'

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => createQueryClient())

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

