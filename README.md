# Syntecxhub_Onboarding_Flow_-_Interactive_Prototype
# Echo — Future Self Companion

An award-style mobile onboarding flow built in plain HTML, CSS, and JavaScript — no frameworks, no build step, no Figma required.

Echo is a fictional app concept: a companion where you write letters, voice notes, and check-ins to your *future self*, which Echo delivers back to you later. The onboarding personalizes itself based on the "vibe" you pick.

## Live preview

Open `index.html` in any browser. On desktop it renders inside a phone-shaped frame (auto-scaled to fit your screen); on an actual mobile device it fills the full screen edge-to-edge.

## Features

- **5-screen flow**: Splash → Welcome → Personalization → Permissions → Success
- **Conditional branching**: choosing a vibe (Calm / Dreamy / Energetic / Creative) live-updates the accent color, background gradient, and the final success message — all via CSS variables set at runtime
- **Smart-animate-style transitions**: crossfade + scale between screens
- **Interactive components**: animated permission toggles with success checkmarks, ripple effects on buttons, confetti burst, floating particle background, animated progress indicator
- **Fully responsive**: phone-frame mockup on desktop, true full-screen on mobile
- **Zero dependencies**: no npm install, no build tools — just open the HTML file

## Project structure

```
echo-app/
├── index.html      # Markup for all 5 screens
├── style.css       # All styling, animations, responsive rules
└── script.js       # Screen navigation, branching logic, effects
```

There's also a single self-contained `echo-onboarding.html` with everything inlined, useful for quick previews or sharing as one file.

## Running locally

No build step needed. Either:

- Double-click `index.html` to open it directly in a browser, or
- Serve it with any static server, e.g.:

```bash
npx serve .
# or
python3 -m http.server
```

Then visit `http://localhost:PORT` in your browser.

## Customizing

- **Colors per vibe**: edit the `data-accent` / `data-accent2` attributes on each `.vibe-card` in `index.html`
- **Copy per branch**: edit the `vibeCopy` object in `script.js`
- **Screen timing/easing**: adjust the `--dur-*` and `--ease` CSS variables in `style.css`
- **Add a screen**: duplicate a `<section class="screen" data-screen="N">` block, add a matching `<i>` to `#orbit`, and the navigation logic in `script.js` will pick it up automatically

## License

Free to use, modify, and adapt for personal, academic, or portfolio projects.
