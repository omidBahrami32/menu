// function to convert numbers to persian digits
export function toFarsiNumber(number: number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const farsiNumber = number
    .toString()
    .split("")
    .map((x) => farsiDigits[x])
    .join("");
  if (number < 1000) {
    return farsiNumber;
  }
  return farsiNumber[0] + "/" + farsiNumber.slice(1);
}
