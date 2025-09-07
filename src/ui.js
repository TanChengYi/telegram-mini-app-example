import { environment, version } from './env.js';

let translations = {};
let currentTheme = 'neon-blue';
let currentLang = 'en';

/**
 * Translate helper available globally.
 * @param {string} key
 * @returns {string}
 */
export function t(key) {
  return translations[key] || key;
}
window.i18n = t;

/**
 * Apply current translation to DOM elements.
 */
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) {
      el.textContent = translations[key];
    }
  });
  updateHeader();
}

/**
 * Load language file and apply.
 * @param {string} lang
 */
export async function setLang(lang) {
  currentLang = lang;
  translations = await fetch(`src/i18n/${lang}.json`).then((r) => r.json());
  applyTranslations();
  localStorage.setItem('lang', lang);
}

/**
 * Change theme stylesheet.
 * @param {string} name
 */
export function setTheme(name) {
  currentTheme = name;
  document.getElementById('theme-style').setAttribute('href', `src/themes/${name}.css`);
  updateHeader();
  localStorage.setItem('theme', name);
}

/** Update top header info. */
export function updateHeader() {
  const envEl = document.getElementById('env-info');
  const themeEl = document.getElementById('theme-info');
  const verEl = document.getElementById('version-info');
  if (envEl) envEl.textContent = `${t('env_label')}: ${environment()}`;
  if (themeEl) themeEl.textContent = `${t('theme_label')}: ${t('theme_' + currentTheme.replace('-', ''))}`;
  if (verEl) verEl.textContent = `${t('version_label')}: ${version()}`;
}

/** Initialize UI controls. */
export async function initUI() {
  const lang = localStorage.getItem('lang') || 'en';
  const theme = localStorage.getItem('theme') || 'neon-blue';
  await setLang(lang);
  setTheme(theme);
  const langSel = document.getElementById('lang-select');
  const themeSel = document.getElementById('theme-select');
  if (langSel) langSel.value = lang;
  if (themeSel) themeSel.value = theme;
  langSel?.addEventListener('change', (e) => setLang(e.target.value));
  themeSel?.addEventListener('change', (e) => setTheme(e.target.value));
}

export { translations, currentTheme, currentLang };
