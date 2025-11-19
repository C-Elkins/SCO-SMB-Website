# Pricing Page RES Optimization Plan

## Current Performance Issues

- Form submission redirects causing navigation delays
- Pricing card animations potentially affecting CLS
- Contact form pre-filling causing URL changes
- Heavy form validation JavaScript

## Optimization Strategy

### 1. Form Performance
```tsx
// Replace redirect with SPA navigation
const handleContactSubmit = async (planType: string) => {
  // Use Next.js router instead of window.location
  await router.push(`/contact?subject=${encodeURIComponent(subject)}`)
}

// Implement form prefetching
<Link href="/contact" prefetch={true}>
  <PricingCard onClick={() => handleContactSubmit(plan)} />
</Link>
```

### 2. Pricing Card Optimization
```css
/* Prevent CLS in pricing cards */
.pricing-card {
  min-height: 400px; /* Reserve space */
  contain: layout style;
  transform: translateZ(0); /* GPU acceleration */
}

.pricing-features {
  height: 200px; /* Fixed height for feature lists */
  overflow-y: auto;
}
```

### 3. Progressive Enhancement
- Load pricing data from static JSON first
- Enhance with dynamic features after paint
- Use service worker for form prefilling

### 4. Image Optimization
- Industry icons as SVG sprites
- Lazy load non-critical industry cards
- Use intersection observer for animations

## Expected RES Improvements

- **FID**: 40% reduction (faster form interactions)
- **CLS**: 60% reduction (stable card layouts)  
- **Navigation Speed**: 50% faster (SPA routing)