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

const onCheckTimeChange = (evt) => {
  const { value } = evt.target;

  checkInOption.value = value;
  checkOutOption.value = value;
}

const onPriceChange = () => {
  priceOption.placeholder = accomodationPrice[typeOption.value];
  priceOption.min = accomodationPrice[typeOption.value];
};

onPriceChange();

typeOption.addEventListener('change', onPriceChange);
checkInOption.addEventListener('change', onCheckTimeChange );
checkOutOption.addEventListener('change', onCheckTimeChange );
