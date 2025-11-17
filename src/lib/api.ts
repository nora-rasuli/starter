import { z } from 'zod'

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function api<TSchema extends z.ZodType>(
  input: RequestInfo | URL,
  init?: RequestInit,
  schema?: TSchema
): Promise<z.infer<TSchema>> {
  const response = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message || response.statusText || 'Request failed',
      data
    )
  }

  if (schema) {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new ApiError(500, 'Invalid response format', result.error.errors)
    }
    return result.data
  }

  return data as z.infer<TSchema>
}
