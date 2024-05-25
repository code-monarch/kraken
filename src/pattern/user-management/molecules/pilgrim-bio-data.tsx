"use client";
import React, { FC } from "react";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { LinkIcon } from "@/pattern/common/atoms/icons/link-icon";
import VerifiedTagIcon from "@/pattern/common/atoms/icons/verified-tag-icon";
import PhoneIcon from "@/pattern/common/atoms/icons/phone-icon";
import { Status, UserType } from "@/pattern/types";
import { Badge } from "@/components/ui/badge";

export interface IPilgrimBioDataProps {
  userImg: string | StaticImport;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  status: "active" | "inactive";
  userType: "user" | "agent" | string;
  id?: string;
}

export const PilgrimBioData: FC<IPilgrimBioDataProps> = ({
  userImg,
  firstName,
  lastName,
  email,
  phoneNumber,
  status = Status.active,
  userType = UserType.Pilgrim,
}) => {
  return (
    <div className='flex items-start gap-6'>
      <div className='relative w-[96px] h-[96px] rounded-full'>
        <Image alt='profile picture' src={userImg} width={96} height={96} />
        <span className='absolute bottom-0 right-0'>
          <VerifiedTagIcon />
        </span>
      </div>

      <div className='space-y-[16px]'>
        <div>
          {/* Name */}
          <p className='flex items-center gap-1 text-24 font-semibold whitespace-nowrap'>
            <span>{firstName}</span>
            <span>{lastName}</span>
          </p>
          {/* Email */}
          <p className='flex items-center gap-1 text-base whitespace-nowrap'>
            <span>
              <LinkIcon />
            </span>
            <span>{email}</span>
          </p>
          {/* Phone Number */}
          <p className='flex items-center gap-1'>
            <span>
              <PhoneIcon />
            </span>
            <span className='text-base text-secondary whitespace-nowrap'>
              {phoneNumber}
            </span>
          </p>
        </div>

        <div className='flex items-center gap-1'>
          {/* User */}
          <Badge variant='outline'>
            {userType === "pilgrim" ? "Pilgrim" : "Agent"}
          </Badge>

          {/* Status */}
          <Badge variant={status === "active" ? "active" : "inactive"}>
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
    </div>
  );
};
