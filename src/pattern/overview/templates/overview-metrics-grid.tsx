import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";
import React from "react";

const OverviewMetricsGrid = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Users Metric */}
      <DashboardMetricCard
        metricLabel='Total Users'
        metricPercentage='10'
        metricValue='10,000'
      />
      {/* Total Agent Earnings */}
      <DashboardMetricCard
        metricLabel='Total Agent Earnings'
        metricPercentage='10'
        metricValue='4,876.00'
      />
      {/* Total Number of transactions */}
      <DashboardMetricCard
        metricLabel='Total No. of transactions'
        metricPercentage='10'
        metricValue='5,687'
      />
    </div>
  );
};

export default OverviewMetricsGrid;
