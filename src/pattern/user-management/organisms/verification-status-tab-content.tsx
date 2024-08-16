'use client'
import React from 'react'
import PilgrimStatusWidget from '../molecules/pilgrim-status-widget'
import { Badge } from '@/components/ui/badge'
import ButtonWithIcon from '@/pattern/common/molecules/controls/button-with-icon'
import ViewAllCaretIcon from '@/pattern/common/atoms/icons/view-all-caret-icon'
import { show } from '@ebay/nice-modal-react'
import { ChangeVerificationStatusModal } from './change-verification-status-modal'
import { useGetAgentShopStatusQuery } from '@/redux/services/users/change-verification-status.api-slice'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import LoaderLight from '@/pattern/common/atoms/icons/loader-light'

interface IProps {
  kycVerification: string
  agentShopStatus: string
  nationalId: string
  userId: string
}

const VerificationStatusTabContent = ({
  kycVerification,
  agentShopStatus,
  nationalId,
  userId,
}: IProps) => {
  const showChangeVerifStatusModal = () => {
    show(ChangeVerificationStatusModal, {
      id: userId,
      status: agentShopStatus,
    })
  }
  
  return (
    <div className='w-[583px] flex flex-col gap-y-4'>
      {/* Header */}
      <div className='w-full flex items-center justify-between py-3 border-b rounded-[8px]'>
        <span className='text-[hsla(215,16%,47%,1)] text-[1.125rem] font-medium'>
          Change Agent Shop Status:
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
          {agentShopStatus}
        </ButtonWithIcon>
      </div>

      <PilgrimStatusWidget label='National ID:' value={nationalId} />
      <PilgrimStatusWidget
        label='Verification Status:'
        value={
          <Badge
            variant={kycVerification ? 'completed' : 'pending'}
            className='h-[32px] text-base'
          >
            {kycVerification}
          </Badge>
        }
      />
      <PilgrimStatusWidget label='Documents Status:' comment={'Nil'} />
    </div>
  )
}

export default VerificationStatusTabContent
