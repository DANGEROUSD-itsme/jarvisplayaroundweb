# JARVIS (browser edition — no install, no admin required)

Made by Dheera Jayachitra & Claude.

Runs entirely inside Chrome or Edge. Nothing to install, nothing to build, no admin rights needed.

## How it works

- **Brain** — [Puter.js](https://puter.com), a free AI library loaded via a single `<script>` tag. First use, it'll ask you to sign in to a free Puter account (no card) so it can run the AI model on your behalf.
- **Ears** — the browser's built-in Web Speech API (`SpeechRecognition`) — no download.
- **Voice** — the browser's built-in Web Speech API (`speechSynthesis`) — no download.
- **Visualizer** — animated SVG arc-reactor, pulses cyan/amber/green for listening/thinking/speaking.

## Setup

1. Double-click `index.html` to open it in Chrome or Edge.
   - If the microphone doesn't work when opened directly as a file, it's likely a browser security restriction on `file://` pages. Easiest fix: drag the whole `JarvisWeb` folder onto **https://app.netlify.com/drop** (free, no account needed) — it gives you an instant `https://` link, then open that instead.
2. Click **START JARVIS**, allow microphone access when prompted.
3. Say **"Jarvis"** followed by your command, e.g. *"Jarvis, what's the capital of France."*
4. First AI request will prompt a free Puter sign-in — do that once, then it just works.

## Facebook Marketplace — what it can and can't do

Say *"Jarvis, find me the best 2nd hand gaming chair on Facebook Marketplace and send an enquiry."*

What actually happens: **a webpage cannot control facebook.com** — that's a browser security rule (same-origin policy), not something I can code around, and it exists to stop exactly this kind of cross-site automation from being possible without your explicit involvement. So Jarvis will:

1. Draft an enquiry message using AI
2. Ask you to confirm by voice ("Jarvis, send it")
3. Open Facebook Marketplace search in a new tab with the message ready to paste in

For a more hands-off version **on Facebook's own page**, there's `bookmarklet.txt` — a small script you add as a browser bookmark (not an install, just a saved link). Run it while looking at a Marketplace listing and it'll draft a message and try to auto-fill it into the chat box for you to review and send. See `marketplace-bookmarklet.js` for the readable source and install steps.

**Be aware:** Facebook's Terms of Service prohibit automated use of the site, and Facebook actively tries to block scripts like the bookmarklet — it may stop working if they change their page structure, and using it carries some risk to your account. It always shows a confirm popup before touching anything and never auto-sends — you click send yourself.

## Files

```
JarvisWeb/
├── index.html                    ← the whole voice assistant, just open it
├── marketplace-bookmarklet.js    ← readable source + install instructions
├── bookmarklet.txt               ← ready-to-paste javascript: bookmarklet
└── mpc/                          ← B4SS4EV4R MPC sampler (see below)
```

## B4SS4EV4R MPC — song-specific sampler

**[Open the MPC](./mpc/)** (or on GitHub Pages: `mpc/`)

A browser-based MPC pad sampler built specifically for `B4ss4ev4r_Freestyle.mp3`. The track was split into **vocals / drums / bass / other** using [Demucs](https://github.com/facebookresearch/demucs) (htdemucs model), and each stem is chopped into a 4×4 pad bank you can trigger live, entirely client-side with the Web Audio API (no server, no build step).

- 4 banks (one per stem) × 16 pads, each pad a timeline slice of that stem
- Press-and-hold pads to trigger/cut like a real sampler; keyboard shortcuts `1234 qwer asdf zxcv`
- `Shift+1..4` switches banks, `Space` plays/pauses the synced full mix
- Per-stem mute (ⓜ) while the full mix plays, click-to-seek timeline with waveform
- Static files only — audio stems live in `mpc/samples/`
