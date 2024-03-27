"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import TransactionMetricGrid from "@/pattern/transactions/organisms/transaction-metric-grid";
import TransactionsTableTemplate from "@/pattern/transactions/templates/transactions-table-template";

const TransactionsPage = () => {
  return (
    <>
      <PageHeader
        pageTitle='Transactions'
        pageDescription='Manage and oversee all users transactions.'
      />
      <TransactionMetricGrid />
      <TransactionsTableTemplate />
    </>
  );
};

export default TransactionsPage;
