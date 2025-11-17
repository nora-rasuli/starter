import { Metadata } from 'next'
import { getConfig } from './config'

export function generateMetadata(): Metadata {
  const config = getConfig()

  return {
    title: config.metadata.title,
    description: config.metadata.description,
    openGraph: {
      title: config.metadata.title,
      description: config.metadata.description,
      images: [config.metadata.ogImage],
    },
  }
}

