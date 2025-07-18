// value validation
export function isValueValid(value) {
  return (
    value !== "" &&
    value !== null &&
    value !== undefined &&
    value !== false &&
    value !== 0 &&
    !Number.isNaN(value)
  );
}

// filter valid object
export function filterValidObject(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([key, value]) => isValueValid(value))
  );
}

// EnglishNumberConvertToBanglaNumber
export const enToBnNumber = (number) => {
  const bnNumber = new Intl.NumberFormat("bn-BD").format(number);
  return bnNumber === "০" ? "০০" : bnNumber;
};

export function getBanglaPosition(rank = 0) {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const specialSuffixMap = {
    1: "ম",
    2: "য়",
    3: "য়",
    4: "র্থ",
    5: "ম",
    6: "ষ্ঠ",
    7: "ম",
    8: "ম",
    9: "ম",
    10: "ম",
  };
  const suffix = specialSuffixMap[rank] || " তম";
  const banglaNumber = rank
    .toString()
    .split("")
    .map((d) => banglaDigits[parseInt(d)])
    .join("");
  return banglaNumber + suffix;
}
