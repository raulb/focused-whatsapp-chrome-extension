# Agent Context — Focused WhatsApp Chrome Extension

## Project Summary
Minimalist Chrome extension that modifies WhatsApp Web to create a distraction‑free experience. It hides unread counts, optionally hides the Archived section, and adds Focus Mode to show only pinned chats.

Features:
- Popup UI with “Focus Mode” and “Hide Archived” checkboxes
- Preferences persisted via `chrome.storage.sync`
- Keyboard shortcut toggle:
  - macOS: Cmd + Option + Shift + F
  - Windows/Linux: Ctrl + Alt + Shift + F
- Manifest V3 (MV3)
- Content script + popup only (no background service worker)

## File Overview
```
focused-whatsapp-chrome-extension/
├── manifest.json   # Chrome extension manifest (MV3)
├── content.js      # Main logic (applies CSS & listens for prefs + shortcuts)
├── focus.css       # Styling (hides unread/archived and controls focus mode)
├── popup.html      # Browser popup UI
├── popup.js        # Popup toggles and storage updates
└── icon128.png     # Green minimalist chat bubble icon
```

## Goals
Continue development from the terminal using Codex:
- Debug `content.js` or popup logic in Chrome DevTools
- Add optional features (e.g., dark mode toggle, active-state indicator)
- Prepare for Chrome Web Store publishing
- Automate version bump + ZIP creation via Node script

## Development Workflow
1. Load locally via `chrome://extensions` → “Load unpacked” (select this folder)
2. After any change: reload the extension and refresh WhatsApp Web
3. Package for release:
   ```bash
   zip -r focused-whatsapp-extension-v1.6.zip .
   ```

## Notes and Known Issues
- Storage readiness: `chrome.storage.sync` can be delayed on SPAs. `content.js` retries until ready. If you see “Extension context invalidated”, refresh the WhatsApp tab (after reloading/removing the extension) to reinject the content script.
- DevTools context: The content script logs an init line including the extension ID. Filter the Console by that ID to see only our logs. In Sources → Content scripts → open `content.js` under `chrome-extension://<ID>` and reload to bind the Console to that context.
- Archived selectors: WhatsApp DOM may change. If the Archived section does not hide/show correctly, Inspect the Archived container and adjust selectors in `focus.css` accordingly.
- Focus Mode scope: Focus Mode filters only the main chat list. The Archived list is intentionally excluded so archived chats remain visible when not hidden.

## Agent Behavior
When assisting via Codex:
- Assume CWD: `~/code/raulb/focused-whatsapp-chrome-extension/`
- Provide concrete CLI commands, scripts, or precise code edits
- Do not regenerate the entire extension unless explicitly requested
- Keep responses concise and focused on terminal/coding actions
- Default to JavaScript and shell/bash; plain output suitable for Codex
