#!/usr/bin/env python3
"""Regenerates the component preview SVGs embedded in style-guide.md.

Run from docs/design-system/:  python3 make-previews.py
Every size, color and radius here must match the spec in style-guide.md.
"""

STYLE = '''  <style>
    text { font-family: -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .bg { fill: #fbfbfa; }
    .s1 { fill: #f4f6f5; }
    .s2 { fill: #ffffff; }
    .t1 { fill: #1a1a1a; }
    .t2 { fill: #5a5a5a; }
    .tm { fill: #8a8a8a; }
    .meta { fill: #8a8a8a; font-size: 11px; }
    .bd { stroke: #e6e6e6; fill: none; }
    .bds { stroke: #c2c2c2; fill: none; }
    .ico { fill: none; stroke: #5a5a5a; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .icom { stroke: #8a8a8a; }
    .icow { stroke: #ffffff; }
    .icog { stroke: #1D9E75; }
    .icor { stroke: #E24B4A; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #0d1117; }
      .s1 { fill: #1c2128; }
      .s2 { fill: #161b22; }
      .t1 { fill: #e6edf3; }
      .t2 { fill: #9ca3af; }
      .tm { fill: #6e7681; }
      .meta { fill: #6e7681; }
      .bd { stroke: #30363d; }
      .bds { stroke: #6e7681; }
      .ico { stroke: #9ca3af; }
      .icom { stroke: #6e7681; }
    }
  </style>'''

ICONS = {
    "check": "M5 12l5 5l10 -10",
    "plus": "M12 5v14M5 12h14",
    "chevron-right": "M9 6l6 6l-6 6",
    "arrow-right": "M5 12h14M13 18l6 -6M13 6l6 6",
    "mail": "M5 5h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V7a2 2 0 0 1 2 -2M3 7l9 6l9 -6",
    "lock": "M7 11h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2H7a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2M8 11V7a4 4 0 0 1 8 0v4",
    "calendar": "M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2H6a2 2 0 0 1 -2 -2V7a2 2 0 0 1 2 -2M16 3v4M8 3v4M4 11h16",
    "alert-circle": "M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18M12 8v4M12 16h.01",
    "users": "M9 8a3 3 0 1 0 0 -.01M4 20v-1a4 4 0 0 1 4 -4h2a4 4 0 0 1 4 4v1M16 4a3 3 0 0 1 0 8M20 20v-1a4 4 0 0 0 -3 -3.85",
    "chart-bar": "M4 13h3v7H4zM10.5 7h3v13h-3zM17 10h3v10h-3z",
    "settings": ("M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37"
                 "a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37"
                 "a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37"
                 "a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37"
                 "c1 .608 2.296 .07 2.572 -1.065zM12 9a3 3 0 1 0 0 6a3 3 0 0 0 0 -6"),
    "bell": "M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3H4a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6M9 17v1a3 3 0 0 0 6 0v-1",
    "apps": "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
    "trash": "M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2l1 -12M9 7V4h6v3",
    "eye": "M12 10a2 2 0 1 0 0 4a2 2 0 0 0 0 -4M21 12c-2.4 4 -5.4 6 -9 6s-6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6s6.6 2 9 6",
}


def tw(text, size, medium=False):
    """Rough advance width for the system sans stack."""
    return len(text) * size * (0.55 if medium else 0.53)


def icon(name, x, y, size, cls="ico icom"):
    """Tabler outline glyph, top-left anchored, scaled from the 24px grid."""
    s = size / 24
    return (f'  <g transform="translate({x},{y}) scale({s:g})">'
            f'<path class="{cls}" d="{ICONS[name]}"/></g>')


def txt(t, x, y, size=14, cls="t1", weight=400, anchor="start"):
    a = f' text-anchor="{anchor}"' if anchor != "start" else ""
    return f'  <text class="{cls}" x="{x}" y="{y}" font-size="{size}" font-weight="{weight}"{a}>{t}</text>'


