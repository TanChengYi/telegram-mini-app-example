import { isTelegram, tg } from './env.js';
import * as api from './tg-api.js';
import { initUI, t, updateHeader } from './ui.js';

initUI().then(setup);

function setup() {
  if (isTelegram) {
    document.getElementById('raw-data').textContent = api.initDataRaw;
    document.getElementById('parsed-data').textContent = JSON.stringify(api.initData, null, 2);
    tg.onEvent('viewportChanged', updateWindowInfo);
    tg.onEvent('themeChanged', updateThemeInfo);
    tg.onEvent('mainButtonClicked', () => alert(t('on_click')));
    tg.onEvent('backButtonClicked', () => alert(t('on_click')));
    updateWindowInfo();
    updateThemeInfo();
  } else {
    document.getElementById('raw-data').textContent = 'N/A';
    document.getElementById('parsed-data').textContent = 'N/A';
  }
  bindEvents();
  updateHeader();
}

function bindEvents() {
  document.getElementById('validate-btn').addEventListener('click', () => alert(t('verify_text')));

  // Window & theme
  document.getElementById('ready-btn').addEventListener('click', () => api.ready());
  document.getElementById('expand-btn').addEventListener('click', () => api.expand());
  document.getElementById('close-btn').addEventListener('click', () => api.close());
  document.getElementById('header-color-btn').addEventListener('click', () => api.setHeaderColor('#000')); // simple
  document.getElementById('bg-color-btn').addEventListener('click', () => api.setBackgroundColor('#ffffff'));

  // Navigation buttons
  let mainVisible = false;
  let mainEnabled = true;
  document.getElementById('main-btn-toggle').addEventListener('click', () => {
    if (mainVisible) api.mainButtonHide(); else api.mainButtonShow();
    mainVisible = !mainVisible;
  });
  document.getElementById('main-btn-enable').addEventListener('click', () => {
    if (mainEnabled) api.mainButtonDisable(); else api.mainButtonEnable();
    mainEnabled = !mainEnabled;
  });
  document.getElementById('main-btn-text').addEventListener('click', () => {
    api.mainButtonSetText(mainVisible ? 'Next' : 'Start');
  });
  let colorToggle = false;
  document.getElementById('main-btn-color').addEventListener('click', () => {
    api.mainButtonSetColor(colorToggle ? '#3f8efc' : '#ff4f9a');
    colorToggle = !colorToggle;
  });
  let backVisible = false;
  document.getElementById('back-btn-toggle').addEventListener('click', () => {
    if (backVisible) api.backButtonHide(); else api.backButtonShow();
    backVisible = !backVisible;
  });

  // Interactions & haptics
  document.getElementById('alert-btn').addEventListener('click', () => api.showAlert('Hello'));
  document.getElementById('confirm-btn').addEventListener('click', () => {
    api.showConfirm('OK?').then((res) => api.showAlert(String(res)));
  });
  document.getElementById('popup-btn').addEventListener('click', () => {
    api.showPopup({
      title: 'Hi',
      message: 'Popup',
      buttons: [{ id: 'ok', type: 'default', text: 'OK' }],
    });
  });
  document.getElementById('impact-light-btn').addEventListener('click', () => api.hapticImpact('light'));
  document.getElementById('impact-medium-btn').addEventListener('click', () => api.hapticImpact('medium'));
  document.getElementById('impact-heavy-btn').addEventListener('click', () => api.hapticImpact('heavy'));
  document.getElementById('notify-success-btn').addEventListener('click', () => api.hapticNotification('success'));
  document.getElementById('notify-warning-btn').addEventListener('click', () => api.hapticNotification('warning'));
  document.getElementById('notify-error-btn').addEventListener('click', () => api.hapticNotification('error'));

  // Clipboard & QR
  document.getElementById('clipboard-btn').addEventListener('click', () => {
    api.readTextFromClipboard().then((txt) => {
      document.getElementById('clipboard-result').textContent = t('clipboard_result') + txt;
    });
  });
  document.getElementById('qr-btn').addEventListener('click', () => {
    api.showScanQrPopup((text) => {
      document.getElementById('qr-result').textContent = t('scan_result') + text;
    });
  });

  // Links & permissions
  document.getElementById('open-link-btn').addEventListener('click', () => api.openLink('https://example.com'));
  document.getElementById('open-tg-link-btn').addEventListener('click', () => api.openTelegramLink('https://t.me'));
  document.getElementById('write-access-btn').addEventListener('click', () => api.requestWriteAccess());
  document.getElementById('request-contact-btn').addEventListener('click', () => api.requestContact());
}

function updateWindowInfo() {
  if (!isTelegram) return;
  document.getElementById('viewport').textContent = tg.viewportHeight;
  document.getElementById('stable').textContent = tg.stableHeight;
  document.getElementById('expanded').textContent = tg.isExpanded;
}

function updateThemeInfo() {
  if (!isTelegram) return;
  document.getElementById('color-scheme').textContent = tg.colorScheme;
  document.getElementById('theme-params').textContent = JSON.stringify(tg.themeParams);
}

