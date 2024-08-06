'use client'
import React from 'react'
import ExchangeRatesTableTemplate from '@/pattern/exchange-rates/templates/exchange-rates-table-template'
import ExchangeRatesPageHeader from '@/pattern/exchange-rates/molecules/exchange-rates-page-header'

const ExchangeRatesPage = () => {
  return (
    <>
      <ExchangeRatesPageHeader />

      <ExchangeRatesTableTemplate />
    </>
  )
}

export default ExchangeRatesPage
