// import {fillAddress} from './map.js'

const form = document.querySelector('.ad-form');
const typeOption = form.querySelector('#type');
const priceOption = form.querySelector('#price');
const checkInOption = form.querySelector('#timein');
const checkOutOption = form.querySelector('#timeout');
const titleInput = form.querySelector('#title');
const roomNumberSelect = form.querySelector('#room_number');
const guestsCapacity = form.querySelector('#capacity');
const guestsCapacityOption = guestsCapacity.querySelectorAll('option');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_PER_NIGHT = 1000000;

const accomodationPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const roomsCapacity = {
  1: {
    value: [1],
    error: 'Только один гость',
  },
  2: {
    value: [1, 2],
    error: 'Не более 2 гостей и не менее 1',
  },
  3: {
    value: [1, 2, 3],
    error: 'Не более 3 гостей и не менее 1',
  },
  100: {
    value: [0],
    error: 'Не для гостей!',
  },
}


const onCheckTimeChange = (evt) => {
  const { value } = evt.target;

  checkInOption.value = value;
  checkOutOption.value = value;
}

const onTypeChange = () => {
  priceOption.placeholder = accomodationPrice[typeOption.value];
  priceOption.min = accomodationPrice[typeOption.value];
}


const onChangeTitleSelect = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Заголовок не должен превышать 100 символов');
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
}

const onChangePriceSelect = () => {
  const price = priceOption.value;
  const type = typeOption.value;
  const minPrice = accomodationPrice[type];

  if (price < minPrice) {
    priceOption.setCustomValidity(`Стоимость должна быть не менее ${minPrice}`);
  } else if (price > MAX_PRICE_PER_NIGHT) {
    priceOption.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE_PER_NIGHT}`);
  } else {
    priceOption.setCustomValidity('');
  }
  priceOption.reportValidity();
}

const onChangeRoomsSelect = () => {
  const guest = guestsCapacity.value;
  const room = roomNumberSelect.value;

  if (!roomsCapacity[room].value.includes(guest)) {
    guestsCapacity.setCustomValidity(roomsCapacity[room].error);
  } else {
    guestsCapacity.setCustomValidity('');
  }
}

const onChangeOption = () => {
  guestsCapacityOption.forEach((option) => {
    if (option.value === '1') {
      option.selected = true;
    }
  });
}

const validateForm = () => {       // не пойму почему не работает :( ошибок в консоли нет
  onTypeChange();
  onChangeOption();
  typeOption.addEventListener('change', onTypeChange);
  checkInOption.addEventListener('change', onCheckTimeChange );
  checkOutOption.addEventListener('change', onCheckTimeChange );
  priceOption.addEventListener('change', onChangePriceSelect);
  guestsCapacity.addEventListener('change', onChangeRoomsSelect);
  roomNumberSelect.addEventListener('change', onChangeRoomsSelect);
  titleInput.addEventListener('change', onChangeTitleSelect);
}

export {
  validateForm
}
