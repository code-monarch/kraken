import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";

const OverviewMetricGrid = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Users Metric */}
      <DashboardMetricCard
        metric='Total Revenue'
        metricPercentage='10'
        metricValue='10,000'
      />
      {/* Total Agent Earnings */}
      <DashboardMetricCard
        metric='Total Agent Earnings'
        metricPercentage='10'
        metricValue='4,876.00'
      />
      {/* Total Number of transactions */}
      <DashboardMetricCard
        metric='Total No. of transactions'
        metricPercentage='10'
        metricValue='5,687'
        isAmount={false}
      />
    </div>
  );
};

export default OverviewMetricGrid;
