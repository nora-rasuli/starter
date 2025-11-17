'use client'

import { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { getConfig } from '@/lib/config'

type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme-mode'

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }
  const stored = localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    return stored
  }
  return null
}

interface ThemeContextType {
  mode: ThemeMode
  effectiveMode: 'light' | 'dark'
  setThemeMode: (mode: ThemeMode) => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const config = getConfig()
  // Start with config value to match server-side render
  const [mode, setMode] = useState<ThemeMode>(config.ui.theme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = getStoredTheme()
    if (stored) {
      setMode(stored)
    } else {
      setMode(config.ui.theme)
    }
  }, [config.ui.theme])

  const effectiveMode = useMemo(() => {
    return mode
  }, [mode])

  const setThemeMode = (newMode: ThemeMode) => {
    setMode(newMode)
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newMode)
    }
  }

  const value = useMemo(
    () => ({
      mode,
      effectiveMode: mounted ? effectiveMode : config.ui.theme,
      setThemeMode,
      mounted,
    }),
    [mode, effectiveMode, mounted, config.ui.theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useThemeMode() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider')
  }
  return context
}
