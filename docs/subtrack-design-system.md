# Subtrack — Design System

Reference document for the design agent. Every new screen must strictly follow these decisions. Do not introduce colors, typefaces, radii, or components outside of what is defined here.

---

## Identity

Name: Subtrack
Concept: Personal subscription management. Control, clarity, and calm.
Visual tone: Clean, minimal, professional without being cold. Teal green as the sole color accent; everything else in neutral grays and whites.

App icon: SVG with green background `#1D9E75`, border-radius `18px`, size `72×72px`. The symbol is three decreasing horizontal bars (a list) with a check in the bottom-right corner.

---

## Color Palette

### Brand

| Name | Hex | Usage |
| --- | --- | --- |
| Primary | `#1D9E75` | Main CTA, active accent, OK status icons |
| Dark | `#0F6E56` | Links, action text, Primary hover |
| Deeper | `#085041` | Text on light brand backgrounds |
| Light | `#E1F5EE` | Success badge backgrounds, success state |
| Mid | `#9FE1CB` | Borders on light brand backgrounds |

### Semantic States

| Name | Background | Text | Usage |
| --- | --- | --- | --- |
| Danger | `#FCEBEB` | `#A32D2D` | Expires today, error |
| Warning | `#FAEEDA` | `#854F0B` | Expires in ≤7 days |
| Success | `#E1F5EE` | `#0F6E56` | Shared, confirmation |
| Neutral | `var(--surface-1)` | `var(--text-secondary)` | Generic info |

### Surfaces And Text

Always use system CSS variables. Do not hardcode grays.

| Token | Usage |
| --- | --- |
| `var(--surface-0)` | Page background |
| `var(--surface-1)` | Stat chip backgrounds, inputs, list items |
| `var(--surface-2)` | Cards, headers, nav bar |
| `var(--text-primary)` | Main text |
| `var(--text-secondary)` | Subtitles, metadata |
| `var(--text-muted)` | Placeholders, captions, inactive icons |
| `var(--border)` | Default borders, always `0.5px solid` |
| `var(--border-strong)` | Emphasized borders |

---

## Typography

Single typeface: `var(--font-sans)`. No serif. Only two weights: `400` regular and `500` medium. Never `600` or `700`.

| Role | Size | Weight | Color | Usage |
| --- | --- | --- | --- | --- |
| Title | `22px` | `500` | `--text-primary` | Screen title |
| Heading | `18px` | `500` | `--text-primary` | Section headings |
| Body | `15px` | `400` | `--text-primary` | Body text, buttons |
| Body small | `14px` | `400/500` | `--text-primary` | App name in card, price |
| Label | `11px` | `500` | `--text-secondary` | Input labels |
| Caption | `10–11px` | `400` | `--text-muted` | Dates, stat chip subtitles |

Writing rules:

- Always sentence case. Never Title Case or ALL CAPS.
- Active voice. Buttons always start with a verb: "Create account", "Sign in", "Add".
- No terminal punctuation on labels and titles. Use a period in help text and empty states.
- No "!" in system copy.

---

## Spacing

Scale in multiples of 2px. Most commonly used values:

| Token | Value | Typical usage |
| --- | --- | --- |
| xs | `4px` | Minimum gap between inline elements |
| sm | `6–8px` | Gap between icon and text, gap between badges |
| md | `10–12px` | Gap between form fields, card internal padding |
| lg | `14–16px` | Screen horizontal padding, gap between sections |
| xl | `20–24px` | Section padding, separation between large blocks |
| 2xl | `28–32px` | Screen lateral padding, commonly `28px` |
| 3xl | `44px` | Input and button height |
| hero | `60–72px` | Top padding on onboarding/auth screens |

---

## Border Radius

| Name | Value | Usage |
| --- | --- | --- |
| xs | `4px` | Badges, status pills |
| md | `8px` | Inputs, buttons, chips |
| lg | `12px` | Subscription cards, containers |
| xl | `18px` | App icon |
| pill | `20px` | Chip badges |
| circle | `50%` | Avatars |
| device | `36px` | Mobile device frame in mockups |

---

## Borders

Always `0.5px solid`. Never `1px` except where documented.

| Usage | Token |
| --- | --- |
| Default | `0.5px solid var(--border)` |
| Emphasized | `0.5px solid var(--border-strong)` |
| Focus / active | `0.5px solid #1D9E75` |
| Error | `0.5px solid #E24B4A` |
| Featured accent | `2px solid var(--border-accent)`, only exception to `0.5px` |

---

## Iconography

Library: Tabler Icons, outline variant only. Never use `-filled`. Decorative icons always carry `aria-hidden="true"`.

