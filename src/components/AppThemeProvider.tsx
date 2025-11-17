'use client'

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { CacheProvider } from '@emotion/react'
import { useThemeMode } from '@/contexts/ThemeContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { getConfig } from '@/lib/config'
import { createEmotionCache } from '@/lib/mui-cache'
import { ReactNode, useMemo, useEffect, useState } from 'react'

const clientSideEmotionCache = createEmotionCache()

interface AppThemeProviderProps {
  children: ReactNode
}

function MuiThemeProviderWrapper({ children }: { children: ReactNode }) {
  const config = getConfig()
  const { effectiveMode } = useThemeMode()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Use config theme for initial render to match server, but allow updates after mount
  const initialMode = config.ui.theme
  // Once mounted, always use effectiveMode for immediate updates
  const themeMode = isMounted ? effectiveMode : initialMode

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: themeMode,
        primary: {
          main: config.brand.primaryColor,
        },
      },
    })
  }, [themeMode, config.brand.primaryColor])

  useEffect(() => {
    // Apply theme class to html element for better dark mode support
    if (typeof document !== 'undefined' && isMounted) {
      const html = document.documentElement
      if (effectiveMode === 'dark') {
        html.classList.add('dark')
        html.classList.remove('light')
      } else {
        html.classList.add('light')
        html.classList.remove('dark')
      }
    }
  }, [effectiveMode, isMounted])

  const themeKey = isMounted ? `theme-${effectiveMode}` : 'theme-initial'

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={theme} key={themeKey}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider>
      <MuiThemeProviderWrapper>{children}</MuiThemeProviderWrapper>
    </ThemeProvider>
  )
}
