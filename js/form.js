// import { SourceCode } from 'eslint';
// import {fillAddress, onMarkerMove} from './map.js'
import {createMainPinMarker, setDisactiveState} from './leaflet.js'
import {openSuccessMessage, openErrorMessage} from './messages.js'
import {sendData} from './request.js';

const form = document.querySelector('.ad-form');
const typeOption = form.querySelector('#type');
const priceOption = form.querySelector('#price');
const checkInOption = form.querySelector('#timein');
const checkOutOption = form.querySelector('#timeout');
const roomNumberSelect = form.querySelector('#room_number');
const guestsCapacity = form.querySelector('#capacity');
const guestsCapacityOption = guestsCapacity.querySelectorAll('option');
const inputAddress = form.querySelector('#address');

// const MIN_TITLE_LENGTH = 30;
// const MAX_TITLE_LENGTH = 100;
// const MAX_PRICE_PER_NIGHT = 1000000;

const accomodationPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const guestsNumber = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
}

const validateRooms = () => {
  let roomValue = roomNumberSelect.value;

  guestsCapacityOption .forEach((option) => {
    // метод индексОф сравнивает искомый элемент с элементами массива, если в массиве нет элемента, то возвращает -1. Если мы в условии задаем, что индексОф должен быть >= 0, то таким образом мы просто скрываем или не выводим отрицательный результат поиска.
    // в данном случае, форич перебирает все возможные варианты количества мест для гостей и isDisabled проверяет, когда количество гостей не совпадает с возможной вместимостью, то мы не показываем остальные варианты, которые нам не подходят.
    let isDisabled = !(guestsNumber[roomValue].indexOf(option.value) >= 0);
    option.selected = guestsNumber[roomValue][0] === option.value;
    option.disabled = isDisabled;
    option.hidden = isDisabled;
  });
}

validateRooms();

const onRoomNumberChange = () => {
  validateRooms();
};

roomNumberSelect.addEventListener('change', onRoomNumberChange);


const onCheckTimeChange = (evt) => {
  const { value } = evt.target;

  checkInOption.value = value;
  checkOutOption.value = value;
};

const onCheckInOptionChange = (evt) => {
  onCheckTimeChange(evt);
};

const onCheckOutOptionChange = (evt) => {
  onCheckTimeChange(evt);
};

checkInOption.addEventListener('change', onCheckInOptionChange);
checkOutOption.addEventListener('change', onCheckOutOptionChange);


const onTypeChange = () => {
  priceOption.placeholder = accomodationPrice[typeOption.value];
  priceOption.min = accomodationPrice[typeOption.value];
};

typeOption.addEventListener('change', onTypeChange);

const onMarkerMove = () => {
  const address = addressMarker.getLatLng();
  inputAddress.value = `${address.lat.toFixed(5)} ${address.lng.toFixed(5)}`;
};

const addressMarker = createMainPinMarker();
addressMarker.on('move', onMarkerMove);
inputAddress.readOnly = true;
onMarkerMove();


const sendForm = () => {
  openSuccessMessage(),
  form.reset();
  onMarkerMove();
  setDisactiveState();
};

const showFormError = () => openErrorMessage();


const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendData(sendForm, showFormError, new FormData(form))
};


// const resetForm = (evt) => {
//   evt.preventDefault();
//   form.reset();
//   // resetMap();
//   // onResetMainMarker();
//   onTypeChange();
// };

const resetButton = form.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  form.reset();
});



form.addEventListener('submit', onFormSubmit);
