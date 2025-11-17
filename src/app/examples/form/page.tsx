'use client'

import { Container, TextField, Button, Box, Paper } from '@mui/material'
import { PageHeader } from '@/components/PageHeader'
import { useZodForm, getFieldError } from '@/lib/form'
import { z } from 'zod'
import { useToast } from '@/hooks/useToast'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export default function FormExamplePage() {
  const { showToast } = useToast()
  const form = useZodForm(formSchema, {
    name: '',
    email: '',
    message: '',
  })

  const onSubmit = async (_data: FormData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast('Form submitted successfully!', 'success')
    form.reset()
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <PageHeader
        title="Form Example"
        subtitle="Example form using react-hook-form and Zod validation"
      />
      <Paper sx={{ p: 4 }}>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
          <TextField
            {...form.register('name')}
            label="Name"
            fullWidth
            margin="normal"
            error={!!getFieldError(form, 'name')}
            helperText={getFieldError(form, 'name')}
          />
          <TextField
            {...form.register('email')}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!getFieldError(form, 'email')}
            helperText={getFieldError(form, 'email')}
          />
          <TextField
            {...form.register('message')}
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            error={!!getFieldError(form, 'message')}
            helperText={getFieldError(form, 'message')}
          />
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button type="button" variant="outlined" onClick={() => form.reset()}>
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
