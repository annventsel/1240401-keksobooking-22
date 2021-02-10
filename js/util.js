export const getRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
};

export const getRandomFloat = (min, max, digit = 2) => {
  if (max > min && min >= 0) {
    return +(Math.random() * (max - min) + min).toFixed(digit);
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
};

export const getRandomString = (string) => {
  return string[getRandomInt(0, string.length - 1)];
};

export const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
