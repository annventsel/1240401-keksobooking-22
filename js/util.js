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

export const declination = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => {
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases [(number % 10 < 5) ? number % 10 : 5]];
};

export const createClass = (arr, currentClass) => {
  const templFragment = document.createDocumentFragment();

  arr.forEach((element) => {
    const changedClass = `${currentClass}-- ${element}`;
    const newElement = document.createElement('li');
    newElement.classList.add(currentClass, changedClass);
    templFragment.appendChild(newElement);
  });

  return templFragment;
};

export const createAdv = (elements = 10) => {
  const arr = [];
  for(let i = 1; i <= elements; i++) {
    arr.push(createAdv());
  }

  return arr;
}
