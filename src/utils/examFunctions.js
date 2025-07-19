export const getGrade = (fullMark, number) => {
  const percent = (number / fullMark) * 100;
  if (percent >= 80) return "A+";
  if (percent >= 70) return "A";
  if (percent >= 60) return "A-";
  if (percent >= 50) return "B";
  if (percent >= 40) return "C";
  if (percent >= 33) return "D";
  return "F";
};
