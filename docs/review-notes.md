# Review Notes

A few things I normally try to keep steady in production code:

- domain calculations are testable without HTTP or React
- request handlers return consistent error shapes
- UI components receive shaped data instead of recalculating rules
- validation happens at the boundary, not halfway through the feature

This sample is small on purpose. It is here to show style, not to pretend to be a full product.
