import { ReactNode } from 'react'
import { AppThemeProvider } from '@/components/AppThemeProvider'
import { ToastProvider } from '@/components/ToastProvider'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'
import { generateMetadata } from '@/lib/seo'
import { Box } from '@mui/material'
import './globals.css'

export const metadata = generateMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="emotion-insertion-point" content="" />
      </head>
      <body suppressHydrationWarning>
        <ErrorBoundary>
          <Providers>
            <AppThemeProvider>
              <ToastProvider>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                  }}
                >
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    {children}
                  </Box>
                  <Footer />
                </Box>
              </ToastProvider>
            </AppThemeProvider>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}

