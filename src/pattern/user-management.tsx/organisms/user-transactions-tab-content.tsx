"use client";
import React, { useEffect, useState } from "react";
import { TransactionsTable } from "@/pattern/transactions/organisms/transactions-table";
import { PaginationState } from "@tanstack/react-table";
import {
  Transactions,
  TransactionsTableColumns,
} from "@/pattern/transactions/molecules/transactions-table-column";
import { fetchTransactions } from "@/lib/fetchTransactions";
import TransactionsTableTemplateHeader from "@/pattern/transactions/organisms/transactions-table-template-header";

const UserTransactionsTabContent = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataQuery, setDataQuery] = useState<Transactions[]>();
  const [pageCount, setPageCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchTransactions(pagination);
      setIsLoading(true);
      if (data) {
        setIsLoading(false);
        setDataQuery(data?.rows);
        setPageCount(data?.pageCount);
      }
    }

    fetchDataAndUpdate();
  }, [pagination]);
  return (
    <div className='w-full bg-card'>
      <TransactionsTableTemplateHeader />
      <TransactionsTable
        columns={TransactionsTableColumns}
        data={dataQuery!}
        isLoading={isLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default UserTransactionsTabContent;
