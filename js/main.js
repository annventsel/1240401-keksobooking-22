const getRandomInt = (min, max) => {
  if (max > min && min >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
}

const getRandomFloat = (min, max, digit = 2) => {
  if (max > min && min >= 0) {
    return (Math.random() * (max - min + min) + min).toFixed(digit);
  }
  if (max <= min) {
    throw new Error('Input data error');
  }
}

getRandomInt;
getRandomFloat;





