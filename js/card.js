import {declination, createClass} from './util.js'
import {wordsDecl} from './data.js'

const convertType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const getPhotos = (arr, photo) => {
  const photoFragment = document.createDocumentFragment();

  arr.forEach((item) => {
    const newPhotoItem = photo.cloneNode(true);
    newPhotoItem.src = item;
    photoFragment.appendChild(newPhotoItem);
  });
};

export const createCard = (advert) => {
  const {offer, author} = advert;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  const {avatar} = author;

  const templItem = document.querySelector('#card').content.querySelector('.popup');
  const cardItem = templItem.cloneNode(true);

  cardItem.querySelector('.popup__avatar').src = avatar;
  cardItem.querySelector('.popup__title').textContent = title;
  cardItem.querySelector('.popup__text--address').textContent = address;
  cardItem.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span`;
  cardItem.querySelector('.popup__type').textContent = convertType[type];
  cardItem.querySelector('.popup__text--capacity').textContent = `${rooms} ${declination(rooms, wordsDecl.room)} для ${guests} ${declination(guests, wordsDecl.guest)}`;
  cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  cardItem.querySelector('.popup__description').textContent = description;

  const getFeatures = cardItem.querySelector('.popup__features');
  getFeatures.innerHTML = '';
  const newFeaturesList = createClass(features, 'popup__feature');
  getFeatures.appendChild(newFeaturesList);

  const newPhoto = cardItem.querySelector('.popup__photo');
  const newPhotoList = cardItem.querySelector('.popup__photos');
  newPhotoList.innerHTML = '';
  newPhotoList.appendChild(getPhotos(photos, newPhoto));

  return cardItem;

}

