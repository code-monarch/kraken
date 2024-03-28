"use client";
import React, { FC } from "react";
import {
  IPilgrimBioDataProps,
  PilgrimBioData,
} from "../molecules/pilgrim-bio-data";
import userImg from "@/public/images/user-img-lg.png";
import { Button } from "@/components/ui/button";

export const PilgrimDetailsPageHeader: FC<IPilgrimBioDataProps> = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  userImg,
  status,
  userType,
}) => {
  return (
    <div className='w-full flex items-start justify-between'>
      <PilgrimBioData
        email= {email}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        userImg={userImg}
        status={status}
        userType={userType}
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
};
