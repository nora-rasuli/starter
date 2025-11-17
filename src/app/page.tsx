import { Container, Typography, Box, Button, Paper } from '@mui/material'
import Link from 'next/link'
import { getConfig } from '@/lib/config'

export default function HomePage() {
  const config = getConfig()
  const homeConfig = config.pages.home

  // Replace placeholders in hero title and description
  const heroTitle = homeConfig.hero.title.replace('{appName}', config.appName)
  const heroDescription = homeConfig.hero.description.replace(
    '{description}',
    config.metadata.description
  )

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          {heroTitle}
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          gutterBottom
          sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}
        >
          {heroDescription}
        </Typography>
        <Button component={Link} href="/login" variant="contained" size="large">
          {homeConfig.hero.ctaText}
        </Button>
      </Box>

      {/* About Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" textAlign="center" gutterBottom sx={{ mb: 4 }}>
          {homeConfig.about.title}
        </Typography>
        <Paper sx={{ p: 4 }}>
          {homeConfig.about.paragraphs.map((paragraph, index) => (
            <Typography
              key={index}
              variant="body1"
              paragraph={index < homeConfig.about.paragraphs.length - 1}
            >
              {paragraph}
            </Typography>
          ))}
        </Paper>
      </Box>
    </Container>
  )
}
