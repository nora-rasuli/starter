import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
})

type Env = z.infer<typeof envSchema>

function getEnv(): Env {
  const result = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  })

  if (!result.success) {
    const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')

    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Invalid environment variables: ${errors}`)
    }

    console.error(`Invalid environment variables: ${errors}`)
  }

  return result.success ? result.data : ({} as Env)
}

export const env = getEnv()
