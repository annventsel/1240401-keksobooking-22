import {newObject, convertType, wordsDecl, room, guest} from './data.js';
import {declination} from './util.js';
// поиск места для вставки карточки объявления
const cardPlace = document.querySelector('#map-canvas');
// поиск шаблона объявления
const templItem = document.querySelector('#card').content.querySelector('.popup');

// функция наполнения объявления рандомными фичами

const getFeatures = (container, features) => {
  let list = container.querySelector('li');
  list.forEach((item) => {
    if (features.indexOf(item.classList[1].replace('popup__feature--', '')) === -1) {
      item.remove();
    }
  });
};

const container = document.querySelector('.popup__features');

// наполнение объявления фотографиями

const getPhotos = (arrayPhotos) => {
  let arrayPhotosHTML = [];
  arrayPhotos.forEach (function (element) {
    // создание изображения img
    let imgItem = document.createElement('img');
    // присваиваем изображению класс
    imgItem.classList.add('popup__photo');
    // присваиваем атрибуты
    imgItem.setAttribute('src', element);
    imgItem.setAttribute('width', 45);
    imgItem.setAttribute('height', 40);
    imgItem.setAttribute('alt', 'Фотография жилья');
    // наполняем массив изображений
    arrayPhotosHTML.push(imgItem.outerHTML);
  });
  // возвращаем слитый построчно HTML
  return arrayPhotosHTML.join('\n');
}

// const photoList = document.querySelector('.popup__photos');

// photoList.innerHTML = '';

//   for (let i = 0; i < offer.photos.length; i++) {
//     const photoItem = templItem.querySelector('.popup__photo').cloneNode(true);
//     photoItem.src = offer.photos[i];
//     photoList.appendChild(photoItem);
//   };

// функция создания объявления (принимает объект с данными, возвращает объявления для вставки в разметку)
const createCard = (dataObject) => {
// клонирование объявления
  const cardItem = templItem.cloneNode(true);

  cardItem.querySelector('.popup__title').textContent = dataObject.offer.title;
  cardItem.querySelector('popup__text--adress').textContent = dataObject.offer.address;
  cardItem.querySelector('.popup__text--price').innerHTML = dataObject.offer.price + ' <span>₽/ночь</span>';
  cardItem.querySelector('.popup__type').textContent = convertType[dataObject.offer.type];
  cardItem.querySelector('.popup__description').textContent = dataObject.offer.description;
  cardItem.querySelector('popup__text--capacity').textContent = `${dataObject.offer.rooms} ${declination(room, wordsDecl.room)} для ${dataObject.offer.guests} ${declination(guest, wordsDecl.guest)}`;
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${dataObject.offer.checkin}, выезд до ${dataObject.offer.checkout}`;
  cardItem.querySelector('.popup__avatar').src = dataObject.offer.avatar;
  cardItem.querySelector('.popup__features').innerHTML = getFeatures(container, dataObject.offer.features) ;
  cardItem.querySelector('.popup__photos').innerHTML = getPhotos(dataObject.offer.photos);

  return cardItem;
}

const cardNumber = 1;

const currentCard = newObject[cardNumber];

// вставка объявления
cardPlace.appendChild(createCard(currentCard));

export {createCard};
