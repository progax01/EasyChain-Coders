import Big from "big.js";
const big = (amount: string) => {
  const value = new Big(amount);
  return value;
};
export const stringify = (value: string | number | Big): string => {
  return big(value).toFixed();
};
export default big;
