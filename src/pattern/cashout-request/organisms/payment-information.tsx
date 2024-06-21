import React from 'react'
import { Label } from '@/components/ui/label'
import SlideOutDivider from '@/pattern/common/molecules/data-display/slide-out-divider'
import { Badge } from '@/components/ui/badge'
import Divider from '@/pattern/common/atoms/icons/divider'

interface IProps {
  accountName: string
  accountNumber: string
  bankName: string
}

const PaymentInformation = ({
  accountName,
  accountNumber,
  bankName,
}: IProps) => {
  return (
    <div className='w-full min-h-[273p] h-fit space-y-[20px] px-6 pt-6 pb-10 bg-[#F4F6F8] rounded-[8px]'>
      <SlideOutDivider width='63.5' color='#CBD5E1'>
        <Badge
          variant='accent'
          className='min-h-[24px] min-w-[139p] rounded-[10px]'
        >
          Payment Information
        </Badge>
      </SlideOutDivider>

      <div className='w-full flex flex-col space-y-[12px] bg-white rounded-xl p-4 text-sm font-medium'>
        {/* Account Name */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='accountName'>Account Name:</Label>
          <div id='accountName' className='text-[#2A2E33]'>
            {accountName}
          </div>
        </div>

        {/* Account Number */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='accountNumber'>Account Number:</Label>
          <div id='accontNumber' className='text-[#2A2E33]'>
            {accountNumber}
          </div>
        </div>

        {/* Bank Name */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='bankName'>Bank Name:</Label>
          <div id='bankName' className='text-[#2A2E33]'>
            {bankName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentInformation
