# Hero: zoomed-in layout + match whole site to hero (everything bigger)

## Goal

1. **Hero:** Use the "zoomed-in" default layout (compact, content-sized, smaller gap to Hunt/Tarkov) as already planned.
2. **Site-wide:** Match every section to the hero’s scale – **everything bigger**: larger typography, spacing, icons, and CTAs across CrosshairShowcase, Features, Pricing, FAQ, Header, and Footer.

---

## Part A: Hero (zoomed-in default layout)

### 1. Remove `min-h` from hero grid

**File:** [components/Hero.tsx](components/Hero.tsx)

**Current:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center min-h-[65vh] sm:min-h-[70vh] lg:min-h-[72vh]">
```

**Change to:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
```

### 2. Reduce section padding

**Current:**
```tsx
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
```

**Change to:**
```tsx
<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
```

### 3. Tighten spacing inside hero

- **Headline:** `mb-6 sm:mb-8` → `mb-4 sm:mb-5`
- **Paragraph:** `mb-10 sm:mb-12` → `mb-6 sm:mb-8`
- **Discord wrapper:** `mt-5 sm:mt-6` → `mt-4`

### 4. Reduce gap between hero and Hunt/Tarkov

**Current:**
```tsx
<div className="mt-16 max-w-5xl mx-auto">
```

**Change to:**
```tsx
<div className="mt-10 sm:mt-12 max-w-5xl mx-auto">
```

Keep hero typography as-is (`text-5xl`–`xl:text-8xl`, `text-xl sm:text-2xl`, buttons `text-lg sm:text-xl`); that scale is the **reference** for the rest of the site.

---

## Part B: Match entire site to hero – everything bigger

Use the hero as the scale reference. Sections today use smaller type and spacing; bump them up so they feel consistent with the hero.

### 5. CrosshairShowcase – [components/CrosshairShowcase.tsx](components/CrosshairShowcase.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Section padding | `pt-24 pb-12` | `pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20` |
| Header margin | `mb-10` | `mb-12 sm:mb-16` |
| H2 (Crosshair Overlay) | `text-3xl sm:text-4xl` | `text-4xl sm:text-5xl lg:text-6xl` |
| Subtext | `text-lg` | `text-xl sm:text-2xl` |
| "Watch it work" label | `text-sm` | `text-base sm:text-lg` |
| Media placeholder text | `text-sm` | `text-base` |
| Main demo margin | `mb-16` | `mb-20` |
| PlaceholderCards grid gap | `gap-6 lg:gap-8` | `gap-8 lg:gap-10` |
| PlaceholderCard title | `text-lg font-bold` | `text-xl sm:text-2xl font-bold` |
| PlaceholderCard description | `text-sm` | `text-base sm:text-lg` |
| SquarePlaceholder text | `text-sm` | `text-base` |

### 6. Features – [components/Features.tsx](components/Features.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Section padding | `pt-12 pb-24` | `pt-20 sm:pt-24 lg:pt-28 pb-24 lg:pb-32` |
| Header margin | `mb-10` | `mb-12 sm:mb-16` |
| H2 (Features) | `text-3xl sm:text-4xl` | `text-4xl sm:text-5xl lg:text-6xl` |
| Subtext | `text-lg` | `text-xl sm:text-2xl` |
| Grid gap | `gap-8` | `gap-10 lg:gap-12` |
| Card icon container | `w-12 h-12` | `w-14 h-14 lg:w-16 lg:h-16` |
| Card icon SVG | `w-8 h-8` | `w-9 h-9 lg:w-10 lg:h-10` |
| Card title | `text-xl font-semibold` | `text-2xl lg:text-3xl font-semibold` |
| Card description | (default) | `text-lg lg:text-xl text-text-secondary` |
| Card padding | (from `card`) | Consider `p-6 sm:p-8` if card uses `.card` |

