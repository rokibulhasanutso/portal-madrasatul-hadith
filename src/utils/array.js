export const groupArray = (array, groupSize = 2) => {
  const half = Math.floor(array.length / 2);
  const rearranged = [];

  for (let i = 0; i < half; i++) {
    rearranged.push(array[i]);
    if (i + half < array.length) {
      rearranged.push(array[i + half]);
    }
  }

  if (array.length % 2 !== 0) {
    rearranged.push(array[array.length - 1]);
  }

  const grouped = [];
  for (let i = 0; i < rearranged.length; i += groupSize) {
    grouped.push(rearranged.slice(i, i + groupSize));
  }

  return grouped;
};