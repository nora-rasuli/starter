import { z } from 'zod'
import configData from '../../app.config.json'

const ConfigSchema = z.object({
  appName: z.string(),
  brand: z.object({
    primaryColor: z.string(),
    logoPath: z.string(),
  }),
  auth: z.object({
    enabled: z.boolean(),
  }),
  ui: z.object({
    theme: z.enum(['light', 'dark']),
    showFooter: z.boolean(),
  }),
  pages: z.object({
    home: z.object({
      hero: z.object({
        title: z.string(),
        description: z.string(),
        ctaText: z.string(),
      }),
      about: z.object({
        title: z.string(),
        paragraphs: z.array(z.string()),
      }),
    }),
    login: z.object({
      title: z.string(),
      subtitle: z.string(),
      allowGuest: z.boolean(),
    }),
    error: z.object({
      title: z.string(),
      supportEmail: z.string().email(),
    }),
  }),
  metadata: z.object({
    title: z.string(),
    description: z.string(),
    ogImage: z.string(),
  }),
})

export type AppConfig = z.infer<typeof ConfigSchema>

let cachedConfig: AppConfig | null = null

export function getConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  const result = ConfigSchema.safeParse(configData)

  if (!result.success) {
    throw new Error(
      `Invalid app.config.json: ${result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
    )
  }

  cachedConfig = result.data
  return cachedConfig
}
