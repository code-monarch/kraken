"use client";
import React, { useState, useEffect, useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";
import ActivityLogsTableTemplateHeader from "../organisms/activity-logs-table-template-header";
import { ActivityLogsTable } from "../organisms/activity-logs-table";
import {
  ActivityLogsColumns,
  // IActivity,
} from "../molecules/activity-logs-table-column";
import { useGetActivitiesQuery } from "@/redux/services/activity-logs/activities.api-slice";
import { DateRange } from "react-day-picker";

const ActivityLogsTableTemplate = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [pageCount, setPageCount] = useState<number>(1);
  const [status, setStatus] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetActivitiesQuery({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
      status: status === "all" ? "" : status,
      type: type === "all" ? "" : type,
      startDate: startDate,
      endDate: endDate,
    });

  useEffect(() => {
    if (data && data.data) {
      setPageCount(data.data.pagination.totalPages);
    }
  }, [data]);

  const sortedData = useMemo(() => {
    let result = data?.data.result

    if (data?.data.result && order === 'descending') {
      result = [...data?.data.result].sort((a, b) => {
        return b.type.localeCompare(a.type)
      })
    } else if (data?.data.result && order === 'ascending') {
      result = [...data?.data.result].sort((a, b) => {
        return a.type.localeCompare(b.type)
      })
    }

    return result
  }, [data, order])

  return (
    <div className='w-full bg-card'>
      <ActivityLogsTableTemplateHeader
        filterString={type}
        setFilterString={setType}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setActivityType={setType}
        setActivityStatus={setStatus}
        setOrder={setOrder}
      />
      <ActivityLogsTable
        columns={ActivityLogsColumns}
        data={sortedData!}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isSuccess={isSuccess}
        pageCount={pageCount}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default ActivityLogsTableTemplate;
