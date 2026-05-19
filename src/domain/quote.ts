export type ServiceLevel = 'same-day' | 'next-day' | 'economy'

export type QuoteRequest = {
  distanceKm: number
  packageWeightKg: number
  serviceLevel: ServiceLevel
  declaredValueAed?: number
}

export type QuoteBreakdown = {
  base: number
  distance: number
  weight: number
  insurance: number
  total: number
}

const SERVICE_MULTIPLIER: Record<ServiceLevel, number> = {
  'same-day': 1.45,
  'next-day': 1.15,
  economy: 1,
}

const roundMoney = (value: number) => Math.round(value * 100) / 100

export function calculateQuote(request: QuoteRequest): QuoteBreakdown {
  assertPositive('distanceKm', request.distanceKm)
  assertPositive('packageWeightKg', request.packageWeightKg)

  const base = 18
  const distance = Math.max(0, request.distanceKm - 3) * 2.25
  const weight = Math.max(0, request.packageWeightKg - 5) * 3.5
  const insurance = request.declaredValueAed ? Math.min(request.declaredValueAed * 0.01, 75) : 0
  const subtotal = (base + distance + weight + insurance) * SERVICE_MULTIPLIER[request.serviceLevel]

  return {
    base,
    distance: roundMoney(distance),
    weight: roundMoney(weight),
    insurance: roundMoney(insurance),
    total: roundMoney(subtotal),
  }
}

function assertPositive(field: string, value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${field} must be greater than zero`)
  }
}
