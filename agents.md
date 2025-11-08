# Agent Context — Focused WhatsApp Chrome Extension

## 🧩 Project Summary
This project is a minimalist Chrome extension called **Focused WhatsApp** that modifies WhatsApp Web to create a distraction-free experience.  
It hides unread message counters, removes the “Archived” chats section, and includes a **Focus Mode** that shows only pinned chats.  

It features:
- A popup UI with checkboxes for “Focus Mode” and “Hide Archived”
- Persistent settings stored via `chrome.storage.sync`
- Keyboard shortcut toggle:
  - macOS → Cmd + Option + Shift + F
  - Windows/Linux → Ctrl + Alt + Shift + F
- A green minimalist chat-bubble icon
- Written for Manifest V3 (MV3)
- No background service worker (content script + popup only)

## 🗂️ File Overview
```
focused-whatsapp-chrome-extension/
├── manifest.json   # Chrome extension manifest (MV3)
├── content.js      # Main logic (applies CSS & listens for prefs + shortcuts)
├── focus.css       # Styling (hides unread/archived and controls focus mode)
├── popup.html      # Browser popup UI
├── popup.js        # Handles popup toggles and storage updates
└── icon128.png     # Green minimalist chat bubble icon
```

## 💡 Goals
Continue developing the extension from the terminal using **Codex**, with tasks such as:
- Debugging `content.js` or popup logic in Chrome DevTools
- Adding optional features (e.g., dark mode toggle, unhide archived)
- Preparing for Chrome Web Store publishing
- Automating packaging via shell or Node script

## 🧪 Development Workflow
1. Load locally via `chrome://extensions` → **Load unpacked**
2. After any change:
   ```bash
   # Reload extension in Chrome and refresh WhatsApp Web
   ```
3. To package for release:
   ```bash
   zip -r focused-whatsapp-extension-v1.6.zip .
   ```

## 🛠️ Current Known Issues
- Some versions of Chrome may delay `chrome.storage.sync` initialization on heavy SPAs (WhatsApp Web).  
  The v1.6 build fixes this with robust callbacks.
- CSS selectors for archived chats might change if WhatsApp updates the DOM — use devtools to inspect `[aria-label*="Archived"]` nodes when updating.

## 🚀 Next Steps
- Add visual indicator in popup when Focus Mode is active.
- Add “Dark Mode” toggle.
- Integrate a lightweight background worker for advanced events (optional).
- Automate version bump + ZIP creation via Node script.

## 🧠 Agent Behavior
When asked by Raul in Codex:
- Assume the working directory is `~/code/raulb/focused-whatsapp-chrome-extension/`
- Offer concrete CLI commands, scripts, or code edits.
- Don’t regenerate the entire extension unless specifically requested.
- Keep responses concise and focused on terminal or coding actions.
- Default language: **JavaScript** and **shell/bash**.
- Use plain output suitable for Codex (no rich markdown unless asked).
