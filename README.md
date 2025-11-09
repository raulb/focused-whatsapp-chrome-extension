# Focused WhatsApp — Distraction-Free WhatsApp Web

**Focused WhatsApp** is a minimalist Chrome extension that makes WhatsApp Web calmer and cleaner.  
It hides unread message counts, removes the “Archived” section entirely, and enables **Focus Mode** (show only pinned chats) by default.

---

## Features

- Hide unread badges — Hides unread counters and badges.
- Hide Archived — Toggles the Archived section visibility from the popup.
- Focus Mode (default On) — Shows only pinned chats in the main list.
- Keyboard shortcut — Toggle Focus Mode with Cmd+Option+Shift+F (macOS) or Ctrl+Alt+Shift+F (Windows/Linux).

---

## Installation

1. **Clone this repository:**

   ```bash
   git clone https://github.com/raulb/focused-whatsapp-chrome-extension.git
   cd focused-whatsapp-chrome-extension
   ```

2. Open Chrome (or Brave, Edge, Arc).

3. Navigate to:

   ```
   chrome://extensions
   ```

4. Enable **Developer mode** (top right).

5. Click **“Load unpacked”** and select the extension folder.

6. Open [https://web.whatsapp.com](https://web.whatsapp.com)  
   → Focused WhatsApp activates automatically.

---

## Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| macOS: Cmd + Option + Shift + F | Toggle Focus Mode |
| Windows/Linux: Ctrl + Alt + Shift + F | Toggle Focus Mode |

Focus Mode is **on by default**, but you can disable it at any time.

---

## How It Works

Focused WhatsApp doesn’t connect to WhatsApp servers or modify your account.  
It simply injects small CSS and JavaScript snippets into [web.whatsapp.com](https://web.whatsapp.com) to hide distracting UI elements locally on your browser.

Everything stays **on your computer only** — no tracking, no data collection.

---

## Folder Structure

```
focused-whatsapp-chrome-extension/
├── manifest.json   # Chrome extension manifest (MV3)
├── content.js      # Main logic (applies CSS & listens for prefs + shortcuts)
├── focus.css       # Styling (hides unread/archived and controls focus mode)
├── popup.html      # Browser popup UI
├── popup.js        # Popup toggles and storage updates
└── icon128.png     # Green minimalist chat bubble icon
```

---

## Development

If you edit files:

1. Go to **chrome://extensions**
2. Click **Reload** under Focused WhatsApp
3. Refresh WhatsApp Web

Changes apply instantly.

## Debugging

Enable detailed logs and filter the Console to this extension’s context.

1) Enable logs
- Open `content.js` and set `const DEBUG = true;`.
- Reload the extension in `chrome://extensions` and refresh WhatsApp Web.

2) Filter to this extension
- In DevTools Console, enable “Preserve log”.
- Look for the init log: `Focused WhatsApp v1.6 initialized (id: <EXT_ID>)`.
- Paste `<EXT_ID>` into the Console filter to view only our content‑script logs.
- Or open Sources → Content scripts → `chrome-extension://<EXT_ID>/content.js` and reload to bind the Console to that context.

3) Expected logs
- `storage changed`: when toggling options in the popup.
- `Applied prefs … classes …`: shows final `<body>` classes.
- `Focus Mode toggled: ON/OFF`: when using the keyboard shortcut.
- Occasional storage “retrying” messages on initial load.

4) Disable logs
- Set `const DEBUG = false;` in `content.js`, reload the extension, and refresh WhatsApp.

---

## Troubleshooting
 - Extension context invalidated: If you reload/remove the extension, existing content scripts log “Extension context invalidated”. Refresh the WhatsApp tab to reinject.
 - Too many console contexts: In DevTools Console, filter by the extension ID printed in the init log: “Focused WhatsApp v1.6 initialized (id: <ID>)”. Paste <ID> into the filter to see only our logs.
 - Archived list empty in Focus Mode: By design, Focus Mode filters only the main chat list; the Archived panel remains unfiltered. If the Archived list appears empty, refresh the page; if it persists, WhatsApp likely changed DOM attributes — inspect the Archived container and update selectors in focus.css accordingly.
 - Storage initialization delay: On heavy SPAs, `chrome.storage.sync` may be delayed; the script retries safely. If preferences seem stuck, wait a second or refresh.

---

## License

MIT © 2025 Raul — Use freely, modify, and share improvements.
