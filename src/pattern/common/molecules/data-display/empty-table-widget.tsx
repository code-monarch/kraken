'use client'
import { FC } from 'react'
import { TableCell } from '@/components/ui/table'
import { ColumnDef } from '@tanstack/react-table'

interface IProps<> {
  message?: string
  columns: ColumnDef<any>[]
}

const EmptyTableWidget: FC<IProps> = ({ message, columns }) => {
  return (
    <TableCell colSpan={columns.length} className='h-24 text-center'>
      <br />
      <br />
      <br />
      {message ?? <span>No Record Found</span>}
      <br />
      <br />
      <br />
    </TableCell>
  )
}

export default EmptyTableWidget
