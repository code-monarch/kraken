'use client'
import { FC } from 'react'

interface IProps<> {
  message?: string
}

const ErrorMessageWidget: FC<IProps> = ({ message }) => {
  return (
    <div className='w-full flex items-center justify-center min-h-[300px] h-full text-destructive font-semibold'>
      {message ?? (
        <span>
          An wrror occured while trying to fetch the data. Try Refreshing
        </span>
      )}
    </div>
  )
}

export default ErrorMessageWidget
