import { z } from 'zod'
import { calculateQuote } from '../domain/quote'

const quoteSchema = z.object({
  distanceKm: z.number().positive(),
  packageWeightKg: z.number().positive(),
  serviceLevel: z.enum(['same-day', 'next-day', 'economy']),
  declaredValueAed: z.number().nonnegative().optional(),
})

type JsonResponse = { status: number; body: unknown }

export async function createQuoteHandler(rawBody: unknown): Promise<JsonResponse> {
  const parsed = quoteSchema.safeParse(rawBody)

  if (!parsed.success) {
    return {
      status: 422,
      body: {
        message: 'Quote request is incomplete or invalid.',
        issues: parsed.error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
      },
    }
  }

  return {
    status: 200,
    body: { quote: calculateQuote(parsed.data), currency: 'AED' },
  }
}
