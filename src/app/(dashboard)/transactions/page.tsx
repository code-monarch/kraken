"use client";
import React from "react";
import PageHeader from "@/pattern/common/molecules/data-display/page-header";
import TransactionMetricGrid from "@/pattern/transactions/organisms/transaction-metric-grid";
import TransactionsTableTemplate from "@/pattern/transactions/templates/transactions-table-template";
import TransactionFeesBanner from "@/pattern/super-admin/organisms/transaction-fees-banner";
import { USER_ROLE } from "@/lib/constants";
import Hidden from "@/pattern/common/molecules/data-display/hidden";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const TransactionsPage = () => {
  const adminRole = useSelector(
    (state: RootState) => state.userDetails.adminRole
  );
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
