console.log('FocusWhats extension loaded 🌿');

function applyFocusCSS() {
  // Add our focus-mode class if enabled
  chrome.storage.sync.get(['focusModeEnabled'], ({ focusModeEnabled }) => {
    if (focusModeEnabled) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
  });
}

// Watch for DOM reloads (WhatsApp dynamically rebuilds)
const observer = new MutationObserver(() => applyFocusCSS());
observer.observe(document.documentElement, { childList: true, subtree: true });

// Apply on load
applyFocusCSS();

// Optional: simple keyboard toggle (Ctrl+Shift+F)
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'f') {
    chrome.storage.sync.get(['focusModeEnabled'], ({ focusModeEnabled }) => {
      const newState = !focusModeEnabled;
      chrome.storage.sync.set({ focusModeEnabled: newState });
      if (newState) {
        document.body.classList.add('focus-mode');
      } else {
        document.body.classList.remove('focus-mode');
      }
      console.log('Focus mode:', newState ? 'ON' : 'OFF');
    });
  }
});
