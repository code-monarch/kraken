import React, { useEffect, useState } from "react";
import {
  ITransaction,
  trxColumns,
} from "@/pattern/common/organisms/tables/columns/transactions-columns";
import { DataTable } from "@/pattern/common/organisms/tables/data-table";
import { PaginationState } from "@tanstack/react-table";
import { fetchTransactions } from "@/lib/fetchTransactions";

const TransactionsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataQuery, setDataQuery] = useState<ITransaction[]>();
  const [pageCount, setPageCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isFetching, setIsFetching] = useState<boolean>();

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchTransactions(pagination);
      // setIsLoading(true);
      setDataQuery(data?.rows);
      setPageCount(data?.pageCount);
    }

    fetchDataAndUpdate();
  }, [pagination]);
  return (
    <div>
      <DataTable
        columns={trxColumns}
        data={dataQuery!}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
      />
    </div>
  );
};

export default TransactionsTable;
