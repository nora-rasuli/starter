'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Snackbar, Alert, AlertColor } from '@mui/material'

interface ToastState {
  open: boolean
  message: string
  severity: AlertColor
}

interface ToastContextType {
  showToast: (message: string, severity?: AlertColor) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function useToastContext() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'info',
  })

  const showToast = useCallback((message: string, severity: AlertColor = 'info') => {
    setToast({ open: true, message, severity })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, open: false }))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={hideToast}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={hideToast} severity={toast.severity} sx={{ width: '100%' }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  )
}