def box(x, y, w, h, r, fill="none", stroke=None, sw=0.5, cls=""):
    c = f' class="{cls}"' if cls else ""
    s = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else f' stroke-width="{sw}"'
    f = f' fill="{fill}"' if fill != "none" else ' fill="none"'
    return f'  <rect{c}{f}{s} x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/>'


def svg(name, w, h, body, label):
    open(name, "w").write(
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" '
        f'role="img" aria-label="{label}">\n{STYLE}\n{box(0, 0, w, h, 8, cls="bg", sw=0)}\n'
        + "\n".join(body) + "\n</svg>\n")
    print(name)


# ---------------------------------------------------------------- buttons
def buttons():
    rows = [("Primary", "Sign in", 46, 15, 24, "solid"),
            ("Secondary", "Cancel", 46, 15, 24, "outline"),
            ("Ghost / link", "Forgot your password?", 46, 15, 0, "ghost"),
            ("Small", "Add", 34, 13, 14, "small"),
            ("Destructive", "Delete subscription", 46, 15, 24, "danger")]
    b, y = [], 16
    for name, label, h, fs, pad, kind in rows:
        w = round(tw(label, fs, True)) + pad * 2
        b.append(txt(name, 16, y + h / 2 + 4, 11, "meta"))
        x = 150
        if kind == "solid" or kind == "small":
            b += [box(x, y, w, h, 8, fill="#1D9E75", sw=0),
                  txt(label, x + w / 2, y + h / 2 + fs * 0.36, fs, "", 500, "middle").replace('class=""', 'fill="#ffffff"')]
        elif kind == "outline":
            b += [box(x, y, w, h, 8, cls="bds"),
                  txt(label, x + w / 2, y + h / 2 + fs * 0.36, fs, "t1", 500, "middle")]
        elif kind == "danger":
            b += [box(x, y, w, h, 8, stroke="#E24B4A"),
                  txt(label, x + w / 2, y + h / 2 + fs * 0.36, fs, "", 500, "middle").replace('class=""', 'fill="#E24B4A"')]
        else:
            b.append(txt(label, x, y + h / 2 + fs * 0.36, fs, "", 500).replace('class=""', 'fill="#0F6E56"'))
        b.append(txt(f"{h}px", x + w + 12 if kind != "ghost" else x + round(tw(label, fs, True)) + 12,
                     y + h / 2 + 4, 11, "meta"))
        y += h + 14
    svg("preview-buttons.svg", 520, y + 2, b,
        "Subtrack buttons: primary, secondary, ghost, small and destructive, drawn at true size")


# ---------------------------------------------------------------- text input
def text_input():
    states = [("Default", "#e6e6e6", "bd", "ico icom", "mail", "you@example.com", "tm"),
              ("Focus / active", "#1D9E75", None, "ico icog", "mail", "david@subtrack.app", "t1"),
              ("Error", "#E24B4A", None, "ico icor", "lock", "••••••", "t1"),
              ("Confirmed", "#1D9E75", None, "ico icog", "lock", "••••••", "t1")]
    b, y, W = [], 16, 520
    for name, stroke, cls, icls, ic, value, vcls in states:
        b.append(txt(name, 16, y + 26, 11, "meta"))
        x, w = 150, 300
        b.append(box(x, y, w, 44, 8, cls=(cls or ""), stroke=(None if cls else stroke), sw=0.5))
        b.append(box(x, y, w, 44, 8, cls="s1", sw=0).replace('fill="none"', 'fill-opacity="0.6"'))
        b.append(icon(ic, x + 12, y + 14, 16, icls))
        b.append(txt(value, x + 38, y + 27, 14, vcls))
        if name == "Confirmed":
            b.append(icon("check", x + w - 28, y + 14, 16, "ico icog"))
        b.append(txt("44px", x + w + 12, y + 26, 11, "meta"))
        y += 58
    b.insert(0, txt("Email address", 150, 10, 11, "t2", 500))
    svg("preview-text-input.svg", W, y + 2, b,
        "Subtrack text input in its four states: default, focus, error and confirmed")


