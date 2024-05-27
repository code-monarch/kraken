'use client'
import React, { FC } from 'react'

interface Iprops {
  message: string | React.ReactElement
}

const ErrorFallback: FC<Iprops> = ({ message }) => {
  return (
    <div className='w-full min-h-[250px] h-full flex items-center justify-center'>
      <h4 className='max-w-[60%] text-[hsla(215,16%,47%,1)] text-[1.125rem] text-center font-semibold'>
        {message}
      </h4>
    </div>
  )
}

export default ErrorFallback
