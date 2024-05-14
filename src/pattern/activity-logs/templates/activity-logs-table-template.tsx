"use client";
import React, { useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { fetchTransactions } from "@/lib/fetchTransactions";
import { fetchData } from "@/lib/fetchData";
import ActivityLogsTableTemplateHeader from "../organisms/activity-logs-table-template-header";
import { ActivityLogsTable } from "../organisms/activity-logs-table";
import {
  ActivityLogsColumns,
  // IActivity,
} from "../molecules/activity-logs-table-column";
import { IActivity } from "@/redux/services/activity-logs/activities.api-slice";
import { useGetActivitiesQuery } from "@/redux/services/activity-logs/activities.api-slice";

const ActivityLogsTableTemplate = () => {
  const {
    data,
    isLoading: isActivitiesLoading,
    isSuccess,
    isError,
  } = useGetActivitiesQuery();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [dataQuery, setDataQuery] = useState<IActivity[]>();
  const [pageCount, setPageCount] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>();

  // useEffect(() => {
  //   async function fetchDataAndUpdate() {
  //     const data = await fetchData(pagination);
  //     setIsLoading(true);
  //     if (data) {
  //       setIsLoading(false);
  //       setDataQuery(data?.rows);
  //       setPageCount(data?.pageCount);
  //     }
  //   }

  //   fetchDataAndUpdate();
  // }, [pagination]);
  return (
    <div className="w-full bg-card">
      <ActivityLogsTableTemplateHeader />
      <ActivityLogsTable
        columns={ActivityLogsColumns}
        data={data!}
        isLoading={isActivitiesLoading}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default ActivityLogsTableTemplate;
