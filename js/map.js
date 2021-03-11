/* global L:readonly */

import { createCard  } from './card.js';

const coords = {
  LAT: 35.6895000,
  LNG: 139.6917100,
};
const zoom = 12;
const mainHightIcon = 52;
const mainWidthIcon = 52;
const hightIcon = 40;
const widthIcon = 40;

const digits = 5;

const mainIcon = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [mainWidthIcon, mainHightIcon],
  iconAnchor: [mainWidthIcon / 2, mainHightIcon],
};

const regularIcon = {
  iconUrl: 'img/pin.svg',
  iconSize: [widthIcon, hightIcon],
  iconAnchor: [widthIcon / 2, hightIcon],
};

const map = L.map('map-canvas').setView({
  lat: coords.LAT,
  lng: coords.LNG,
}, zoom);
const markers = [];

const form = document.querySelector('.ad-form');
const fieldsetForm = form.querySelectorAll('select.map__filter, fieldset');
const mapFilter = document.querySelector('.map__filters');
// const mapIcons = mapFilter.querySelector('fieldset');
// const mapForms = mapFilter.querySelectorAll('select');
const addressInput = form.querySelector('#address');

const fillAddress = ({lat, lng}) => {
  addressInput.value = `${lat.toFixed(digits)} ${lng.toFixed(digits)}`;
}

const disabledForm = () => {
  form.classList.add('ad-form--disabled');
  fieldsetForm.forEach((item) => {
    item.disabled = !item.disabled;
  });


  mapFilter.classList.add('map__filters--disabled');
  mapFilter.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.add('disabled');
    mapFilter.querySelectorAll('.map__features').forEach((feature) => {
      feature.classList.add('disabled');
    });
  })
};

disabledForm();

const activeForm = () => {

  form.classList.remove('ad-form--disabled');

  fieldsetForm.forEach((item) => {
    item.classList.remove('disabled')
  });

  mapFilter.classList.remove('map__filters--disabled');
  mapFilter.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.remove('disabled');
  });
  mapFilter.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.remove('disabled');
  });

}


const renderMarkers = (advert) => {
  advert.forEach(({author, location, offer}) => {

    const icon = L.icon(
      {
        iconUrl: regularIcon.iconUrl,
        iconSize: regularIcon.iconSize,
        iconAnchor: regularIcon.iconAnchor,
      });
    const lat = location.lat;
    const lng = location.lng;

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      });

    marker.addTo(map)
      .bindPopup(createCard({author, offer}),
        {
          keepInView: true,
        },
      );
    markers.push(marker);

    marker.on('moveend', (evt) => {
      addressInput.value = fillAddress(evt.target.getLatLng());
    });
  });
}

const onMarkerMove = (evt) => {
  fillAddress(evt.target.getLatLng());
}

const removeMapMarkers = () => {
  markers.forEach((marker) => {
    marker.remove();
  });
}


const setMap = (advert) => {
  map.on('load', () => {
    activeForm();
    fillAddress({lat: coords.LAT, lng: coords.LNG});
  })
    .setView({
      lat: coords.LAT,
      lng: coords.LNG,
    }, zoom);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  renderMarkers(advert);
}

const createMainPinMarker = () => {
  const mainPinIcon = L.icon(
    {
      iconUrl: mainIcon.iconUrl,
      iconSize: mainIcon.iconSize,
      iconAnchor: mainIcon.iconAnchor,
    });

  const mainPinMarker = L.marker(
    {
      lat: coords.LAT,
      lng: coords.LNG,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    });
  return mainPinMarker;
}

const mainPinMarker = createMainPinMarker();

mainPinMarker.addTo(map);
mainPinMarker.on('move', onMarkerMove);

const onResetMainMarker = () => {
  mainPinMarker.setLatLng(L.latLng(coords.LAT, coords.LNG));
}

export {
  setMap,
  renderMarkers,
  removeMapMarkers,
  onResetMainMarker
}
