const ESCAPE = 'Escape';
const ESC = 'Esc';

const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => {
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};

const isEscapeKeydown = (evt) => {
  return evt.key === ESCAPE || evt.key === ESC;
};

const debounce = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = null;
      callback(...args);
    }, time);
  };
};

const createImg = (width = '50', height = '50', alt = '') => {
  const img = document.createElement('img');
  img.src = '';
  img.width = width;
  img.height = height;
  img.alt = alt;

  return img;
}

export {
  declination,
  isEscapeKeydown,
  debounce,
  createImg
}
