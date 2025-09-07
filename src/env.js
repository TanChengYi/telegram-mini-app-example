/**
 * Environment detection utilities.
 * @module env
 */

/** Telegram WebApp instance or null. */
export function tg() {
  if (typeof window === 'undefined') return null;
  return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
}

/** Whether the app runs inside Telegram WebView. */
export function isTelegram() {
  return tg() !== null;
}

/** Client version string. */
export function version() {
  const app = tg();
  return app ? app.version : 'N/A';
}

/** Human readable environment name. */
export function environment() {
  return isTelegram() ? 'Telegram' : 'Browser';
}
