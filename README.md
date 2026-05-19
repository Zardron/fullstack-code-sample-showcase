# Full-Stack Code Sample

This repository is a small, public code sample. It is not one of my production projects.

I keep the real client and business applications private, but this repo shows the way I usually separate domain rules, request handling, and UI presentation. The example uses a courier quote flow because it is easy to understand without needing private business context.

## What to Review

- `src/domain/quote.ts` - quote rules kept away from HTTP and UI code
- `src/server/createQuoteHandler.ts` - request parsing and error shape
- `src/ui/QuoteSummary.tsx` - small presentational React component
- `src/domain/quote.test.ts` - focused tests around the business rules

## Notes

The implementation is intentionally compact. I am not trying to hide complexity behind a large scaffold here; the point is to make the boundaries and tradeoffs visible in a few files.

## Scripts

`npm test` runs the domain tests.

## License

All rights reserved. You are welcome to read the code for evaluation, but reuse requires permission.
