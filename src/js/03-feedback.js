import throttle from 'lodash.throttle';
import { save, load, remove } from './storage';

const formRef = document.querySelector('.feedback-form');
const LOCALE_STORAGE_KEY = 'feedback-form-state';

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onFormInput, 500));
initPage();

function onFormInput(evt) {
  const { name, value } = evt.target;

  let savedData = load(LOCALE_STORAGE_KEY);

  savedData = savedData ? savedData : {};

  savedData[name] = value;
  save(LOCALE_STORAGE_KEY, savedData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
}

function initPage() {
  const savedData = load(LOCALE_STORAGE_KEY);

  if (!savedData) {
    return;
  }

  Object.entries(savedData).forEach(([name, value]) => {
    formRef.elements[name].value = value;
  });
}
