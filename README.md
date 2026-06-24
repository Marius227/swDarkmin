# Shopware Admin Dark Mode

A Chrome extension that applies a dark theme to the Shopware 6 Admin panel.

## Features

- Toggles dark mode on any Shopware Admin page (`/admin` path)
- Persists the on/off setting across browser sessions via `chrome.storage`
- Handles Vue.js-rendered elements (including teleported popups and context menus) by applying `data-theme="dark"` to `#app`, `<html>`, and `<body>`
- Custom CSS overrides for Admin-specific components: headers, cards, input fields, status badges, and more

## How to load the extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select the `shopware-darkmode-extension` folder
5. The extension icon appears in the toolbar — pin it for quick access

## Usage

Click the extension icon while on a Shopware Admin page to open the popup, then use the toggle to enable or disable dark mode. The setting is applied immediately and remembered for future visits.
