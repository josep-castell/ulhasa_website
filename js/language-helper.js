const LANGUAGE_KEY = 'ulhasa-website-language-preference';

let languagePreference = sessionStorage.getItem(LANGUAGE_KEY);
let language = navigator.language === 'es-ES' ? 'es' : 'en';
let translations;
const languages = document.getElementById('languages');
const textsToTranslate = document.querySelectorAll('[data-page]');

languages.addEventListener('click', async (event) => {
  if (event.target.dataset.language)
    await changeLanguage(event.target.dataset.language);
});

async function changeLanguage(lang) {
  if (lang) {
    language = lang;
    sessionStorage.setItem(LANGUAGE_KEY, lang);
  } else if (languagePreference) {
    language = languagePreference;
  }
  await setTranslations();
  updateTranslations();
}

async function setTranslations() {
  const requestJson = await fetch(`../assets/lang/${language}.json`);
  translations = await requestJson.json();
}

function updateTranslations() {
  textsToTranslate.forEach((text) => {
    const page = text.dataset.page;
    const section = text.dataset.section;
    const value = text.dataset.value;
    text.innerHTML = value
      ? translations[page][section][value]
      : translations[page][section];
  });
}

addEventListener('load', () => {
  changeLanguage('');
});
