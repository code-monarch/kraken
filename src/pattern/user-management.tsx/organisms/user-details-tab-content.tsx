import React from 'react'
import UserDetailWidget from '../atoms/user-detail-widget'

const UserDetailsTabContent = () => {
  return (
    <div className='w-[815px] grid grid-cols-2 gap-x-5 gap-y-6'>
      <UserDetailWidget label='User name' value='Aisha Abdullahi' />
      <UserDetailWidget
        label='Email Address'
        value='aishaabdullahi@email.com'
      />
      <UserDetailWidget label='Phone number' value='+234 803 000 0000' />
      <UserDetailWidget
        label='Residential Address'
        value='Behind Abule-egba, Phase 10 Lagos, Nigeria'
      />
    </div>
  );
}

export default UserDetailsTabContent