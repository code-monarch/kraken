"use client"
import React from 'react'
import { PilgrimBioData } from '../molecules/pilgrim-bio-data'
import userImg from "@/public/images/user-img-lg.png";
import { Status } from '@/pattern/types';
import { Button } from '@/components/ui/button';

const PilgrimDetailsTemplate = () => {
  return (
    <div className='bg-card w-full min-h-[760px] h-full flex items-start justify-between p-6'>
      <PilgrimBioData
        email='aishaabdullahi@email.com'
        firstName='Aisha'
        lastName='Abdullahi'
        phoneNumber='+234 803 000 0000'
        userImg={userImg}
        status='active'
        userType='pilgrim'
      />
      <div className='h-[44px] flex items-center gap-4'>
        <Button variant='outlineSecondary' className='h-full w-[174px]'>
          Freeze Account
        </Button>
        <Button variant='outlineDestructive' className='h-full w-[102px]'>
          Delete
        </Button>
      </div>
    </div>
  );
}

export default PilgrimDetailsTemplate