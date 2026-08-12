---
name: Obsidian Grid
colors:
  surface: '#0e150f'
  surface-dim: '#0e150f'
  surface-bright: '#333b34'
  surface-container-lowest: '#09100a'
  surface-container-low: '#161d17'
  surface-container: '#1a211b'
  surface-container-high: '#242c25'
  surface-container-highest: '#2f372f'
  on-surface: '#dde5da'
  on-surface-variant: '#bccabb'
  inverse-surface: '#dde5da'
  inverse-on-surface: '#2b322b'
  outline: '#869486'
  outline-variant: '#3d4a3e'
  surface-tint: '#4de082'
  primary: '#6bfb9a'
  on-primary: '#003919'
  primary-container: '#4ade80'
  on-primary-container: '#005e2d'
  inverse-primary: '#006d36'
  secondary: '#9bd4a5'
  on-secondary: '#003919'
  secondary-container: '#1a512d'
  on-secondary-container: '#8ac294'
  tertiary: '#ffd9c1'
  on-tertiary: '#4f2500'
  tertiary-container: '#ffb47f'
  on-tertiary-container: '#794418'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6dfe9c'
  primary-fixed-dim: '#4de082'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#b6f0bf'
  secondary-fixed-dim: '#9bd4a5'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#1a512d'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#6c3a0f'
  background: '#0e150f'
  on-background: '#dde5da'
  surface-variant: '#2f372f'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  title-md:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '500'
    lineHeight: '1.4'
  body-base:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  grid-gap: 12px
  container-padding: 24px
  element-gap: 8px
  section-margin: 48px
---

## Brand & Style

The design system is a high-performance, developer-centric aesthetic that prioritizes information density and structural clarity. It utilizes a **Minimalist-Bento** style, characterized by a modular grid of containers that organize complex data into digestible, high-contrast "tiles." 

The brand personality is technical, precise, and forward-leaning. It evokes a "command center" feel—professional yet energetic—designed for users who value efficiency and dark-mode ergonomics. The visual language relies on extreme structural discipline, hairline borders, and a monochromatic foundation punctuated by a single, high-visibility neon accent.

## Colors

The palette is anchored in a true-black background to maximize OLED efficiency and eliminate visual noise. 

- **Primary (Accent):** A vibrant green used sparingly for status indicators, active states, and interactive hovers.
- **Surface:** A slightly lifted dark charcoal that provides the necessary contrast against the background to define container boundaries.
- **Stroke:** Hairline borders provide the only structural definition. 
- **Typography:** Pure white is avoided to reduce eye strain; instead, an off-white is used for primary content and a muted grey for metadata and secondary labels.

## Typography

This design system uses a dual-type system to balance personality with technical utility.

- **Space Grotesk** handles all display and body copy. Its geometric quirks and open apertures reflect the "tech-forward" brand identity while remaining highly legible in dark environments.
- **JetBrains Mono** is utilized for all "data" elements—including timestamps, status chips, version numbers, and code snippets. This creates a clear visual distinction between narrative content and system-generated data.

Use tight letter-spacing on larger headings to maintain the "compact" feel of the bento-grid modules.

## Layout & Spacing

The layout is governed by a **Strict Bento Grid** model. 

- **Grid System:** A 12-column system is used for desktop, reflowing to 6 on tablet and 2 on mobile. 
- **The Gap:** A constant 12px gap is maintained between all modules to create a "ribbon" effect of the background color showing through the grid.
- **Module Sizing:** Modules should occupy square or rectangular proportions (1x1, 2x1, 2x2).
- **Alignment:** Content inside modules should use a consistent 24px internal padding. Vertical stacking is preferred within modules to maintain a clean reading gravity.

## Elevation & Depth

This design system eschews traditional shadows in favor of **Tonal Elevation and Border Brightening**.

- **Base State:** Surfaces sit flat on the background with a 1px `rgba(255,255,255,0.08)` border.
- **Interactive State (Hover):** When a user hovers over a grid module, the border color transitions to `rgba(255,255,255,0.2)` and the surface color lightens slightly.
- **Active State:** For critical components, a subtle glow may be applied using the Primary Accent color, but it must be diffused (blur: 20px, opacity: 0.1) to avoid breaking the minimalist aesthetic.
- **Depth:** Depth is expressed through the "reveal" of the background color in the gaps rather than Z-axis stacking.

## Shapes

The shape language is defined by large, consistent radii that soften the technical edge of the typography.

- **Grid Modules:** Must use a fixed 20px (`rounded-lg`) corner radius. This creates a "smooth" enclosure for the rigid data inside.
- **Inner Components:** Smaller elements like input fields and inner buttons should use a 10px radius to maintain a nested visual harmony.
- **Status Indicators:** Always use pill-shaped (fully rounded) containers to distinguish them from structural grid elements.

## Components

### Cards (Bento Modules)
The primary container. Must have the 1px hairline border and 20px radius. Background is `#111111`.

### Buttons
- **Primary:** Background: `#4ADE80`, Text: `#0A0A0A`, Weight: 600.
- **Ghost:** Border: 1px `rgba(255,255,255,0.1)`, Text: `#F5F5F5`. On hover, the border brightens and a subtle 4% white overlay is added to the background.

### Status Chips
Always use `JetBrains Mono` at a small size. Use a subtle background tint of the status color (e.g., Green for success) with 10% opacity and a solid 1px border of the same color at 30% opacity.

### Input Fields
Darker than the surface color (`#080808`). Focus state should only be indicated by the border transitioning to the Primary Accent color—no thick outlines.

### Data Lists
Standardized vertical rows with `label-mono` for keys and `body-base` for values. Each row is separated by a 1px border-bottom matching the system's hairline border style.