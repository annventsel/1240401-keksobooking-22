import {isEscapeKeydown} from './util.js'

const success = document.querySelector('#success').content.querySelector('.success');

const successMessage = success.cloneNode(true);

successMessage.classList.add('hidden');

const error = document.querySelector('#error').content.querySelector('.error');

const errorMessage = error.cloneNode(true);


errorMessage.classList.add('hidden');

const openSuccessMessage = () => {
  successMessage.classList.remove('hidden');
  successMessage.style.zIndex = '1000';
  document.body.appendChild(successMessage);


  const onEscapeClose = (evt) => {
    if (isEscapeKeydown(evt)) {
      successMessage.remove();
      document.removeEventListener('keydown', onEscapeClose);
    }
  };

  successMessage.addEventListener('click', () => {
    successMessage.remove();
    document.removeEventListener('keydown', onEscapeClose);
  })

  document.addEventListener('keydown', onEscapeClose)

};


const openErrorMessage = (textError) => {

  errorMessage.classList.remove('hidden');

  errorMessage.querySelector('.error__message').textContent = textError;
  errorMessage.style.zIndex = '1000';
  document.body.appendChild(errorMessage);

  const onEscapeClose = (evt) => {
    if (isEscapeKeydown(evt)) {
      errorMessage.remove();
      document.removeEventListener('keydown', onEscapeClose);
    }
  };

  errorMessage.addEventListener('click', () => {
    errorMessage.remove();
  })

  document.addEventListener('keydown', onEscapeClose);
};

export {
  openSuccessMessage,
  openErrorMessage
}
