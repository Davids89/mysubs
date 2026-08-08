# Subtrack Token Map

CSS/design-doc tokens mapped to React Native theme paths in `packages/ui-components/src/theme/tokens.ts`.

## Brand Colors

| Design doc | Hex | Theme path |
| --- | --- | --- |
| Primary | `#1D9E75` | `theme.colors.brand.primary`, `theme.colors.primary` |
| Dark | `#0F6E56` | `theme.colors.brand.dark` |
| Deeper | `#085041` | `theme.colors.brand.deeper` |
| Light | `#E1F5EE` | `theme.colors.brand.light` |
| Mid | `#9FE1CB` | `theme.colors.brand.mid`, `theme.colors.border.accent` |

## Semantic Colors

| State | Background | Text | Theme path |
| --- | --- | --- | --- |
| Danger | `#FCEBEB` | `#A32D2D` | `theme.colors.semantic.danger.background`, `.text` |
| Warning | `#FAEEDA` | `#854F0B` | `theme.colors.semantic.warning.background`, `.text` |
| Success | `#E1F5EE` | `#0F6E56` | `theme.colors.semantic.success.background`, `.text` |
| Neutral | surface subtle | secondary text | `theme.colors.semantic.neutral.background`, `.text` |

## Surfaces And Text

| Design token | Theme path |
| --- | --- |
| `var(--surface-0)` / page background | `theme.colors.surface.page`, `theme.colors.background` |
| `var(--surface-1)` | `theme.colors.surface.subtle` |
| `var(--surface-2)` | `theme.colors.surface.raised`, `theme.colors.card` |
| `var(--text-primary)` | `theme.colors.textRole.primary`, `theme.colors.text` |
| `var(--text-secondary)` | `theme.colors.textRole.secondary` |
| `var(--text-muted)` | `theme.colors.textRole.muted`, `theme.colors.mutedText` |
| inverse text on brand/primary | `theme.colors.textRole.inverse`, `theme.colors.primaryText` |

## Borders

| Usage | Theme path |
| --- | --- |
| Default border color | `theme.colors.border.default` |
| Strong border | `theme.colors.border.strong` |
| Error border | `theme.colors.border.error` |
| Accent border | `theme.colors.border.accent` |
| Default border width (`0.5px`) | `theme.strokeWidth.default` |
| Featured accent width (`2px`) | `theme.strokeWidth.accent` |

## Typography

| Role | Size | Weight | Theme path |
| --- | --- | --- | --- |
| Title | 22 | 500 | `theme.typography.title` |
| Heading | 18 | 500 | `theme.typography.heading` |
| Body | 15 | 400 | `theme.typography.body` |
| Body small | 14 | 400 | `theme.typography.bodySmall` |
| Label | 11 | 500 | `theme.typography.label` |
| Caption | 11 | 400 | `theme.typography.caption` |

Use `.size`, `.weight`, and `.color` from each role object.

## Spacing

| Token | Value | Theme path |
| --- | --- | --- |
| xs | 4 | `theme.spacing.xs` |
| sm | 8 | `theme.spacing.sm` |
| md | 12 | `theme.spacing.md` |
| lg | 16 | `theme.spacing.lg` |
| xl | 24 | `theme.spacing.xl` |
| 2xl | 28 | `theme.spacing["2xl"]` |
| 3xl | 44 | `theme.spacing["3xl"]` |
| hero | 60 | `theme.spacing.hero` |

## Radius

| Name | Value | Theme path |
| --- | --- | --- |
| xs | 4 | `theme.radius.xs` |
| sm | 6 | `theme.radius.sm` |
| md | 8 | `theme.radius.md` |
| lg | 12 | `theme.radius.lg` |
| xl | 18 | `theme.radius.xl` |
| pill | 20 | `theme.radius.pill` |
| circle | 999 | `theme.radius.circle` |
| device | 36 | `theme.radius.device` |

## Component Metrics

| Component | Design spec | Theme path |
| --- | --- | --- |
| Primary button height | 46 | `theme.components.button.height` |
| Primary button padding X | 24 | `theme.components.button.paddingHorizontal` |
| Small button height | 34 | `theme.components.button.smallHeight` |
| Small button padding X | 14 | `theme.components.button.smallPaddingHorizontal` |
| Text input height | 44 | `theme.components.input.height` |
| Text input padding X | 12 | `theme.components.input.paddingHorizontal` |
| Empty state padding | 32 x 24 | `theme.components.emptyState.paddingVertical`, `.paddingHorizontal` |
| Subscription card padding | 12 x 14 | `theme.components.subscriptionCard.paddingVertical`, `.paddingHorizontal` |
| Subscription card gap | 12 | `theme.components.subscriptionCard.gap` |
| Badge padding | 3 x 8 | `theme.components.badge.paddingVertical`, `.paddingHorizontal` |
