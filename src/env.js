/**
 * Environment detection utilities.
 * @module env
 */

/** Whether the app runs inside Telegram WebView. */
export const isTelegram = typeof window !== 'undefined' && !!window.Telegram && !!window.Telegram.WebApp;

/** Telegram WebApp instance or null. */
export const tg = isTelegram ? window.Telegram.WebApp : null;

/** Client version string. */
export const version = tg ? tg.version : 'N/A';

/** Human readable environment name. */
export const environment = isTelegram ? 'Telegram' : 'Browser';
