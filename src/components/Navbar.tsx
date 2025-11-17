'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Divider,
} from '@mui/material'
import { Brightness4, Brightness7, AccountCircle, Logout } from '@mui/icons-material'
import { useThemeMode } from '@/contexts/ThemeContext'
import { getConfig } from '@/lib/config'
import { getMockSession, isAuthenticated, clearMockSession } from '@/lib/auth-mock'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export function Navbar() {
  const config = getConfig()
  const router = useRouter()
  const { mode, setThemeMode, effectiveMode } = useThemeMode()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [authed, setAuthed] = useState(false)
  const [session, setSession] = useState<ReturnType<typeof getMockSession>>(null)

  useEffect(() => {
    const checkAuth = () => {
      const isAuthed = isAuthenticated()
      setAuthed(isAuthed)
      if (isAuthed) {
        setSession(getMockSession())
      }
    }
    checkAuth()
    // Check auth on mount and when storage changes
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const toggleTheme = () => {
    setThemeMode(mode === 'light' ? 'dark' : 'light')
  }

  const getThemeIcon = () => {
    return effectiveMode === 'dark' ? <Brightness7 /> : <Brightness4 />
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    clearMockSession()
    setAuthed(false)
    setSession(null)
    handleProfileMenuClose()
    router.push('/')
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const logoHref = authed ? '/protected/dashboard' : '/'

  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          component={Link}
          href={logoHref}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          {config.brand.logoPath && (
            <Image
              src={config.brand.logoPath}
              alt={`${config.appName} logo`}
              width={32}
              height={32}
            />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            {config.appName}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit" onClick={toggleTheme} aria-label="toggle theme">
          {getThemeIcon()}
        </IconButton>
        {authed && session && (
          <>
            <IconButton
              size="large"
              edge="end"
              aria-label="account menu"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'rgba(255, 255, 255, 0.2)' }}>
                {getInitials(session.name)}
              </Avatar>
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" noWrap>
                  {session.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {session.email}
                </Typography>
              </Box>
              <Divider />
              <MenuItem component={Link} href="/protected/profile" onClick={handleProfileMenuClose}>
                <AccountCircle sx={{ mr: 2 }} />
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 2 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
