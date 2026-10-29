# Opiny admin — v2 "Mercury dark + glass" (proposed)

**Scope:** visual refresh only — same screens/flows as v1. **Reference:** R2 mercury.com.
**Files:** `tokens.css`, `app.css` (v1 components + glass layer at the bottom), `shell.js`, 4 screens. Dark only.

## Direction (taken from R2, observed values)
| Role | Mercury observed | Opiny v2 |
|---|---|---|
| Canvas | #171721 / #1e1e2a | #121219 + soft periwinkle/violet glow |
| Text | #ededf3, #c3c3cc, #70707d | #ededf3, #a9a9b8, #767684 |
| Accent | #5266eb ("Open account") | primary button, active page, chart line |
| Secondary button | rgba(156,180,232,.2), radius 40px | same |
| Glass | blur(20px) on rgba(175,178,206,.2) | header, cards, chips, buttons: blur 20px + saturate 140%, 1px top highlight |
| Border | rgba(175,178,206,.36 / .22) | .16 / .09 (subtler on dense UI) |
| Font | Arcadia 360/480 (paid) | Inter variable 360/380/480 |
| Radius | 12px cards, 40px pills | 14px cards, 40px pills |

## Rules
- Glass only on surfaces that sit over the glow (header, cards). Never stack glass on glass deeper than 2 levels.
- One periwinkle primary per view. Status = pastel tint + text label.
- Big numbers: weight 380 with a subtle white→lavender gradient.
- Keep contrast: body text ≥ #a9a9b8 on #1e1e2a (≈ 7:1); captions #767684 only for non-essential meta.
- `backdrop-filter` falls back to the semi-opaque surface colour where unsupported.

## Not taken from Mercury
Logo, photography, illustrations, marketing layouts, copy.

## Themes
Dark (default) + light. Light uses Mercury's #f4f5f9 canvas, white frosted cards, ink text #1e1e2a; same periwinkle accent. Toggle: moon button, remembered per browser.

## Customer flow + field editor (added 2026-10-29)
- `form-public.html` — step form: business header, Step x of n + % bar, 2-column option cards (radio / checkbox), required check, Back / Next → Generate review.
- `review-preview.html` — sentiment row, AI review (edit ✎ unlocks text, ↻ writes another version), Copy and publish on Google, Go back. `#copied` opens the clipboard dialog (Google review mock, Paste → Rate → Post).
- `form-field.html` — Form page with the field editor drawer (General / Settings tabs, language, label, options with drag / default star / delete, Clone as… / Cancel / Save field).
- Shared structure in `public.css` + drawer block at the end of `app.css`; all colours come from this version's tokens, both themes.
