# 🌿 Focused WhatsApp — Distraction-Free WhatsApp Web

**Focused WhatsApp** is a minimalist Chrome extension that makes WhatsApp Web calmer and cleaner.  
It hides unread message counts, removes the “Archived” section entirely, and enables **Focus Mode** (show only pinned chats) by default.

---

## ✨ Features

- 🚫 **Hide unread badges** — No more red dots or counters stealing your focus.  
- 🗂️ **Completely remove “Archived” chats** — They’re gone, not just collapsed.  
- 🧘‍♂️ **Focus Mode (enabled by default)** — Shows only pinned chats for a peaceful workspace.  
- 🎚️ **Toggle Focus Mode** anytime with **Ctrl + Shift + F**.  

---

## 🧩 Installation

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

5. Click **“Load unpacked”** and select the `focuswhats-extension/` folder.

6. Open [https://web.whatsapp.com](https://web.whatsapp.com)  
   → Focused WhatsApp activates automatically.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|-----------|--------|
| **Ctrl + Shift + F** | Toggle Focus Mode (show/hide non-pinned chats) |

Focus Mode is **on by default**, but you can disable it at any time.

---

## 🧠 How It Works

Focused WhatsApp doesn’t connect to WhatsApp servers or modify your account.  
It simply injects small CSS and JavaScript snippets into [web.whatsapp.com](https://web.whatsapp.com) to hide distracting UI elements locally on your browser.

Everything stays **on your computer only** — no tracking, no data collection.

---

## 🛠️ Folder Structure

```
focuswhats-extension/
├── manifest.json   # Chrome extension manifest
├── content.js      # Logic (toggle focus mode, remove archived)
└── focus.css       # Styling and visibility rules
```

---

## 🧩 Development

If you edit files:

1. Go to **chrome://extensions**
2. Click **Reload** under Focused WhatsApp
3. Refresh WhatsApp Web

Changes apply instantly.

---

## 🐛 Known Limitations

- WhatsApp updates its internal DOM structure often.  
  If something stops hiding properly, just reload the page — Focused WhatsApp re-applies itself automatically.
- Currently tested on Chrome 120+, Brave 1.70+, and Edge 120+.

---

## 🪪 License

MIT © 2025 Raul  
Use freely, modify, and share improvements.

---

## 💡 Roadmap

- 🧩 Browser popup UI for quick toggles  
- 🌙 Dark/Light theme customization  
- 🐕 Maybe a playful PAWSEO-style dog mascot someday 😉
