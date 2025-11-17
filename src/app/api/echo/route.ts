import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const echoSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  timestamp: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = echoSchema.parse(body)

    return NextResponse.json({
      echo: validated.message,
      receivedAt: new Date().toISOString(),
      originalTimestamp: validated.timestamp,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

