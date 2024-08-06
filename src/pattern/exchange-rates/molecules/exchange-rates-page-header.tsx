'use client'
import React from 'react'
import PageHeader from '../../common/molecules/data-display/page-header'
import ButtonWithIcon from '../../common/molecules/controls/button-with-icon'
import { show } from '@ebay/nice-modal-react'
import { ExchangeRateNavIcon } from '@/pattern/common/atoms/icons/sidebar-nav/exchange-rate-nav-icon'
import CreateExchangeRateModal from '../organisms/create-exchange-rate-modal'
import { CreateExchangeRateIcon } from '@/pattern/common/atoms/icons/create-exchange-rate-icon'

const ExchangeRatesPageHeader = () => {
  const handleCreateAdmin = () => {
    show(CreateExchangeRateModal)
  }
  
  return (
    <div className='w-full flex items-center justify-between'>
      <PageHeader
        pageTitle='Exchange Rates'
        pageDescription='Manage and oversee all exchange rates'
      />

      <div className='h-[52px] flex items-center gap-4'>
        {/* Create Exchange Rate Modal Trigger */}
        <ButtonWithIcon
          prefixIcon={<CreateExchangeRateIcon />}
          size='sm'
          className='w-[158px] h-full bg-[hsla(151,100%,96%,1)] text-[1.125rem] text-primary hover:bg-[hsla(151,100%,96%,1)] rounded-[6px]'
          onClick={handleCreateAdmin}
        >
          Create Rate
        </ButtonWithIcon>
      </div>
    </div>
  )
}

export default ExchangeRatesPageHeader