# ---------------------------------------------------------------- subscription card
def card():
    W, H = 520, 92
    b = [box(16, 16, W - 32, 64, 12, cls="s2"), box(16, 16, W - 32, 64, 12, cls="bd")]
    b += [box(30, 28, 40, 40, 10, fill="#E1F5EE", sw=0),
          txt("N", 50, 54, 18, "", 500, "middle").replace('class=""', 'fill="#1D9E75"')]
    b += [txt("Netflix", 82, 44, 14, "t1", 500),
          txt("12,99 €", W - 46, 44, 14, "t1", 500, "end")]
    b += [icon("calendar", 82, 52, 14, "ico icom"),
          txt("14 Oct 2026", 100, 63, 12, "t2")]
    bx = 176
    bw = round(tw("Shared", 10, True)) + 18 + 12
    b += [box(bx, 52, bw, 16, 20, fill="#E1F5EE", sw=0),
          icon("users", bx + 6, 56, 9, "ico icog"),
          txt("Shared", bx + 19, 63, 10, "", 500).replace('class=""', 'fill="#0F6E56"')]
    b.append(icon("chevron-right", W - 34, 41, 14, "ico icom"))
    svg("preview-subscription-card.svg", W, H, b,
        "Subtrack subscription card: app icon, name, price, expiry date, shared badge and chevron")


# ---------------------------------------------------------------- badges
def badges():
    items = [("Shared", "#E1F5EE", "#0F6E56", "users"),
             ("Expires in 5 days", "#FAEEDA", "#854F0B", "calendar"),
             ("Expires today", "#FCEBEB", "#A32D2D", "alert-circle"),
             ("Monthly", None, "#5a5a5a", None)]
    b, x, y = [], 16, 24
    for label, bgc, fg, ic in items:
        w = round(tw(label, 11, True)) + (18 if ic else 0) + 18
        if bgc:
            b.append(box(x, y, w, 20, 20, fill=bgc, sw=0))
        else:
            b += [box(x, y, w, 20, 20, cls="s1", sw=0), box(x, y, w, 20, 20, cls="bd")]
        if ic:
            b.append(icon(ic, x + 8, y + 5, 11, "ico").replace('class="ico"', f'class="ico" stroke="{fg}"'))
        b.append(txt(label, x + (26 if ic else 9), y + 14, 11, "", 500).replace('class=""', f'fill="{fg}"'))
        b.append(txt(["Shared", "Warning", "Danger", "Neutral"][items.index((label, bgc, fg, ic))],
                     x, y + 36, 11, "meta"))
        x += w + 14
    svg("preview-badges.svg", x + 2, 70, b, "Subtrack badges: shared, warning, danger and neutral variants")


# ---------------------------------------------------------------- stat chips
def stat_chips():
    items = [("48,97 €", "Per month"), ("7", "Active"), ("3", "Shared")]
    b, x, y, w = [], 16, 16, 120
    for value, label in items:
        b += [box(x, y, w, 48, 10, cls="s1", sw=0),
              txt(value, x + w / 2, y + 24, 15, "t1", 500, "middle"),
              txt(label, x + w / 2, y + 38, 10, "tm", 400, "middle")]
        x += w + 8
    svg("preview-stat-chips.svg", x + 8, 80, b, "Subtrack stat chips shown as a group of three")


