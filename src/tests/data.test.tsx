import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { renderWithProviders } from './utils'
import { screen, waitFor } from '@testing-library/react'
import { useQuery } from '@tanstack/react-query'

// Mock fetch
global.fetch = vi.fn()

function DataComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!data || data.length === 0) return <div>No data</div>

  return (
    <ul>
      {data.map((item: { id: number; title: string }) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  )
}

describe('Data fetching', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays loading state', () => {
    ;(fetch as unknown as Mock).mockImplementation(() => new Promise(() => {}))

    renderWithProviders(<DataComponent />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays data after successful fetch', async () => {
    const mockData = [
      { id: 1, title: 'Test todo 1' },
      { id: 2, title: 'Test todo 2' },
    ]

    ;(fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    renderWithProviders(<DataComponent />)

    await waitFor(() => {
      expect(screen.getByText('Test todo 1')).toBeInTheDocument()
      expect(screen.getByText('Test todo 2')).toBeInTheDocument()
    })
  })

  it('displays error state on fetch failure', async () => {
    ;(fetch as unknown as Mock).mockRejectedValueOnce(new Error('Network error'))

    renderWithProviders(<DataComponent />)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })
})
