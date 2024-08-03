'use client'
import { FC } from 'react'

interface IProps<> {
  message?: string
}

const NoDataWidget: FC<IProps> = ({ message }) => {
  return (
    <div className='w-full flex items-center justify-center min-h-[300px] h-full font-semibold'>
      {message ?? <span>No Record Found</span>}
    </div>
  )
}

export default NoDataWidget
