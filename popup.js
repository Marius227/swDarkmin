const STORAGE_KEY = 'sw_darkmode_enabled';
const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

chrome.storage.local.get(STORAGE_KEY, (result) => {
  const enabled = result[STORAGE_KEY] !== false;
  toggle.checked = enabled;
  updateStatus(enabled);
});

toggle.addEventListener('change', () => {
  const enabled = toggle.checked;
  chrome.storage.local.set({ [STORAGE_KEY]: enabled });
  updateStatus(enabled);

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    if (tab && tab.url && tab.url.includes('/admin')) {
      chrome.tabs.sendMessage(tab.id, { type: 'SET_DARKMODE', enabled });
    }
  });
});

function updateStatus(enabled) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const isAdmin = tab && tab.url && tab.url.includes('/admin');
    if (isAdmin) {
      status.textContent = enabled ? 'Dark Mode aktiv' : 'Dark Mode deaktiviert';
      status.className = 'status' + (enabled ? ' active' : '');
    } else {
      status.textContent = 'Nicht auf einer Admin-Seite';
      status.className = 'status';
    }
  });
}
