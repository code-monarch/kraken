"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import TransactionMetricGrid from "@/pattern/transactions/organisms/transaction-metric-grid";
import TransactionsTableTemplate from "@/pattern/transactions/templates/transactions-table-template";
import TransactionFeesBanner from "@/pattern/super-admin/organisms/transaction-fees-banner";
import { ADMIN_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import LocalStore from "@/lib/helper/storage-manager";

const TransactionsPage = () => {
  const adminRole = LocalStore.getItem({key: ADMIN_ROLE})
  
  return (
    <>
      <PageHeader
        pageTitle='Transactions'
        pageDescription='Manage and oversee all users transactions.'
      />
      <TransactionMetricGrid />
      {/* Super Admin Page Header */}
      <Hidden visible={adminRole === "SUPER_ADMIN"}>
        <TransactionFeesBanner
          depositFees='10'
          withdrawalFees='10'
          exchangeFees='0.5'
        />
      </Hidden>
      <TransactionsTableTemplate />
    </>
  );
};

export default TransactionsPage;