### 7. Pricing – [components/Pricing.tsx](components/Pricing.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Section padding | `py-24` | `py-20 sm:py-24 lg:py-32` |
| Header margin | `mb-16` | `mb-12 sm:mb-16` |
| H2 (Simple Pricing) | `text-3xl sm:text-4xl` | `text-4xl sm:text-5xl lg:text-6xl` |
| Subtext | `text-lg` | `text-xl sm:text-2xl` |
| Card H3 (ReSight License) | `text-2xl` | `text-3xl sm:text-4xl` |
| Price | `text-5xl` | `text-5xl sm:text-6xl lg:text-7xl` |
| "one-time" | (default) | `text-lg sm:text-xl` |
| Feature list spacing | `space-y-4` | `space-y-5 sm:space-y-6` |
| Feature list item | `w-5 h-5` icon, default text | `w-6 h-6` icon, `text-lg sm:text-xl` |
| CTA button | `text-lg` | `text-lg sm:text-xl py-4` |
| Disclaimer | `text-lg` | `text-lg sm:text-xl` |
| Card inner padding | `mb-8` | `mb-8 sm:mb-10` |

### 8. FAQ – [components/FAQ.tsx](components/FAQ.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Section padding | `py-24` | `py-20 sm:py-24 lg:py-32` |
| Header margin | `mb-16` | `mb-12 sm:mb-16` |
| H2 (FAQ) | `text-3xl sm:text-4xl` | `text-4xl sm:text-5xl lg:text-6xl` |
| Subtext | (default) | `text-xl sm:text-2xl text-text-secondary` |
| Accordion spacing | `space-y-4` | `space-y-5 sm:space-y-6` |
| Question text | `text-lg font-medium` | `text-xl sm:text-2xl font-medium` |
| Answer text | (default) | `text-base sm:text-lg text-text-secondary` |
| Chevron | `w-5 h-5` | `w-6 h-6` |
| Card padding | (from `card`) | `p-6 sm:p-8` |
| Answer `max-h` when open | `max-h-96` | `max-h-[28rem]` or similar if needed |

### 9. Header – [components/Header.tsx](components/Header.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Height | `h-16` | `h-18` or `h-20` (e.g. `min-h-[4.5rem]` / `min-h-[5rem]`) |
| Logo | `w-8 h-8` | `w-9 h-9 sm:w-10 sm:h-10` |
| Logo text | `text-xl` | `text-xl sm:text-2xl` |
| Nav links | `text-sm` | `text-base sm:text-lg` |
| Nav gap | `gap-8` | `gap-8 sm:gap-10` |
| Get Started (header) | `text-sm` | `text-base sm:text-lg px-5 py-2.5` |
| Login / Sign Out / email | `text-sm` | `text-base` |

### 10. Footer – [components/Footer.tsx](components/Footer.tsx)

| Element | Current | Change to |
|--------|---------|-----------|
| Padding | `py-12` | `py-16 sm:py-20` |
| Logo | `w-8 h-8` | `w-9 h-9 sm:w-10 sm:h-10` |
| Logo text | `text-xl` | `text-xl sm:text-2xl` |
| Footer description | `text-sm` | `text-base sm:text-lg` |
| Column headings | (default) | `text-lg sm:text-xl font-semibold` |
| Links | `text-sm` | `text-base sm:text-lg` |
| List spacing | `space-y-2` | `space-y-3` |
| Bottom bar | `mt-12 pt-8` | `mt-16 pt-10` |
| Copyright / Discord | `text-sm` | `text-base` |
| Discord icon | `w-5 h-5` | `w-5 h-5 sm:w-6 sm:h-6` |

### 11. Global `.card` (optional)

If you want cards site-wide to feel bigger:

**File:** [app/globals.css](app/globals.css)

**Current:** `@apply ... rounded-xl p-6`

**Consider:** `p-6 sm:p-8` so Features, FAQ, CrosshairShowcase cards gain padding at larger breakpoints. Only change this if it doesn’t break Pricing layout; otherwise override padding per component.

---

## Summary

- **Part A:** Hero uses the zoomed-in layout (no min-h, tighter spacing, smaller gap to Hunt/Tarkov). Hero typography and buttons stay large and act as the scale reference.
- **Part B:** CrosshairShowcase, Features, Pricing, FAQ, Header, and Footer all get **bigger** type, icons, spacing, and padding so the whole site matches the hero’s scale. Use the tables above for exact class changes.

Everything stays responsive via `sm` / `lg` breakpoints; no structural layout changes, only scale.
