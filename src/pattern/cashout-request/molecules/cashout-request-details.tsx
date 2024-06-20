import React from 'react'
import { Label } from '@/components/ui/label'
import { formatNumber } from '@/lib/helper/format-number'

interface IProps {
  amount: number
  accountName: string
  accountNumber: string
  bankName: string
}

const CashoutRequestDetails = ({
  amount,
  accountName,
  accountNumber,
  bankName,
}: IProps) => {
  return (
    <div className='w-full min-h-[273px] h-fit space-y-[20px] py-4'>
      <div>
        <h4 className='min-h-[24px] min-w-[139px] rounded-[10px] font-semibold text-[#4F627D]'>
          Request details
        </h4>
      </div>

      <div className='w-full flex flex-col space-y-[12px] bg-[#F4F6F8] rounded-xl px-4 pt-4 pb-6'>
        {/* Amount */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='amount' className='text-[#2A2E33]'>
            Amount Requested:
          </Label>
          <div className='flex flex-col items-end'>
            <span id='amount' className='font-medium'>
              {formatNumber({
                number: amount,
                mantissa: 2,
              })}
              NGN
            </span>
            <span id='amount' className='text-xs font-medium text-[#6D7786]'>
              {formatNumber({
                number: amount,
                mantissa: 2,
              })}
              SAR
            </span>
          </div>
        </div>

        {/* Account Name */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='accountName' className='text-[#2A2E33]'>
            Account Name:
          </Label>
          <div id='accountName' className='font-medium'>
            {accountName}
          </div>
        </div>

        {/* Account Number */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='accountNumber' className='text-[#2A2E33]'>
            Account Number:
          </Label>
          <div id='accontNumber' className='font-medium'>
            {accountNumber}
          </div>
        </div>

        {/* Bank Name */}
        <div className='w-full flex items-start justify-between'>
          <Label htmlFor='bankName' className='text-[#2A2E33]'>
            Bank Name:
          </Label>
          <div id='bankName' className='font-medium'>
            {bankName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashoutRequestDetails
