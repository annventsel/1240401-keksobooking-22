import {getRandomInt, getRandomFloat, getRandomString, shuffleArray} from './util.js'

const type = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

export const convertType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

export const title = [
  'Стандарт двухместный',
  'Стандарт одноместный',
  'Квартира в центре',
  'Люкс аппартаменты',
  'Частный дом',
  'Суперлюкс с видом на город',
  'Кровать в хостеле',
  'Мансарда',
  'Палац с роскошным садом',
  'Роскошное бунгало в тихом районе',
];

export const wordsDecl = {
  room: ['комната', 'комнаты', 'комнат'],
  guest: ['гость', 'гостя', 'гостей'],
};

const checkTime = [
  '12:00',
  '13:00',
  '14:00',
];

const features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const minLocationX = 35.65000;

const maxLocationX = 35.70000;

const minLocationY = 139.70000;

const maxLocationY = 139.80000;

const minPrice = 1000;

const maxPrice = 1000000;

const minRooms = 1;

const maxRooms = 5;

const minGuests = 0;

const maxGuests = 3;

const objectsCount = 10;

let counter = 0;

const createObject = () => {
  //создание объекта author
  let author = {
    avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
  };
    //создание объекта location
  let location = {
    x: getRandomFloat(minLocationX, maxLocationX, 5),
    y: getRandomFloat(minLocationY, maxLocationY, 5),
  };
    //создание объекта offer
  let offer = {
    title: title[counter],
    address: location.x + ', ' + location.y,
    price: getRandomInt(minPrice, maxPrice),
    type: getRandomString(type),
    rooms: getRandomInt(minRooms, maxRooms),
    guests: getRandomInt(minGuests, maxGuests),
    checkin: getRandomString(checkTime),
    checkout: getRandomString(checkTime),
    features: shuffleArray(features).slice(0, getRandomInt(1, features.length)),
    description: 'Расположен в центральной части района Сибуя. Из просторных номеров открывается панорамный вид на город',
    photos: shuffleArray(photos).slice(0, getRandomInt(1, photos.length)),
  };

  counter++;
  return{
    author,
    location,
    offer,
  };
};

const newObject = new Array(objectsCount).fill(null).map(() => createObject());

export {newObject};
