'use client'
import React from 'react'
import PageHeader from '@/pattern/common/molecules/data-display/page-header'
import CashOutRequestMetricGrid from '../organisms/cash-out-request-metric-grid'
import CashOutRequestTemplateTabs from './cash-out-request-template-tabs'

const CashOutRequestPageTemplate = () => {
  return (
    <div className='w-full h-full space-y-[20px]'>
      <PageHeader
        pageTitle='Cash-out request'
        pageDescription='Monitor and manage all cash-out requests submitted by agents. Review, approve, or decline requests to ensure smooth operations.'
      />

      <CashOutRequestMetricGrid />
      
      <CashOutRequestTemplateTabs />
    </div>
  )
}

export default CashOutRequestPageTemplate
