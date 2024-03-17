import React, { useEffect, useState } from "react";
import { DataTable } from "@/pattern/common/organisms/tables/data-table";
import { IActivity, activityLogsColumns } from "@/pattern/common/organisms/tables/columns/activity-logs-columns";
import { PaginationState } from "@tanstack/react-table";
import { fetchData } from "../../../lib/fetchData";

const ActivityLogsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  console.log("paginationIndex: ", pagination.pageIndex);

  const [dataQuery, setDataQuery] = useState<IActivity[]>();
  const [pageCount, setPageCount] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [isFetching, setIsFetching] = useState<boolean>();

  useEffect(() => {
    async function fetchDataAndUpdate() {
      const data = await fetchData(pagination);
      // setIsLoading(true);
      setDataQuery(data?.rows);
      setPageCount(data?.pageCount);
    }

    fetchDataAndUpdate();

  }, [pagination]);

  return (
    <div>
      <DataTable
        columns={activityLogsColumns}
        data={dataQuery!!}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ActivityLogsTable;
