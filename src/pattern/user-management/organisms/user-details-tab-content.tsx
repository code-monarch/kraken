import React from 'react'
import UserDetailWidget from '../atoms/user-detail-widget'

interface IProps {
  email: string;
  address: string;
  name: string;
}

const UserDetailsTabContent = ({email, address, name}: IProps) => {
  return (
    <div className='w-[815px] grid grid-cols-2 gap-x-5 gap-y-6'>
      <UserDetailWidget label='User name' value={name} />
      <UserDetailWidget
        label='Email Address'
        value={email}
      />
      <UserDetailWidget label='Phone number' value='+234 803 000 0000' />
      <UserDetailWidget
        label='Residential Address'
        value={address}
      />
    </div>
  );
}

export default UserDetailsTabContent