import React, { FC } from 'react'
import Divider from '../../atoms/icons/divider'

interface ISlideOutDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string
  color?: string
}

const SlideOutDivider: FC<ISlideOutDividerProps> = ({
  children,
  width,
  color,
}) => {
  return (
    <div className='w-full flex items-center justify-between'>
      <Divider width={width ?? '70'} color={color} />
      <div>{children}</div>
      <Divider width={width ?? '70'} color={color} />
    </div>
  )
}

export default SlideOutDivider
