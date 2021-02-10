import {getRandomInt, getRandomFloat, getRandomString, shuffleArray} from './util.js'

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

const objectsCount = 10;

let objects = [];

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
        features: shuffleArray(features).slice(0, getRandomInt(1, features.length)),
        description: 'Set in Tokyo, within 400 metres of Sony Music Roppongi Museum and 500 metres of Asahi Shrine, Mitsui Garden',
        photos: getRandomString(photos),
      },
      location: {
        x: getRandomFloat(minLocationX, maxLocationX, 5),
        y: getRandomFloat(minLocationY, maxLocationY, 5),
      },
    })
  }
  return objects;
};

addObjects();
