import { describe, it, expect, vi } from 'vitest'
import { renderWithProviders } from './utils'
import { LoginForm } from '@/components/LoginForm'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}))

// Mock auth-mock
vi.mock('@/lib/auth-mock', () => ({
  setMockSession: vi.fn(),
}))

// Mock config
vi.mock('@/lib/config', () => ({
  getConfig: () => ({
    pages: {
      login: {
        allowGuest: false,
      },
    },
  }),
}))

describe('LoginForm', () => {
  it('renders email and password fields', () => {
    renderWithProviders(<LoginForm />)

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('shows validation errors for invalid input', async () => {
    const user = userEvent.setup()
    renderWithProviders(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'invalid-email')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/invalid email address/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    const { setMockSession } = await import('@/lib/auth-mock')

    renderWithProviders(<LoginForm />)

    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    await user.click(submitButton)

    await waitFor(() => {
      expect(setMockSession).toHaveBeenCalled()
    })
  })
})
