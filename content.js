const STORAGE_KEY = 'sw_darkmode_enabled';

function applyDarkMode(enabled) {
  const app = document.getElementById('app');
  if (!app) return;
  if (enabled) {
    app.setAttribute('data-theme', 'dark');
    // Auch auf <html> und <body> setzen, da Vue Popups/Context-Menus
    // per Teleport direkt in <body> rendert – außerhalb von #app
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
    const enabled = result[STORAGE_KEY] !== false; // default: an
    applyDarkMode(enabled);
  });

  // #app wird von Vue.js gerendert – bei Verzögerung nochmal versuchen
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