| Size | Usage |
| --- | --- |
| `16px` | Icons in inputs, badges, inline text |
| `18px` | Icons in cards, list items |
| `22px` | Bottom navigation icons |
| `24px` | Decorative, maximum |

Established icons in the app:

| Icon | Tabler name | Context |
| --- | --- | --- |
| Subscriptions | `ti-apps` | Nav, empty state |
| Calendar | `ti-calendar` | Expiry date |
| Shared | `ti-users` | Badge |
| Euro | `ti-currency-euro` | Prices |
| Notifications | `ti-bell` | Nav, settings |
| Settings | `ti-settings` | Nav, profile |
| Add | `ti-plus` | Nav, CTA |
| Delete | `ti-trash` | Destructive actions |
| Edit | `ti-edit` | Edit actions |
| Navigate forward | `ti-chevron-right` | Tappable cards |
| Go back | `ti-arrow-left` | Back navigation |
| Confirmation | `ti-check` | Success state |
| Close | `ti-x` | Modals, dismiss |
| Email | `ti-mail` | Email input |
| Password | `ti-lock` | Password input |
| Show password | `ti-eye` | Visibility toggle |
| User | `ti-user` | Name input |
| Alert | `ti-alert-circle` | Errors, urgent |
| Stats | `ti-chart-bar` | Nav, summary |

---

## Components

### Primary Button

```css
height: 46px;
background: #1D9E75;
border: none;
border-radius: 8px;
color: #ffffff;
font-size: 15px;
font-weight: 500;
padding: 0 24px;
```

Maximum one primary button per screen.

### Secondary Button

```css
height: 46px;
background: transparent;
border: 0.5px solid var(--border-strong);
border-radius: 8px;
color: var(--text-primary);
font-size: 15px;
font-weight: 500;
padding: 0 24px;
```

### Ghost / Link Button

```css
height: 46px;
background: transparent;
border: none;
color: #0F6E56;
font-size: 13px to 15px;
font-weight: 500;
padding: 0;
```

Use for secondary links: "Forgot your password?", "Sign up".

### Small Button

```css
height: 34px;
background: #1D9E75;
border-radius: 8px;
color: #ffffff;
font-size: 13px;
font-weight: 500;
padding: 0 14px;
```

### Destructive Button

```css
height: 46px;
background: transparent;
border: 0.5px solid #E24B4A;
border-radius: 8px;
color: #E24B4A;
font-size: 15px;
font-weight: 500;
```

### Text Input

```css
height: 44px;
background: var(--surface-1);
border: 0.5px solid var(--border);
border-radius: 8px;
padding: 0 12px;
gap: 10px;
font-size: 14px;
```

States:

- Default: border `var(--border)`, icon `var(--text-muted)`.
- Focus/active: border `#1D9E75`, icon `#1D9E75`.
- Error: border `#E24B4A`, icon `#E24B4A`.
- Confirmed: border `#1D9E75`, icon `ti-check` in `#1D9E75`.

The input label sits above the field: `font-size: 11px`, `font-weight: 500`, `color: var(--text-secondary)`. Gap between label and field: `6px`.

### Subscription Card

```css
background: var(--surface-2);
border: 0.5px solid var(--border);
border-radius: 12px;
padding: 12px 14px;
display: flex;
align-items: center;
gap: 12px;
```

Internal structure:

1. App icon, `40×40px`, border-radius `10px`, semi-transparent background in the app's color.
2. Content block, `flex: 1`. Top row: app name `14px/500` and price `14px/500` right-aligned. Bottom row: calendar icon, expiry date, badge if applicable.
3. Right chevron, `ti-chevron-right`, `14px`, `var(--text-muted)`.

Expiry date semantics:

- More than 7 days: `color: var(--text-secondary)`.
- 7 days or less: `color: #854F0B`.
- Today or tomorrow: text "Expires today" and `color: #A32D2D`.

### Badge / Chip

```css
font-size: 10px to 11px;
font-weight: 500;
padding: 2px to 3px 7px to 9px;
border-radius: 20px;
display: inline-flex;
align-items: center;
gap: 3px to 4px;
```

| Variant | Background | Text color |
| --- | --- | --- |
| Shared | `#E1F5EE` | `#0F6E56` |
| Warning | `#FAEEDA` | `#854F0B` |
| Danger | `#FCEBEB` | `#A32D2D` |
| Neutral | `var(--surface-1)` + border | `var(--text-secondary)` |

### Stat Chip

```css
background: var(--surface-1);
border-radius: 10px;
padding: 8px 10px to 12px;
text-align: center;
```

- Value: `15px`, `500`, `var(--text-primary)`.
- Label: `10px`, `400`, `var(--text-muted)`, margin-top `2px`.
- Always used in groups of 2 to 4 with `gap: 8px`. Never used in isolation.

### Empty State

