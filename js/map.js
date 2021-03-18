/* global L:readonly */

import {createCard} from './card.js';
import {filterData} from './filter.js';

const coords = {
  X: 35.6895000,
  Y: 139.6917100,
};

const MAIN_PIN_PATH = 'img/main-pin.svg';
const MARKER_PATH = 'img/pin.svg';
const ICON_WIDTH = 40;
const TILE_LAYER = 'http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png';
const COPYRIGHT = 'Map data: © <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, under ODbL | Tiles: © <a href="http://maps.sputnik.ru/" target="_blank">Спутник</a>';
const ZOOM = 13;

const form = document.querySelector('.ad-form');
const fieldsetForm = document.querySelectorAll('select.map__filter, fieldset');
const mapFilter = document.querySelector('.map__filters');

let markerGroup;

const setDisabledForm = () => {
  fieldsetForm.forEach((item) => {
    item.disabled = !item.disabled;
  });
};
setDisabledForm();

const setActiveState = () => {
  form.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  setDisabledForm();
}

const setDisactiveState = () => {
  form.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  setDisabledForm();
}

const map = L.map('map-canvas')
  .on('load', () => {
    setActiveState();
  })

  .setView({
    lat: coords.X,
    lng: coords.Y,
  }, ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: COPYRIGHT,
  },
).addTo(map);

const resetMap = () => {
  map.setView({
    lat: coords.X,
    lng: coords.Y,
  }, ZOOM);
};

const createMainPinMarker = () => {
  const mainIcon = L.icon(
    {
      iconUrl: MAIN_PIN_PATH,
      iconSize: [ICON_WIDTH, ICON_WIDTH],
      iconAnchor: [ICON_WIDTH/2, ICON_WIDTH],
    },
  );

  const marker = L.marker(
    {
      lat: coords.X,
      lng: coords.Y,
    },
    {
      draggable: true,
      icon: mainIcon,
    },
  );

  marker.addTo(map);

  return marker;
}

const createMarker = (advert) => {

  const mainIcon = L.icon(
    {
      iconUrl: MARKER_PATH,
      iconSize: [ICON_WIDTH, ICON_WIDTH],
      iconAnchor: [ICON_WIDTH/2, ICON_WIDTH],
    },
  );

  const marker = L.marker(
    {
      lat: advert.location.lat,
      lng: advert.locatio.lat,
    },
    {
      icon: mainIcon,
    },
  );

  marker.addTo(map);
  marker.bindPopup(createCard(advert));
}


const removeMarkers = () => {
  map.removeLayer(markerGroup);
  map.closePopup();
};

const renderMarkers = (data) => {
  const markers = filterData(data);
  markerGroup = L.layerGroup(),
  markers.forEach((element) => {createMarker(element, markerGroup)})
  markerGroup.addTo(map);
};

const clearMarkers = (data) => {
  removeMarkers();
  renderMarkers(data);
}

export {
  clearMarkers,
  renderMarkers,
  removeMarkers,
  createMarker,
  createMainPinMarker,
  resetMap,
  setDisactiveState
}
