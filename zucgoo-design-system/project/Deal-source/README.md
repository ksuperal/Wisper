# Deal — editable source

An interactive mobile prototype built with React + Babel (compiled in the browser,
no build step needed).

## Run it locally

The page loads its `.jsx` files over HTTP, so you can't just double-click `Deal.html`
(browsers block local file fetches). Serve the folder instead:

```bash
cd Deal-source

# Python 3 (already on Mac/Linux)
python3 -m http.server 8000

# …or Node
npx serve .
```

Then open http://localhost:8000/Deal.html

You need an internet connection the first time — React, Babel and the fonts load from a CDN.

## Where things live

| File | What's in it |
|------|--------------|
| `Deal.html`        | Entry point — loads everything below, in order |
| `deal-tokens.css`  | All design tokens: colors, type, animations |
| `app.jsx`          | Router / screen state machine + the Tweaks panel |
| `components.jsx`   | Buttons, cards, move badges, inputs, icons, logo |
| `chrome.jsx`       | Top bars, tab bar, bottom sheet, **demo data + scripted moves** |
| `screens-core.jsx` | Splash, Dashboard |
| `screens-setup.jsx`| Setup steps 1 & 2, Strategy brief |
| `screens-live.jsx` | Live session (the core screen), move card, mic |
| `screens-end.jsx`  | Session end, Debrief, Win card |
| `ios-frame.jsx`    | iPhone device bezel (starter component) |
| `tweaks-panel.jsx` | Tweaks panel shell (starter component) |

## Common edits

- **Change the negotiation script** (the back-and-forth moves): `chrome.jsx` → `DEMO.moves`
- **Recolor the Signal accent**: `deal-tokens.css` → `--deal-signal*`, or use the Tweaks panel
- **Edit copy on a screen**: open that screen's file and edit the text directly
- **Add a screen**: add a `case` in `app.jsx` → `renderScreen()`

Each `.jsx` file is plain JSX — edit, save, refresh the browser. No compile step.