```css
background: var(--surface-1);
border: 0.5px solid var(--border);
border-radius: 12px;
padding: 32px 24px;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
```

- Icon: `28px`, `var(--text-muted)`.
- Title: `15px`, `500`, `var(--text-primary)`.
- Body: `13px`, `400`, `var(--text-muted)`, `line-height: 1.5`, ends with a period.
- Optional CTA: primary or ghost button below.

Empty state copy is an invitation, not an apology: "Add your first subscription to start managing them.", never "Nothing here yet."

### Bottom Navigation

```css
background: var(--surface-2);
border-top: 0.5px solid var(--border);
padding: 10px 0 6px;
display: flex;
justify-content: space-around;
```

Each item:

- Icon: `22px`, active `#1D9E75`, inactive `var(--text-muted)`.
- Label: `10px`, active `#1D9E75 / 500`, inactive `var(--text-muted)`.
- Icon-to-label gap: `3px`.

Planned tabs: Home (`ti-apps`), Summary (`ti-chart-bar`), Add (`ti-plus`), Settings (`ti-settings`).

### Settings List Rows

```css
background: var(--surface-2);
border: 0.5px solid var(--border);
border-radius: 12px;
overflow: hidden;
```

Each row:

```css
padding: 12px 14px;
display: flex;
align-items: center;
gap: 10px;
border-bottom: 0.5px solid var(--border);
```

No border on the last row.

- Icon: `18px`, `var(--text-secondary)`.
- Label: `14px`, `400`, `var(--text-primary)`, `flex: 1`.
- Value or chevron on the right: `13px`, `var(--text-muted)`.

### Text Separator

```css
display: flex;
align-items: center;
gap: 10px;
```

- Lines: `height: 0.5px`, `background: var(--border)`, `flex: 1`.
- Text: `11px`, `var(--text-muted)`.

### Success State Icon

```css
width: 48px to 72px;
height: 48px to 72px;
background: #E1F5EE;
border-radius: 50%;
display: flex;
align-items: center;
justify-content: center;
```

`ti-check` icon: `22px to 32px`, color `#1D9E75`.

---

## Defined Screens

### Login

Structure:

1. Status bar.
2. Centered hero: app icon, name `Subtrack` (`22px/500`), tagline (`12px/400/muted`). Gap icon-to-name: `16px`. Gap name-to-tagline: `6px`.
3. `0.5px` divider.
4. Fields: email and password.
5. "Forgot your password?" link right-aligned.
6. Primary button "Sign in".
7. "or continue with" separator.
8. Social buttons Google and Apple.
9. "Sign up for free" link centered.

Screen lateral padding: `28px`. Hero top padding: `44px`.

### Registration

Structure:

1. Status bar.
2. "Back" row with `ti-arrow-left` icon and text, color `#0F6E56`.
3. Title "Create your account" (`22px/500`) and subtitle (`13px/muted`).
4. Two-column fields: first name and last name.
5. Email field.
6. Password field and confirm password field.
7. Centered terms text (`11px`) with links in `#0F6E56`.
8. Primary button "Create account" with `ti-arrow-right` icon.
9. "Already have an account? Sign in" link.

The validated confirmation field shows a `#1D9E75` border and a green `ti-check` icon.

### Subscription List

Structure:

1. Status bar.
2. Header: title "My subscriptions" (`22px/500`) and subtitle with count (`12px/muted`). `background: var(--surface-2)`.
3. Stat chips row: total/month, active, shared. `background: var(--surface-2)`.
4. List of subscription cards with `gap: 8px`, `padding: 12px`.

Default order: soonest to expire first.

### Success Screen

Vertically centered structure:

1. Success circle (`72px`, background `#E1F5EE`, check `#1D9E75`).
2. Title "Account created" (`22px/500`).
3. Subtitle with user's name (`13px/muted`, `line-height: 1.6`).
4. Primary button "Go to my subscriptions" with `ti-arrow-right`.

---

## Mandatory UI States

Every screen that loads data from the backend must handle:

| State | Behavior |
| --- | --- |
| Loading | Skeleton or centered spinner. Do not block the entire UI. |
| Empty | Empty state component with CTA. |
| Error | Inline message, not modal. Include a description of what went wrong plus retry action. |
| Success | Data rendered. |

---

## General Rules

- One primary button per screen.
- Decorative icons always carry `aria-hidden="true"`.
- Icon-only action buttons carry `aria-label`.
- No gradients. No decorative shadows. No blur.
- No emojis in system UI.
- All hardcoded colors in the system belong to the brand teal or semantic states. Everything else must use CSS variables or shared native tokens.
- Sentence case throughout all copy. No exceptions.
- Borders always `0.5px`. The only exception is the featured accent border: `2px`.
