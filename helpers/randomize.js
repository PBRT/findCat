// Return random number between min an max
const randomize = (min, max) => Math.floor((Math.random() * max) + min);

// Return random number between min and max excluding a specific number of the interval
const  randomizeExcludingNumber = (min, max, number) => {
  const rdmValue = randomize(min, max);
  return rdmValue === number ? randomizeExcludingNumber(min, max, number) : rdmValue;
};

// Generate random couple of value always differents from each others
const generateRandomCouple = (min, max) => {
  const first = randomize(min, max);
  const second = randomizeExcludingNumber(min, max, first);

  return [first, second];
}

module.exports = {
  generateRandomCouple: generateRandomCouple,
  randomize: randomize,
};
