# Telegram Mini App Showcase

One-page demo covering common [Telegram WebApp](https://core.telegram.org/bots/webapps) features.

## Run

1. Deploy the contents of this repository to a static host.
2. Set your bot's `WebApp` url to `https://your.host/public/index.html`.
3. Open the bot in Telegram and tap the button to launch the mini app.

## Features

- Init data viewer
- Window & theme control
- MainButton & BackButton demo
- Alerts, popups and haptic feedback
- Clipboard reading and QR scanning
- External links and permission requests

Screenshots are available in the `public` folder when running.

## Themes & Languages

Choose among **Neon Blue**, **Cyber Mint** and **Sunset Magenta** themes. Language can be switched between English and 中文 via the top-right selectors.

## Limitations

These features require minimum Telegram versions:

- `readTextFromClipboard` – 6.7+
- `showScanQrPopup` – 6.4+

Outside of Telegram the page remains functional but will display the message "This feature is available only inside Telegram." for Telegram‑specific actions.
