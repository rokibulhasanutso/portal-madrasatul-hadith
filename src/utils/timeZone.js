export function convertToBanglaNumber(number) {
  const engToBanglaDigits = {
    0: "০",
    1: "১",
    2: "২",
    3: "৩",
    4: "৪",
    5: "৫",
    6: "৬",
    7: "৭",
    8: "৮",
    9: "৯",
  };

  return number
    .toString()
    .split("")
    .map((digit) => engToBanglaDigits[digit] || digit)
    .join("");
}
