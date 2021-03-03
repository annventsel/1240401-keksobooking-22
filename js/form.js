const form = document.querySelector('.ad-form');
const typeOption = form.querySelector('#type');
const priceOption = form.querySelector('#price');
const checkInOption = form.querySelector('#timein');
const checkOutOption = form.querySelector('#timeout');

const accomodationPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
};

const onTypeChange = (evt) => {
  checkInOption.value = evt.target.value;
  checkOutOption.value = evt.target.value;
};

const onPriceChange = () => {
  priceOption.placeholder = accomodationPrice[typeOption.value];
  priceOption.min = accomodationPrice[typeOption.value];
};

checkOutOption.addEventListener('change', onTypeChange);

onPriceChange();

typeOption.addEventListener('change', onPriceChange);
