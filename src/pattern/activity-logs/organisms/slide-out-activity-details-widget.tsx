"use client";
import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import SlideOutDivider from "@/pattern/common/molecules/data-display/slide-out-divider";

interface IProps {
  type: string;
  status: string;
  IP: string;
  device: string;
  date: string;
}

export const SlideOutActivityDetailsWidget: FC<IProps> = ({
type,
status,
IP,
device,
date,
}) => {
  return (
    <div className='w-full min-h-[273px] h-fit space-y-[20px] py-4'>
      <SlideOutDivider>
        <Badge
          variant='accent'
          className='min-h-[24px] min-w-[139px] rounded-[10px]'
        >
          Activity details
        </Badge>
      </SlideOutDivider>
      <div className='w-full flex flex-col space-y-[12px]'>
        {/* Type */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Type:</Label>
          <div id='amount'>Login</div>
        </div>
        {/* Status */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Status:</Label>
          <div id='amount'>Successful</div>
        </div>
        {/* IP Address */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>IP Address</Label>
          <div id='amount'>192.168.1.1</div>
        </div>
        {/* Device */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Device</Label>
          <div id='amount'>Chrome Browser</div>
        </div>
        {/* Date */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount'>Date</Label>
          <div id='amount'>18/10/2023. | 12:45 pm</div>
        </div>

        <Separator />
      </div>
    </div>
  );
};
