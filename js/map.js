/* global L:readonly */

import { newObject } from './data.js';
import { createCard  } from './card.js';

const lat = 35.6895000;
const lng = 139.6917100;
const zoom = 12;
const mainHightIcon = 52;
const mainWidthIcon = 52;
const hightIcon = 40;
const widthIcon = 40;
const mainIcon = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [mainWidthIcon, mainHightIcon],
  iconAnchor: [mainWidthIcon/2, mainHightIcon],
};

const regularIcon = {
  iconUrl: 'img/pin.svg',
  iconSize: [widthIcon, hightIcon],
  iconAnchor: [widthIcon/2, hightIcon],
};

const digits = 5;

const form = document.querySelector('.ad-form');
const fieldsetForm = form.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const mapIcons = mapFilter.querySelector('fieldset');
const mapForms = mapFilter.querySelectorAll('select');

const disabledForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsetForm.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
  mapFilter.classList.add('ad-form--disabled');
  mapIcons.setAttribute('disabled', 'disabled');
  mapForms.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
};

disabledForm();

const activeForm = () => {
  form.classList.remove('ad-form--disabled');
  fieldsetForm.forEach((value) => {
    value.removeAttribute('disabled', 'disabled');
  });

  mapFilter.classList.remove('ad-form--disabled');
  mapIcons.removeAttribute('disabled', 'disabled');
  mapForms.forEach((value) => {
    value.removeAttribute('disabled', 'disabled');
  });
};


const map = L.map('map-canvas').on('load', () => {
  activeForm();

})
  .setView({
    lat: lat,
    lng: lng,
  }, zoom);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: mainIcon.iconUrl,
    iconSize: mainIcon.iconSize,
    iconAnchor: mainIcon.iconAnchor,
  });

const marker = L.marker(
  {
    lat: lat,
    lng: lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
marker.addTo(map);


newObject.forEach((offer) => {

  const regularPinicon = L.icon(
    {
      iconUrl: regularIcon.iconUrl,
      iconSize: regularIcon.iconSize,
      iconAnchor: regularIcon.iconAnchor,
    });

  const regularMarker = L.marker(
    {
      lat: offer.offer.address.lat,
      lng: offer.offer.address.lng,
    },
    {
      regularPinicon,
    });

  regularMarker.addTo(map).bindPopup(createCard(offer));

});

const address = document.querySelector('#address');

address.value = `${map._lastCenter.lat} , ${map._lastCenter.lng}`;

marker.on('moveend', (evt) => {
  const move = evt.target.getLatLng();
  const x = move.lng.toFixed(digits);
  const y = move.lat.toFixed(digits);

  address.value = `${x} , ${y}`;

});

const mapValidation = document.querySelector('#map-canvas');

mapValidation;
