// import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

const feedbackFormData = {};

textareaMessage();

function onFormSubmit(event) {
  event.preventDefault();

  if (refs.input.value === '' || refs.textarea.value === '') {
    alert('You need fill up all required fields!');
  }

  console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
  refs.form.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(event) {
  const textareaDataBefore = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (textareaDataBefore) {
    textareaDataBefore[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(textareaDataBefore));
    return;
  }

  feedbackFormData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function textareaMessage() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    refs.input.value = savedMessage[refs.input.name] || '';
    refs.textarea.value = savedMessage[refs.textarea.name] || '';
  }
}

// refs.form.addEventListener('input', () => {
//   const feedbackFormDataToString = JSON.stringify(feedbackFormData);
//   localStorage.setItem(STORAGE_KEY, feedbackFormDataToString);
// });

// refs.form.addEventListener('submit', onFormSubmit);
// refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

// textareaMessage();

// function onFormSubmit(event) {
//   event.preventDefault();

//   event.currentTarget.reset();
//   localStorage.removeItem(STORAGE_KEY);
// }

// function onTextareaInput(event) {
//   const message = event.target.value;

//   localStorage.setItem(STORAGE_KEY, message);
// }

// function textareaMessage() {
//   const savedMessage = localStorage.getItem(STORAGE_KEY);

//   if (savedMessage) {
//     refs.textarea.value = savedMessage;
//   }
// }
