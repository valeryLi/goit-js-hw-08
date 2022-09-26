// import throttle from 'lodash.throttle';
const throttle = require('lodash.throttle');
const feedbackFormData = {};
const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('input', throttle(onTextareaInput, 500));
refs.form.addEventListener('submit', onFormSubmit);

textareaMessage();

function onFormSubmit(event) {
  event.preventDefault();

  if (refs.input.value === '' || refs.textarea.value === '') {
    alert('You need fill up all required fields!');
  }

  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(feedbackFormData);
}

function onTextareaInput(event) {
  feedbackFormData[event.target.name] = event.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function textareaMessage() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedMessage = JSON.parse(savedMessage);

  if (parsedMessage) {
    refs.input.value = parsedMessage.email;
    refs.textarea.value = parsedMessage.message;
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
