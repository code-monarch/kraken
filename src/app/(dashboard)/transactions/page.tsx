'use client'
import React, { useEffect } from 'react'
import PageHeader from '@/pattern/common/molecules/data-display/page-header'
import TransactionMetricGrid from '@/pattern/transactions/organisms/transaction-metric-grid'
import TransactionsTableTemplate from '@/pattern/transactions/templates/transactions-table-template'
import TransactionFeesBanner from '@/pattern/super-admin/organisms/transaction-fees-banner'
import Hidden from '@/pattern/common/molecules/data-display/hidden'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useSearchParams } from 'next/navigation'
import { TRANSACTION_ID } from '@/lib/constants'
import { show } from '@ebay/nice-modal-react'
import TransactionsSlideOutMenu from '@/pattern/common/templates/slide-out-menu/transactions-slide-out-menu'

const TransactionsPage = () => {
  const adminRole = useSelector(
    (state: RootState) => state.userDetails.adminRole,
  )

  const searchParams = useSearchParams()
  const tranxId = searchParams.get(TRANSACTION_ID)

  // Determines whether Trnsactions slide-out menu is visible when browser's URL includes TRANSACTION_ID query Parameter
  useEffect(() => {
    if (tranxId) {
      show(TransactionsSlideOutMenu, {
        transactionId: tranxId,
      })
    }
  }, [tranxId])

  return (
    <>
      <PageHeader
        pageTitle='Transactions'
        pageDescription='Manage and oversee all users transactions.'
      />
      <TransactionMetricGrid />
      {/* Super Admin Page Header */}
      <Hidden visible={adminRole === 'SUPER_ADMIN'}>
        <TransactionFeesBanner
          depositFees='10'
          withdrawalFees='10'
          cashoutRewards='0.5'
        />
      </Hidden>
      <TransactionsTableTemplate />
    </>
  )
}

export default TransactionsPage
