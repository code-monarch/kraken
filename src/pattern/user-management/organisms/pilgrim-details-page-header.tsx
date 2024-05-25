"use client";
import React, { FC } from "react";
import {
  IPilgrimBioDataProps,
  PilgrimBioData,
} from "../molecules/pilgrim-bio-data";
import { Button } from "@/components/ui/button";
import { FreezeAccountModal } from "./freeze-account-modal";
import { show } from "@ebay/nice-modal-react";
import { DeleteAccountModal } from "./delete-account-modal";

export const PilgrimDetailsPageHeader: FC<IPilgrimBioDataProps> = ({
  email,
  firstName,
  lastName,
  phoneNumber,
  userImg,
  status,
  userType,
}) => {

  const handleFreezeAccount =()=>{
    show(FreezeAccountModal);
  }

  const handleDeleteAccount =()=>{
    show(DeleteAccountModal);
  }
  return (
    <div className='w-full flex items-start justify-between'>
      <PilgrimBioData
        email={email}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        userImg={userImg}
        status={status}
        userType={userType}
      />
      <div className='h-[44px] flex items-center gap-4'>
        <Button
          variant='outlineSecondary'
          className='h-full w-[174px]'
          onClick={handleFreezeAccount}
        >
          Freeze Account
        </Button>
        <Button
          variant='outlineDestructive'
          className='h-full w-[102px]'
          onClick={handleDeleteAccount}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
