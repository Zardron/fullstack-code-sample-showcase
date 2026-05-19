import { describe, expect, it } from 'vitest'
import { calculateQuote } from './quote'

describe('calculateQuote', () => {
  it('keeps the minimum local delivery price predictable', () => {
    expect(calculateQuote({ distanceKm: 2, packageWeightKg: 1, serviceLevel: 'economy' })).toEqual({
      base: 18,
      distance: 0,
      weight: 0,
      insurance: 0,
      total: 18,
    })
  })

  it('adds distance, weight, insurance, and urgency in one place', () => {
    const quote = calculateQuote({
      distanceKm: 12,
      packageWeightKg: 8,
      serviceLevel: 'same-day',
      declaredValueAed: 500,
    })

    expect(quote.total).toBe(77.94)
  })

  it('rejects invalid measurements early', () => {
    expect(() => calculateQuote({ distanceKm: 0, packageWeightKg: 2, serviceLevel: 'next-day' })).toThrow(
      'distanceKm must be greater than zero',
    )
  })
})
