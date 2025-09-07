import { tg, version } from './env.js';

/**
 * Show a common message when feature used outside Telegram.
 */
function unavailable() {
  alert(window.i18n ? window.i18n('feature_only_tg') : 'This feature is available only inside Telegram.');
}

/**
 * Ensure running inside Telegram and optional minimum version.
 * @param {number} [min] minimum supported version
 * @returns {boolean}
 */
function ensure(min) {
  const app = tg();
  if (!app) {
    unavailable();
    return null;
  }
  if (min && parseFloat(version()) < min) {
    alert(`Requires Telegram ${min}+`);
    return null;
  }
  return app;
}

export function initDataRaw() {
  const app = tg();
  return app ? app.initData : '';
}
export function initData() {
  const app = tg();
  return app ? app.initDataUnsafe : {};
}

export function ready() {
  const app = ensure();
  app?.ready();
}

export function expand() {
  const app = ensure();
  app?.expand();
}

export function close() {
  const app = ensure();
  app?.close();
}

export function setHeaderColor(color) {
  const app = ensure();
  app?.setHeaderColor(color);
}

export function setBackgroundColor(color) {
  const app = ensure();
  app?.setBackgroundColor(color);
}

export function showAlert(text) {
  const app = ensure();
  app?.showAlert(text);
}

export function showConfirm(text) {
  const app = ensure();
  if (!app) return Promise.resolve(false);
  return app.showConfirm(text);
}

export function showPopup(params) {
  const app = ensure();
  app?.showPopup(params);
}

export function hapticImpact(style) {
  const app = ensure();
  app?.HapticFeedback?.impactOccurred(style);
}

export function hapticNotification(type) {
  const app = ensure();
  app?.HapticFeedback?.notificationOccurred(type);
}

export function readTextFromClipboard() {
  const app = ensure(6.7);
  if (!app) return Promise.resolve('');
  return app.readTextFromClipboard();
}

export function showScanQrPopup(cb) {
  const app = ensure(6.4);
  if (!app) return;
  app.showScanQrPopup({ text: 'scan' }, cb);
}

export function openLink(url) {
  const app = ensure();
  app?.openLink(url);
}

export function openTelegramLink(url) {
  const app = ensure();
  app?.openTelegramLink(url);
}

export function requestWriteAccess() {
  const app = ensure();
  app?.requestWriteAccess();
}

export function requestContact() {
  const app = ensure();
  app?.requestContact();
}

export function mainButtonShow() {
  const app = ensure();
  app?.MainButton.show();
}

export function mainButtonHide() {
  const app = ensure();
  app?.MainButton.hide();
}

export function mainButtonEnable() {
  const app = ensure();
  app?.MainButton.enable();
}

export function mainButtonDisable() {
  const app = ensure();
  app?.MainButton.disable();
}

export function mainButtonSetText(text) {
  const app = ensure();
  app?.MainButton.setText(text);
}

export function mainButtonSetColor(color) {
  const app = ensure();
  app?.MainButton.setParams({ color });
}

export function backButtonShow() {
  const app = ensure();
  app?.BackButton.show();
}

export function backButtonHide() {
  const app = ensure();
  app?.BackButton.hide();
}

export { ensure };