# ---------------------------------------------------------------- empty state
def empty_state():
    W, H = 520, 212
    b = [box(16, 16, W - 32, H - 32, 12, cls="s1", sw=0), box(16, 16, W - 32, H - 32, 12, cls="bd")]
    cx = W / 2
    b += [icon("apps", cx - 14, 48, 28, "ico icom"),
          txt("No subscriptions yet", cx, 104, 15, "t1", 500, "middle"),
          txt("Add your first subscription to start managing them.", cx, 124, 13, "tm", 400, "middle")]
    bw = round(tw("Add subscription", 15, True)) + 48
    b += [box(cx - bw / 2, 140, bw, 46, 8, fill="#1D9E75", sw=0),
          txt("Add subscription", cx, 168, 15, "", 500, "middle").replace('class=""', 'fill="#ffffff"')]
    svg("preview-empty-state.svg", W, H, b, "Subtrack empty state with icon, title, body copy and a primary call to action")


# ---------------------------------------------------------------- bottom nav
def bottom_nav():
    tabs = [("apps", "Home", True), ("chart-bar", "Summary", False),
            ("plus", "Add", False), ("settings", "Settings", False)]
    W, H = 520, 78
    b = [box(16, 16, W - 32, 52, 0, cls="s2", sw=0),
         f'  <line class="bd" stroke-width="0.5" x1="16" y1="16" x2="{W - 16}" y2="16"/>']
    step = (W - 32) / len(tabs)
    for i, (ic, label, active) in enumerate(tabs):
        cx = 16 + step * (i + 0.5)
        cls = "ico icog" if active else "ico icom"
        b.append(icon(ic, cx - 11, 26, 22, cls))
        t = txt(label, cx, 62, 10, "tm", 500 if active else 400, "middle")
        b.append(t.replace('class="tm"', 'fill="#1D9E75"') if active else t)
    svg("preview-bottom-nav.svg", W, H, b, "Subtrack bottom navigation with Home active and Summary, Add and Settings inactive")


# ---------------------------------------------------------------- settings rows
def settings_rows():
    rows = [("settings", "Account", "", True), ("bell", "Notifications", "On", True),
            ("trash", "Delete account", "", False)]
    W = 520
    H = 16 + len(rows) * 46 + 16
    b = [box(16, 16, W - 32, len(rows) * 46, 12, cls="s2"), box(16, 16, W - 32, len(rows) * 46, 12, cls="bd")]
    y = 16
    for ic, label, value, rule in rows:
        b += [icon(ic, 30, y + 14, 18, "ico"), txt(label, 58, y + 28, 14, "t1")]
        if value:
            b.append(txt(value, W - 52, y + 28, 13, "tm", 400, "end"))
        b.append(icon("chevron-right", W - 42, y + 17, 13, "ico icom"))
        y += 46
        if rule:
            b.append(f'  <line class="bd" stroke-width="0.5" x1="16" y1="{y}" x2="{W - 16}" y2="{y}"/>')
    svg("preview-settings-rows.svg", W, H, b, "Subtrack settings list with three rows, icon, label, value and chevron")


# ---------------------------------------------------------------- separator + success
def separator():
    W = 520
    b = [f'  <line class="bd" stroke-width="0.5" x1="16" y1="24" x2="200" y2="24"/>',
         txt("or continue with", W / 2, 28, 11, "tm", 400, "middle"),
         f'  <line class="bd" stroke-width="0.5" x1="320" y1="24" x2="{W - 16}" y2="24"/>']
    svg("preview-separator.svg", W, 48, b, "Subtrack text separator: two hairlines with centred muted text")


def success_icon():
    b = [f'  <circle cx="52" cy="52" r="36" fill="#E1F5EE"/>',
         icon("check", 36, 36, 32, "ico icog"),
         txt("72px circle, 32px check", 108, 48, 11, "meta"),
         txt("background #E1F5EE, icon #1D9E75", 108, 64, 11, "meta")]
    svg("preview-success-icon.svg", 360, 104, b, "Subtrack success state icon: 72 pixel circle with a green check")


for fn in (buttons, text_input, card, badges, stat_chips, empty_state,
           bottom_nav, settings_rows, separator, success_icon):
    fn()
