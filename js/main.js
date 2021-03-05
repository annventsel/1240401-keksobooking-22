import newAdv from './data.js';
import './util.js';
import { createCard  } from './card.js';
import './form.js'

const mapCanvas = document.querySelector('.map__canvas');

mapCanvas.appendChild(createCard(newAdv[0]));
