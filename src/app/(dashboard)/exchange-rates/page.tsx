'use client'
import React from 'react'
import PageHeader from '@/pattern/common/molecules/data-display/page-header'
import ExchangeRatesTableTemplate from '@/pattern/exchange-rates/templates/exchange-rates-table-template'

const ExchangeRatesPage = () => {
  return (
    <>
      <PageHeader
        pageTitle='Exchange Rates'
        pageDescription='Manage and oversee all exchange rates'
      />

      <ExchangeRatesTableTemplate />
    </>
  )
}

export default ExchangeRatesPage
