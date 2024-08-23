// function to convert numbers to persian digits
export function toFarsiNumber(number: number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const pointIndex = number.toString().indexOf(".");
  const farsiNumber = number
    .toString()
    .split("")
    .map((x) => farsiDigits[parseInt(x)])
    .join("");
  if (number < 1000) {
    if (pointIndex >= 0) {
      return (
        farsiNumber.slice(0, pointIndex) +
        "/" +
        farsiNumber.slice(pointIndex, pointIndex + 2)
      );
    }
    return farsiNumber;
  }
  return farsiNumber[0] + "/" + farsiNumber.slice(1, 4);
}
