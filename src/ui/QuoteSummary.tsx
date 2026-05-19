import type { QuoteBreakdown } from '../domain/quote'

type QuoteSummaryProps = {
  quote: QuoteBreakdown
  currency?: string
}

export function QuoteSummary({ quote, currency = 'AED' }: QuoteSummaryProps) {
  const rows = [
    ['Base', quote.base],
    ['Distance', quote.distance],
    ['Weight', quote.weight],
    ['Insurance', quote.insurance],
  ] as const

  return (
    <section aria-label="Delivery quote">
      <h2>Delivery quote</h2>
      <dl>
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{formatMoney(value, currency)}</dd>
          </div>
        ))}
      </dl>
      <strong>Total: {formatMoney(quote.total, currency)}</strong>
    </section>
  )
}

function formatMoney(value: number, currency: string) {
  return new Intl.NumberFormat('en-AE', { style: 'currency', currency }).format(value)
}
