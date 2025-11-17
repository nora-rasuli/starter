'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField, Button, Box } from '@mui/material'
import { setMockSession } from '@/lib/auth-mock'
import { getConfig } from '@/lib/config'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onGuestClick?: () => void
}

export function LoginForm({ onGuestClick }: LoginFormProps) {
  const config = getConfig()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // Set mock session
    setMockSession({
      userId: '1',
      email: data.email,
      name: data.email.split('@')[0],
    })

    // Use window.location for a full page reload to ensure session is available
    window.location.href = '/protected/dashboard'
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
      <TextField
        {...register('email')}
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="email"
      />
      <TextField
        {...register('password')}
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password?.message}
        autoComplete="current-password"
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </Button>
      {config.pages.login.allowGuest && onGuestClick && (
        <Button
          type="button"
          variant="outlined"
          fullWidth
          onClick={onGuestClick}
          disabled={isSubmitting}
        >
          Continue as guest
        </Button>
      )}
    </Box>
  )
}
