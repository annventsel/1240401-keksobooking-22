/* global L:readonly */

import {createCard} from './card.js';
import {request} from './request.js';
// import {getData} from './request.js';
import {filterData, MARKERS_MAX} from './filter.js';

const coords = {
  X: 35.68407,
  Y: 139.75159,
};

const num = 5;

const MAIN_PIN_PATH = 'img/main-pin.svg';
const MARKER_PATH = 'img/pin.svg';
const ICON_WIDTH = 40;
const TILE_LAYER = 'http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png';
const COPYRIGHT = 'Map data: © <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, under ODbL | Tiles: © <a href="http://maps.sputnik.ru/" target="_blank">Спутник</a>';
const ZOOM = 13;

const DELAY = 8000;

const form = document.querySelector('.ad-form');
const fieldsetForm = document.querySelectorAll('select.map__filter, fieldset');
const mapFilter = document.querySelector('.map__filters');
const inputAddress = form.querySelector('#address');

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

const onMarkerMove = () => {
  const address = marker.getLatLng();
  inputAddress.value = `${address.lat.toFixed(num)} ${address.lng.toFixed(num)}`;
};


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

marker.addTo(map).on('move', onMarkerMove);

onMarkerMove();

const resetMarker = () => {
  marker.setLatLng([coords.X, coords.Y])
}

const layerGroup = L.layerGroup().addTo(map);

const removeMapPin = () => {
  layerGroup.clearLayers();
};

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
      lng: advert.location.lng,
    },
    {
      icon: mainIcon,
    },
  );

  marker.addTo(layerGroup);
  marker.bindPopup(createCard(advert));
};

const renderMarkers = (data) => {
  data.forEach((elem) => {
    createMarker(elem);
  })
};

const clearMarkers = () => {
  map.removeLayer(layerGroup);
  map.closePopup();
}

let adverts = [];

const onMapFiltersChange = () => {
  removeMapPin();
  renderMarkers(filterData(adverts));
}

const successRender = (data) => {
  adverts = data.slice();

  renderMarkers(adverts.slice(0, MARKERS_MAX));

  mapFilter.addEventListener('change', onMapFiltersChange);
}

const errorHandler = () => {
  const container = document.createElement('div');
  container.style.zIndex = 800;
  container.style.position = 'absolute';
  container.style.left = 0;
  container.style.right = 0;
  container.style.top = 0;
  container.style.padding = '10px 10px';
  container.style.fontSize = '28px'
  container.style.textAlign = 'center';
  container.style.backgroundColor = 'white';
  container.style.color = 'red';
  container.style.border = '5px solid red';
  container.textContent = 'Ошибка! Данные не получены!';

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, DELAY);
}

request(successRender, errorHandler, 'GET');


export {
  renderMarkers,
  removeMapPin,
  onMarkerMove,
  errorHandler,
  setDisactiveState,
  resetMap,
  clearMarkers,
  resetMarker
}
