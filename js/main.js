import newObject from './data.js';
import './util.js';
import { createCard  } from './card.js';
import './form.js';
import './map.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(createCard(newObject[0]));
