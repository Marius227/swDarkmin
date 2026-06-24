const STORAGE_KEY = 'sw_darkmode_enabled';

function applyDarkMode(enabled) {
  const app = document.getElementById('app');
  if (!app) return;
  if (enabled) {
    app.setAttribute('data-theme', 'dark');
    // Also apply to <html> and <body>, as Vue teleports popups/context menus
    // directly into <body> — outside of #app
    document.documentElement.setAttribute('data-theme', 'dark');
    document.body.setAttribute('data-theme', 'dark');
    document.documentElement.style.colorScheme = 'dark';
  } else {
    app.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme');
    document.body.removeAttribute('data-theme');
    document.documentElement.style.colorScheme = '';
  }
}

function isAdminPage() {
  return window.location.pathname.includes('/admin');
}

if (isAdminPage()) {
  chrome.storage.local.get(STORAGE_KEY, (result) => {
    const enabled = result[STORAGE_KEY] !== false; // default: enabled
    applyDarkMode(enabled);
  });

  // #app is rendered by Vue.js — retry with a MutationObserver if it isn't mounted yet
  const observer = new MutationObserver(() => {
    const app = document.getElementById('app');
    if (app) {
      observer.disconnect();
      chrome.storage.local.get(STORAGE_KEY, (result) => {
        applyDarkMode(result[STORAGE_KEY] !== false);
      });
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'SET_DARKMODE') {
    applyDarkMode(msg.enabled);
  }
});
