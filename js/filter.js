/* global_:readonly */

const PRICE_MAX = Infinity;
const MARKERS_MAX = 10;

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
