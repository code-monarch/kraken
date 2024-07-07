'use client'
import React, { FC } from 'react'
import ButtonWithIcon from '../../common/molecules/controls/button-with-icon'
import UpdateFeesBtnIcon from '../../common/atoms/icons/update-fees-btn-icon'
import { Separator } from '@/components/ui/separator'
import { show } from '@ebay/nice-modal-react'
import SetTransactionFeesModal from '../templates/set-transaction-fees-modal'
import FeeWidget from '../molecules/fee-widget'

interface ITransactionFeesBannerProps {
  depositFees: string
  withdrawalFees: string
  cashoutRewards: string
}

const TransactionFeesBanner: FC<ITransactionFeesBannerProps> = ({
  depositFees,
  withdrawalFees,
  cashoutRewards,
}) => {

  const handleUpdateFees = () => {
    show(SetTransactionFeesModal)
  }
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
        <FeeWidget label='Deposit Fees' value={depositFees} />

        {/* Withdrawal Fees */}
        <FeeWidget label='Withdrawal Fees' value={withdrawalFees} />

        {/* Cashout Rewards */}
        <FeeWidget label='Cashout Rewards' value={cashoutRewards} />
      </div>
    </div>
  )
}

export default TransactionFeesBanner
