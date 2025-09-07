import { isTelegram, tg, version } from './env.js';

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
  if (!isTelegram) {
    unavailable();
    return false;
  }
  if (min && parseFloat(version) < min) {
    alert(`Requires Telegram ${min}+`);
    return false;
  }
  return true;
}

export const initDataRaw = isTelegram ? tg.initData : '';
export const initData = isTelegram ? tg.initDataUnsafe : {};

export function ready() {
  if (ensure()) tg.ready();
}

export function expand() {
  if (ensure()) tg.expand();
}

export function close() {
  if (ensure()) tg.close();
}

export function setHeaderColor(color) {
  if (ensure()) tg.setHeaderColor(color);
}

export function setBackgroundColor(color) {
  if (ensure()) tg.setBackgroundColor(color);
}

export function showAlert(text) {
  if (ensure()) tg.showAlert(text);
}

export function showConfirm(text) {
  if (!ensure()) return Promise.resolve(false);
  return tg.showConfirm(text);
}

export function showPopup(params) {
  if (ensure()) tg.showPopup(params);
}

export function hapticImpact(style) {
  if (ensure()) tg.HapticFeedback.impactOccurred(style);
}

export function hapticNotification(type) {
  if (ensure()) tg.HapticFeedback.notificationOccurred(type);
}

export function readTextFromClipboard() {
  if (!ensure(6.7)) return Promise.resolve('');
  return tg.readTextFromClipboard();
}

export function showScanQrPopup(cb) {
  if (!ensure(6.4)) return;
  tg.showScanQrPopup({ text: 'scan' }, cb);
}

export function openLink(url) {
  if (ensure()) tg.openLink(url);
}

export function openTelegramLink(url) {
  if (ensure()) tg.openTelegramLink(url);
}

export function requestWriteAccess() {
  if (ensure()) tg.requestWriteAccess();
}

export function requestContact() {
  if (ensure()) tg.requestContact();
}

export function mainButtonShow() {
  if (ensure()) tg.MainButton.show();
}

export function mainButtonHide() {
  if (ensure()) tg.MainButton.hide();
}

export function mainButtonEnable() {
  if (ensure()) tg.MainButton.enable();
}

export function mainButtonDisable() {
  if (ensure()) tg.MainButton.disable();
}

export function mainButtonSetText(text) {
  if (ensure()) tg.MainButton.setText(text);
}

export function mainButtonSetColor(color) {
  if (ensure()) tg.MainButton.setParams({ color });
}

export function backButtonShow() {
  if (ensure()) tg.BackButton.show();
}

export function backButtonHide() {
  if (ensure()) tg.BackButton.hide();
}

export { ensure };
