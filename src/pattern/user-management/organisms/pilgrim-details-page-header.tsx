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
  id,
}) => {
  const handleFreezeAccount = () => {
    show(FreezeAccountModal, {
      userId: id,
      name: `${firstName} ${lastName}`,
      status: status,
    });
  };

  const handleDeleteAccount = () => {
    show(DeleteAccountModal, {
      userId: id,
      name: `${firstName} ${lastName}`,
    });
  };
  return (
    <div className="w-full flex items-start justify-between">
      <PilgrimBioData
        email={email}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        userImg={userImg}
        status={status}
        userType={userType}
      />
      <div className="h-[44px] flex items-center gap-4">
        <Button
          variant="outlineSecondary"
          className="h-full w-[174px]"
          onClick={handleFreezeAccount}
        >
          {status === "Frozen" ? "Unfreeze Account" : "Freeze Account"}
        </Button>
        <Button
          variant="outlineDestructive"
          className="h-full w-[102px]"
          onClick={handleDeleteAccount}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
