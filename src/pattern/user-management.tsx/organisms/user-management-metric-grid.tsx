import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";

const UserManagementMetricGrid = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Users */}
      <DashboardMetricCard
        metric='Total Users'
        metricPercentage='10'
        metricValue='10000'
        isAmount={false}
      />
      {/* Active Pilgrims */}
      <DashboardMetricCard
        metric='Active Pilgrims'
        metricPercentage='10'
        metricValue='4,000'
        isAmount={false}
      />
      {/* Active Agents */}
      <DashboardMetricCard
        metric='Active Agents'
        metricPercentage='10'
        metricValue='3,562'
        isAmount={false}
      />
    </div>
  );
};

export default UserManagementMetricGrid;
