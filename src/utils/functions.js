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