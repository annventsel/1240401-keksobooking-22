import './data.js';
import './util.js';
import { createAdv } from './util.js';
import { createCard  } from './card.js';

const mapCanvas = document.querySelector('.map__canvas');

let newAdv = createAdv();

let cardAdv = createCard(newAdv[0]);

mapCanvas.appendChild(cardAdv);

 