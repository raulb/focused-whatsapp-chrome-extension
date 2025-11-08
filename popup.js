const focusModeCheckbox = document.getElementById('focusMode');
const hideArchivedCheckbox = document.getElementById('hideArchived');

function loadPrefs() {
  try {
    chrome.storage.sync.get(['focusModeEnabled', 'hideArchived'], (prefs) => {
      focusModeCheckbox.checked = !!prefs.focusModeEnabled;
      hideArchivedCheckbox.checked = !!prefs.hideArchived;
    });
  } catch (err) {
    console.error('Popup storage read error:', err);
  }
}

focusModeCheckbox.addEventListener('change', (e) => {
  chrome.storage.sync.set({ focusModeEnabled: e.target.checked });
});

hideArchivedCheckbox.addEventListener('change', (e) => {
  chrome.storage.sync.set({ hideArchived: e.target.checked });
});

loadPrefs();
