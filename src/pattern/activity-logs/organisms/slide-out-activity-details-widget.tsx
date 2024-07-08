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
          <Label htmlFor='type'>Type:</Label>
          <div id='type' className='text-right'>
            {type}
          </div>
        </div>

        {/* Status */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='status'>Status:</Label>
          <div id='status' className='text-right'>
            {status}
          </div>
        </div>

        {/* IP Address */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='ip'>IP Address</Label>
          <div id='ip'>{IP}</div>
        </div>

        {/* Device */}
        <div className='w-full flex items-start justify-between gap-9'>
          <Label htmlFor='device'>Device</Label>
          <div id='device' className='text-right'>
            {device}
          </div>
        </div>
        
        {/* Date */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='date'>Date</Label>
          <div id='date' className='text-right'>
            {date}
          </div>
        </div>

        <Separator />
      </div>
    </div>
  )
};
