import React from 'react'
import Image from 'next/image'
import userImg from '@/public/images/user-img.png'

interface IProps {
  name: string
  image?: string
  phoneNumber: string
}

const NameCell = ({ name, image, phoneNumber }: IProps) => {
  console.log('NAME IMAGE: ', image)
  console.log('TYPEOF NAME IMAGE: ', typeof image)
  return (
    <div className='flex items-center gap-2'>
      {image !== undefined ? (
        <Image
          alt='User Image'
          src={`https://${image}`}
          width={40}
          height={40}
          className='bg-slate-100 w-[40px] h-[40px] rounded-full '
        />
      ) : (
        <span className='bg-slate-100 w-[40px] h-[40px] rounded-full'></span>
      )}

      <div>
        <p className='text-sm whitespace-nowrap'>{name}</p>
        <p className='text-xs text-secondary whitespace-nowrap'>
          {phoneNumber}
        </p>
      </div>
    </div>
  )
}

export default NameCell
