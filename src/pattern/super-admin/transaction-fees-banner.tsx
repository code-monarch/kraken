"use client";
import React, { FC } from "react";
import ButtonWithIcon from "../common/molecules/controls/button-with-icon";
import UpdateFeesBtnIcon from "../common/atoms/icons/update-fees-btn-icon";
import { Separator } from "@/components/ui/separator";
import { show } from "@ebay/nice-modal-react";
import SetTransactionFeesModal from "./set-transaction-fees-modal";

interface ITransactionFeesBannerProps {
  depositFees: string;
  withdrawalFees: string;
  exchangeFees: string;
}

const TransactionFeesBanner: FC<ITransactionFeesBannerProps> = ({
  depositFees,
  withdrawalFees,
  exchangeFees,
}) => {
  const handleUpdateFees = () => {
    show(SetTransactionFeesModal);
  };
  return (
    <div className='w-full h-fit bg-white flex flex-col items-start px-6 rounded-[6px]'>
      {/* Header */}
      <div className='w-full h-[76px] flex items-center justify-between py-4'>
        {/* Title */}
        <div className='text-[1.125rem] text-[#202B3C] font-semibold font-raleway'>
          Transaction Fees
        </div>

        {/* Update Fees modal Trigger */}
        <ButtonWithIcon
          prefixIcon={<UpdateFeesBtnIcon />}
          size='sm'
          className='w-[177px] h-[44px] text-base'
          onClick={handleUpdateFees}
        >
          Update Fees
        </ButtonWithIcon>
      </div>
      <Separator />

      {/* Content */}
      <div className='w-full h-[108px] grid grid-cols-3 gap-5 py-5'>
        {/* Deposit Fees */}
        <div className='flex flex-col items-start gap-y-[16px]'>
          <label
            htmlFor='deposit fees'
            className='text-sm text-[#384860] font-medium'
          >
            Deposit Fees
          </label>
          <p className='w-full flex items-center gap-2 text-[#384860] text-24 font-semibold'>
            {depositFees}%
          </p>
        </div>

        {/* Withdrawal Fees */}
        <div className='flex flex-col items-start gap-y-[16px]'>
          <label
            htmlFor='Withdrawal fees'
            className='text-sm text-[#384860] font-medium'
          >
            Withdrawal Fees
          </label>
          <p className='w-full flex items-center gap-2 text-[#384860] text-24 font-semibold'>
            {withdrawalFees}%
          </p>
        </div>

        {/* Exchange Fees */}
        <div className='flex flex-col items-start gap-y-[16px]'>
          <label
            htmlFor='Exchange fees'
            className='text-sm text-[#384860] font-medium'
          >
            Exchange Fees
          </label>
          <p className='w-full flex items-center gap-2 text-[#384860] text-24 font-semibold'>
            {exchangeFees}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionFeesBanner;
