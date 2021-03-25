import { onMarkerMove, resetMap, resetMarker, removeMapPin, renderMarkers } from './map.js'
import { openSuccessMessage, openErrorMessage } from './messages.js'
import { request } from './request.js';
import { resetPhotoPreview } from './photo.js';

const form = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const typeOption = form.querySelector('#type');
const priceOption = form.querySelector('#price');
const checkInOption = form.querySelector('#timein');
const checkOutOption = form.querySelector('#timeout');
const roomNumberSelect = form.querySelector('#room_number');
const guestsCapacity = form.querySelector('#capacity');
const guestsCapacityOption = guestsCapacity.querySelectorAll('option');

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
  const roomValue = roomNumberSelect.value;

  guestsCapacityOption.forEach((option) => {
    const isDisabled = !(guestsNumber[roomValue].indexOf(option.value) >= 0);
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

const setDefaultState = () => {
  form.reset();
  filterForm.reset();
  resetMap();
  onMarkerMove();
  resetMarker();
  resetPhotoPreview();
  removeMapPin();
  renderMarkers();
  onTypeChange();
};

const sendForm = () => {
  openSuccessMessage();
  setDefaultState();
};

const showFormError = () => openErrorMessage();

const onFormSubmit = (evt) => {
  evt.preventDefault();
  request(sendForm, showFormError, 'POST', new FormData(form));
};

const resetButton = form.querySelector('.ad-form__reset');

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  setDefaultState();
});

form.addEventListener('submit', onFormSubmit);
