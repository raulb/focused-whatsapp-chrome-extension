console.log('Focused WhatsApp v1.6 initialized 🌿', '(id:', (typeof chrome !== 'undefined' && chrome.runtime ? chrome.runtime.id : 'n/a'), ')');

const DEBUG = false;
const dlog = (...args) => { if (DEBUG) console.log('[Focused WhatsApp]', ...args); };

let extInvalidated = false; // set true if Chrome invalidates this content-script context

// Utility to safely access chrome.storage in MV3
function hasChromeStorage() {
  return typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;
}

function getPrefs(keys, callback) {
  try {
    if (extInvalidated) return callback({});
    if (!hasChromeStorage()) {
      dlog('chrome.storage not ready yet, retrying...');
      return setTimeout(() => getPrefs(keys, callback), 300);
    }
    chrome.storage.sync.get(keys, (result) => {
      if (chrome?.runtime?.lastError) {
        dlog('Storage read failed:', chrome.runtime.lastError);
        return callback({});
      }
      callback(result || {});
    });
  } catch (err) {
    const msg = String(err && err.message || err);
    if (msg.includes('Extension context invalidated')) {
      extInvalidated = true;
      console.info('Focused WhatsApp: extension reloaded; refresh the tab to resume.');
      return callback({});
    }
    dlog('chrome.storage get threw, retrying...', err);
    setTimeout(() => getPrefs(keys, callback), 300);
  }
}

function setPrefs(obj) {
  try {
    if (extInvalidated) return;
    if (!hasChromeStorage()) {
      dlog('chrome.storage not ready for write, deferring...');
      return setTimeout(() => setPrefs(obj), 300);
    }
    chrome.storage.sync.set(obj, () => {
      if (chrome?.runtime?.lastError) dlog('Storage write failed:', chrome.runtime.lastError);
    });
  } catch (err) {
    const msg = String(err && err.message || err);
    if (msg.includes('Extension context invalidated')) {
      extInvalidated = true;
      console.info('Focused WhatsApp: extension reloaded; refresh the tab to resume.');
      return;
    }
    dlog('Failed to write to storage', err);
  }
}

function applyPrefs() {
  if (!document.body) return; // wait until body exists
  getPrefs(['focusModeEnabled', 'hideArchived'], (prefs) => {
    const focus = !!prefs.focusModeEnabled;
    const archived = !!prefs.hideArchived;
    const before = {
      focus: document.body.classList.contains('focus-mode'),
      archived: document.body.classList.contains('hide-archived'),
    };
    document.body.classList.toggle('focus-mode', focus);
    document.body.classList.toggle('hide-archived', archived);
    const after = {
      focus: document.body.classList.contains('focus-mode'),
      archived: document.body.classList.contains('hide-archived'),
    };
    if (DEBUG && (before.focus !== after.focus || before.archived !== after.archived)) {
      dlog('Applied prefs', prefs, 'classes:', after);
    }
  });
}

// Ensure defaults exist
getPrefs(['focusModeEnabled', 'hideArchived'], (prefs) => {
  if (prefs.focusModeEnabled === undefined) setPrefs({ focusModeEnabled: true });
  if (prefs.hideArchived === undefined) setPrefs({ hideArchived: true });
});

// Observe changes from popup or DOM mutations
try {
  if (hasChromeStorage()) {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync') {
        dlog('storage changed', changes);
        applyPrefs();
      }
    });
  }
} catch (err) {
  // Ignore if context is invalidated during extension reload
}

const observer = new MutationObserver(() => applyPrefs());
observer.observe(document.documentElement, { childList: true, subtree: true });

// Keyboard toggle (Cmd/Ctrl + Option/Alt + Shift + F)
document.addEventListener('keydown', (e) => {
  const isMac = navigator.platform.toUpperCase().includes('MAC');
  const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
  const altOrOption = e.altKey;

  if (cmdOrCtrl && altOrOption && e.shiftKey && e.key.toLowerCase() === 'f') {
    getPrefs(['focusModeEnabled'], (prefs) => {
      const newState = !prefs.focusModeEnabled;
      setPrefs({ focusModeEnabled: newState });
      document.body.classList.toggle('focus-mode', newState);
      console.log('Focus Mode toggled:', newState ? 'ON' : 'OFF');
    });
  }
});

setInterval(applyPrefs, 5000);
applyPrefs();
