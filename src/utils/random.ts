export const getRandomId = (array: Array<any>): number => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex]["id"];
};

export const getRandomIndex = (array: Array<any>): number => {
  return Math.floor(Math.random() * array.length);
};

export const getFiftyFiftyChance = (): boolean => {
  return Math.random() < 0.5;
};

export const getRandomCoord = (number: number): number => {
  return Math.floor(Math.random() * (number - 33) + 32);
};
