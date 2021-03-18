// /* global L:readonly */

// import {createCard} from './card.js';
// import {getData} from './request.js';
// import {openErrorMessage} from './messages.js';

// const coords = {
//   LAT: 35.6895000,
//   LNG: 139.6917100,
// };
// const zoom = 12;
// const mainHightIcon = 52;
// const mainWidthIcon = 52;
// const hightIcon = 40;
// const widthIcon = 40;

// const digits = 5;

// const mainIcon = {
//   iconUrl: 'img/main-pin.svg',
//   iconSize: [mainWidthIcon, mainHightIcon],
//   iconAnchor: [mainWidthIcon / 2, mainHightIcon],
// };

// const regularIcon = {
//   iconUrl: 'img/pin.svg',
//   iconSize: [widthIcon, hightIcon],
//   iconAnchor: [widthIcon / 2, hightIcon],
// };

// const map = L.map('map-canvas');
// const markers = [];

// const form = document.querySelector('.ad-form');
// const fieldsetForm = document.querySelectorAll('select.map__filter, fieldset');
// const mapFilter = document.querySelector('.map__filters');
// const addressInput = form.querySelector('#address');

// const fillAddress = ({lat, lng}) => {
//   addressInput.value = `${lat.toFixed(digits)} ${lng.toFixed(digits)}`;
// }

// const setDisabledForm = () => {
//   fieldsetForm.forEach((item) => {
//     item.disabled = !item.disabled;
//   });
// };
// setDisabledForm();

// const setActiveState = () => {
//   form.classList.remove('ad-form--disabled');
//   mapFilter.classList.remove('map__filters--disabled');
//   setDisabledForm();
// }

// const setDisactiveState = () => {
//   form.classList.add('ad-form--disabled');
//   mapFilter.classList.add('map__filters--disabled');
//   setDisabledForm();
// }

// const renderMarkers = (advert) => {
//   advert.forEach(({author, location, offer}) => {

//     const icon = L.icon(
//       {
//         iconUrl: regularIcon.iconUrl,
//         iconSize: regularIcon.iconSize,
//         iconAnchor: regularIcon.iconAnchor,
//       });
//     const lat = location.lat;
//     const lng = location.lng;

//     const marker = L.marker(
//       {
//         lat,
//         lng,
//       },
//       {
//         icon,
//       });

//     marker.addTo(map)
//       .bindPopup(createCard({author, offer}),
//         {
//           keepInView: true,
//         },
//       );
//     markers.push(marker);

//     marker.on('moveend', (evt) => {
//       addressInput.value = fillAddress(evt.target.getLatLng());
//     });
//   });
// }

// const onMarkerMove = (evt) => {
//   fillAddress(evt.target.getLatLng());
// }

// const removeMapMarkers = () => {
//   markers.forEach((marker) => {
//     marker.remove();
//   });
// }

// const onSuccess = (advert) => {
//   renderMarkers(advert);
// }

// const onFail = (error) => {
//   openErrorMessage(error);
// }

// const setMap = () => {
//   map.on('load', () => {
//     setActiveState();
//     fillAddress({lat: coords.LAT, lng: coords.LNG});
//     getData(onSuccess, onFail);
//   })
//     .setView({
//       lat: coords.LAT,
//       lng: coords.LNG,
//     }, zoom);

//   L.tileLayer(
//     'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//     {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//   ).addTo(map);
// }

// const resetMap = () => {
//   setMap.setView(
//     {
//       lat: coords.LAT,
//       lng: coords.LNG,
//     }, zoom);
// }

// const createMainPinMarker = () => {
//   const mainPinIcon = L.icon(
//     {
//       iconUrl: mainIcon.iconUrl,
//       iconSize: mainIcon.iconSize,
//       iconAnchor: mainIcon.iconAnchor,
//     });

//   const mainPinMarker = L.marker(
//     {
//       lat: coords.LAT,
//       lng: coords.LNG,
//     },
//     {
//       draggable: true,
//       icon: mainPinIcon,
//     });
//   return mainPinMarker;
// }

// const mainPinMarker = createMainPinMarker();

// mainPinMarker.addTo(map);
// mainPinMarker.on('move', onMarkerMove);

// const onResetMainMarker = () => {
//   mainPinMarker.setLatLng(L.latLng(coords.LAT, coords.LNG));
// } // Посмотри пожалуйста, я тут правильно сбрасываю настройки или надо так: setMap.setLatLng(L.latLng(coords.LAT, coords.LNG));

// export {
//   setMap,
//   resetMap,
//   removeMapMarkers,
//   onResetMainMarker,
//   onMarkerMove,
//   fillAddress

// }
