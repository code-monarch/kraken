import numbro from "numbro";
import { IFormatCurrencyProps } from "../types";

/**
 * @description Numbers can be formatted to look like currency, percentages, times, or even plain old numbers with decimal places, thousands, and abbreviations.
 * @param {string|number} amount - amount
 * @example
 * Formats 1000000000 to "1B"
 * Formats 2000000 to "2M"
 * @returns string
 */
export const formatAmount = ({ amount }: IFormatCurrencyProps): string => {
  const formatAmount = numbro(amount)?.format({
    spaceSeparated: false,
    thousandSeparated: true,
    mantissa: 2,
    // optionalMantissa: true,
  });

  return formatAmount;
};
