/* global_:readonly */
// import{clearMarkers} from './leaflet.js';
// import {debounce} from './util.js';

const PRICE_MAX = Infinity;
const MARKERS_MAX = 10;
// const DELAY = 500;


const priceRate = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: PRICE_MAX,
  },
  any: {
    min: 0,
    max: PRICE_MAX,
  },
}

const ALL = 'any';

const filters = Array.from(document.querySelector('.map__filters').children);

const filterRules = {
  'housing-type': (data, filter) => {
    return filter.value === data.offer.type;
  },

  'housing-price': (data, filter) => {
    return data.offer.price >= priceRate[filter.value].start && data.offer.price < priceRate[filter.value].end;
  },

  'housing-guests': (data, filter) => {
    return filter.value === data.offer.guests.toString();
  },

  'housing-features': (data, filter) => {
    let checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

    return checkListElements.every((checkbox) => {
      return data.offer.features.some((feature) => {
        return feature === checkbox.value;
      });
    });
  },
};


const filterData = (data) => {
  let offers = [];
  let i = 0;
  let result;

  while (i < data.length && offers.length < MARKERS_MAX) {
    result = filters.every((filter) => {
      return (filter.value === ALL) ? true : filterRules[filter.id](data[i], filter);
    });

    if (result) {
      offers.push(data[i]);
    }

    i++;
  }

  return offers;
};

export {
  filterData
}

// const filter = document.querySelector('.map__filters');
// const housingType = filter.querySelector('#housing-type');
// const housingPrice = filter.querySelector('#housing-price');
// const housingRooms = filter.querySelector('#housing-rooms');
// const housingGuests = filter.querySelector('#housing-guests');
// const housingFeatures = filter.querySelector('#housing-features');


// const compareFatures = (checkboxes, feature) => {
//   if (checkboxes.length === 0) {
//     return true;
//   }
//   if (checkboxes.length > feature.length) {
//     return false;
//   }

//   for (const checkbox of checkboxes) {
//     if (!feature.includes(checkbox.value)) {
//       return false
//     }
//   }

//   return true;
// }

// const filterAdvert = (advert) => {
//   const { offer } = advert;
//   const {
//     price,
//     type,
//     rooms,
//     guests,
//     features,
//   } = offer;

//   const featuresActive = housingFeatures.querySelectorAll('.map__checkbox:checked');

//   let isFiltered = true;

//   if (housingType.value === ALL &&
//     housingPrice.value === ALL &&
//     housingRooms.value === ALL &&
//     housingGuests.value === ALL &&
//     featuresActive.length === 0) {
//     return true;
//   }

//   if (housingType.value !== ALL && housingType.value !== type) {
//     return false;
//   }

//   if (housingGuests.value !== ALL && guests !== +housingGuests.value) {
//     return false;
//   }

//   if (housingRooms.value !== ALL && +housingRooms.value !== rooms) {
//     return false;
//   }

//   const priceRateValue = housingPrice.value;
//   if (priceRate[priceRateValue].min >= price || priceRate[priceRateValue].max < price) {
//     return false;
//   }

//   isFiltered = compareFatures(featuresActive, features);

//   return isFiltered;
// }

// const filterMarkers = (data) => {
//   const arr = [];
//   let counter = 0;

//   for (let i = 0; i < data.length; i++) {
//     let advert = data[i];

//     if (filterAdvert(advert)) {
//       arr.push(advert);
//       counter++
//     }

//     if (counter > MARKERS_MAX) {
//       return arr;
//     }
//   }

//   return arr;
// };

// const setFilter = (data) => {
//   filter.addEventListener('change', _.debounce(() => {clearMarkers(data)}, DELAY));
// }

// export {
//   setFilter,
//   filterAdvert,
//   filterMarkers
// }
