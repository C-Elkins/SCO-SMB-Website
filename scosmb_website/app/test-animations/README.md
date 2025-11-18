# Test Animations - Development Only

This directory contains animation tests and experimental components that are only available in development mode.

## Files

- `page.tsx` - Main test page with animation showcases
- `../components/AnimatedPrinter.tsx` - Sophisticated printer animation component

## Features

### Animated Printer Component
- **Realistic printer simulation** with scanning and printing animations
- **Interactive controls** - Start scan, print, and refill paper
- **Visual feedback** - LED status lights, moving parts, paper flow
- **Scan animation** - Moving light bar with realistic timing
- **Print animation** - Moving print head, paper feeding, output
- **Paper management** - Visual paper stack that decreases with printing
- **Status display** - LCD-style status screen with real-time updates

### Development Safety
- **Production blocked** - Returns 404 in production builds
- **Environment check** - Only renders content in development mode
- **Git safe** - Can be committed without affecting production
- **No build impact** - Doesn't affect production bundle size

## Usage

1. Start development server: `npm run dev`
2. Visit: `http://localhost:3000/test-animations`
3. Test animations and interactions
4. Add new animation tests as needed

## Adding New Tests

Add new animation components to the test page:

```tsx
<section className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700">
  <h2 className="text-3xl font-bold text-white mb-6 text-center">Your Animation</h2>
  <YourAnimationComponent />
</section>
```

Perfect for testing complex animations, interactions, and visual effects before integrating them into the main application.