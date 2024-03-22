"use client"
import React from 'react'
import TransactionsTable from '@/pattern/transactions/organisms/transactions-table';
import RecentTransactionsHeader from '../organisms/recent-transactions-header';

const OverviewRecentTransactionsTemplate = () => {
  return (
    <div className='w-full bg-card'>
      <RecentTransactionsHeader />
      <TransactionsTable />
    </div>
  );
}

export default OverviewRecentTransactionsTemplate;