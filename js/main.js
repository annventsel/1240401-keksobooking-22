import './util.js';
import './form.js';
import './map.js';
import { newObject } from './data.js';
import { createCard } from './card.js';

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(createCard(newObject[0]));
