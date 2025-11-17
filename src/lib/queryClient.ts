import { QueryClient } from '@tanstack/react-query'

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: (failureCount, error) => {
          // Only retry on 5xx errors
          if (error instanceof Error && 'status' in error) {
            const status = (error as { status: number }).status
            return status >= 500 && status < 600 && failureCount < 3
          }
          return false
        },
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
    },
  })
}
