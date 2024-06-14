'use client'
import { FC, ReactElement } from 'react'
import { TableCell } from '@/components/ui/table'
import { ColumnDef } from '@tanstack/react-table'

interface IProps<> {
  message?: string | ReactElement
  columns: ColumnDef<any>[]
}

const ErrorTableWidget: FC<IProps> = ({ message, columns }) => {
  return (
    <TableCell
      colSpan={columns.length}
      className='h-24 text-center text-destructive'
    >
      <br />
      <br />
      <br />
      {message ?? (
        <span>
          An error occured while trying to fetch the data for this table. <br /> To
          retry, kindly refresh this page.
        </span>
      )}
      <br />
      <br />
      <br />
    </TableCell>
  )
}

export default ErrorTableWidget
