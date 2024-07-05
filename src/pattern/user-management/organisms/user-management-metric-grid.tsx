"use client";
import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";
import { useGetUsersMetricsQuery } from "@/redux/services/users/user-metrics.api-alice";

const UserManagementMetricGrid = () => {
  const { data, isLoading, isSuccess, isFetching, isError } =
    useGetUsersMetricsQuery({
      page: 1,
      pageSize: 5,
    });
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Users */}
      <DashboardMetricCard
        metric='Total Users'
        metricPercentage='10'
        metricValue={data?.data.pagination.totalResults ?? 0}
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Active Pilgrims */}
      <DashboardMetricCard
        metric='Active Users'
        metricPercentage='10'
        metricValue={data?.data.users.active ?? 0}
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
      {/* Active Agents */}
      <DashboardMetricCard
        metric='Active Agents'
        metricPercentage='10'
        metricValue={data?.data.agents.active ?? 0}
        isAmount={false}
        isLoading={isLoading || isFetching}
      />
    </div>
  )
};

export default UserManagementMetricGrid;
