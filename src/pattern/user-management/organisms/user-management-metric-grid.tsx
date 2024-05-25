"use client"
import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";
import { useGetUsersQuery } from "@/redux/services/users/user.api-slice";

const UserManagementMetricGrid = () => {
  const { data, isLoading, isSuccess, isFetching, isError } = useGetUsersQuery({
    page: 1,
    limit: 4,
    status: "",
    startDate: "",
    endDate: "",
  });
  return (
    <div className="w-full grid grid-cols-3 gap-5">
      {/* Total Users */}
      <DashboardMetricCard
        metric="Total Users"
        metricPercentage="10"
        metricValue={data?.data.pagination.totalResults ?? 1000}
        isAmount={false}
      />
      {/* Active Pilgrims */}
      <DashboardMetricCard
        metric="Active Pilgrims"
        metricPercentage="10"
        metricValue={4000}
        isAmount={false}
      />
      {/* Active Agents */}
      <DashboardMetricCard
        metric="Active Agents"
        metricPercentage="10"
        metricValue={3562}
        isAmount={false}
      />
    </div>
  );
};

export default UserManagementMetricGrid;
