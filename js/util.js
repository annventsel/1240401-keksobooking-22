const getRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
};

const getRandomFloat = (min, max, digit = 2) => {
  if (max > min && min >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(digit);
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
};

const getRandomString = (string) => {
  return string[getRandomInt(0, string.length - 1)];
};

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => {
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases [(number % 10 < 5) ? number % 10 : 5]];
};

const isEscapeKeydown = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

export {
  getRandomInt,
  getRandomFloat,
  getRandomString,
  shuffleArray,
  declination,
  isEscapeKeydown
}
