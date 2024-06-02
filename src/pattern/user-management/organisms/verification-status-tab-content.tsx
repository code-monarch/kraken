"use client";
import React from "react";
import PilgrimStatusWidget from "../molecules/pilgrim-status-widget";
import { Badge } from "@/components/ui/badge";
import ButtonWithIcon from "@/pattern/common/molecules/controls/button-with-icon";
import ViewAllCaretIcon from "@/pattern/common/atoms/icons/view-all-caret-icon";
import { show } from "@ebay/nice-modal-react";
import { ChangeVerificationStatusModal } from "./change-verification-status-modal";

interface IProps {
  isVerified: boolean;
  nationalId: string;
}

const VerificationStatusTabContent = ({isVerified, nationalId}: IProps) => {

  const showChangeVerifStatusModal = ()=>{
    show(ChangeVerificationStatusModal);
  }
  return (
    <div className='w-[583px] flex flex-col gap-y-4'>
      {/* Header */}
      <div className='w-full flex items-center justify-between py-3 border-b rounded-[8px]'>
        <span className='text-[hsla(215,16%,47%,1)] text-[1.125rem] font-medium'>
          Change Status:
        </span>

        {/* Change verification status modal trigger */}
        <ButtonWithIcon
          suffixIcon={
            <ViewAllCaretIcon color='#384860' className='rotate-90' />
          }
          variant='outline'
          className='w-[138px] h-[44px] text-base'
          onClick={showChangeVerifStatusModal}
        >
          {isVerified ? "Approved" : "Pending"}
        </ButtonWithIcon>
      </div>

      <PilgrimStatusWidget label='National ID:' value={nationalId} />
      <PilgrimStatusWidget
        label='Verification Status:'
        value={
          <Badge variant={isVerified ? "completed" : "pending"} className='h-[32px] w-[80px] text-base'>
            {isVerified ? "Approved" : "Pending"}
          </Badge>
        }
      />
      <PilgrimStatusWidget
        label='Verification Status:'
        comment={isVerified ? "Approved" : 'Document under review. Please check back later'}
      />
    </div>
  );
};

export default VerificationStatusTabContent;
