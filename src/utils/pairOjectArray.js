export const pairOjectArray = (obj, slice = 2) => {
  const paired = [];

  for (let i = 0; i < obj.length; i += slice) {
    paired.push(obj.slice(i, i + slice));
  }

  return paired;
};