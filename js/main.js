import './util.js';
import './form.js';
import './messages.js';
import './card.js'
import {getData} from './request.js'
import {renderMarkers} from './map.js'

const URL = 'https://22.javascript.pages.academy/keksobooking/data';

const successRender = (data) => renderMarkers(data);

getData(URL, successRender);
