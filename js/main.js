'use strict';

const getRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
}


const getRandomFloat = (min, max, digit = 2) => {
  if (max > min && min >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(digit);
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
}

// getRandomInt;
// getRandomFloat;

const objectsCount = 10;

let objects = [];

const types = ['palace', 'flat', 'house', 'bungalow'];

const checkTime = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const minPrice = 1000;

const maxPrice = 1000000;

const minRooms = 1;

const maxRooms = 5;

const minLocationX = 35.65000;

const maxLocationX = 35.70000;

const minLocationY = 139.70000;

const maxLocationY = 139.80000;

const minGuests = 0;

const maxGuests = 3;

const getRandomString = (string) => {
  return string[getRandomInt(0, string.lenght - 1)];
}

const getRandomFeatures = (features) => {
  features.lenght = getRandomInt(1, features.lenght);
  return features;
}

const addObjects = () => {
  for (let i = 0; i < objectsCount; i++) {
    objects.push({
      author: {
        avatar: `img/avatars/user0${i}.png`,
      },
      offer: {
        title: 'Perfect accommodation in Tokio',
        adress: 'location.x location.y',
        price: getRandomInt(minPrice, maxPrice),
        type: getRandomString(types),
        rooms: getRandomInt(minRooms, maxRooms),
        guests: getRandomInt(minGuests, maxGuests),
        checkin: getRandomString(checkTime),
        checkout: getRandomString(checkTime),
        features: getRandomFeatures(features),
        description: 'Set in Tokyo, within 400 metres of Sony Music Roppongi Museum and 500 metres of Asahi Shrine, Mitsui Garden',
        photos: getRandomString(photos),
      },
      location: {
        x: getRandomFloat(minLocationX, maxLocationX, 5),
        y: getRandomFloat(minLocationY, maxLocationY, 5),
      },
    })
  }
};

addObjects();

// const TITLES = ['Квартира в центре', 'Квартира на окраине', 'Аппартаменты с бассейном', 'Квартира без удобств, вид во двор', 'Хостел', 'Стандартный дабл', 'Комната с подселением', 'Двухуровневый пентхауз'];
