import numbro from 'numbro'
import { IFormatNumberProps } from '../types'

export const formatNumber = ({
  number = 0,
  average = false,
  mantissa = 0,
}: IFormatNumberProps) => {
  const formattedNumber = numbro(number)?.format({
    spaceSeparated: false,
    thousandSeparated: true,
    average: average,
    mantissa: mantissa,
  })

  return formattedNumber
}
