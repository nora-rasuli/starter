const SESSION_KEY = 'mock_session'

export interface MockSession {
  userId: string
  email: string
  name: string
}

export function getMockSession(): MockSession | null {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = localStorage.getItem(SESSION_KEY)
  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored) as MockSession
  } catch {
    return null
  }
}

export function setMockSession(session: MockSession): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearMockSession(): void {
  if (typeof window === 'undefined') {
    return
  }

  localStorage.removeItem(SESSION_KEY)
}

export function isAuthenticated(): boolean {
  return getMockSession() !== null
}

