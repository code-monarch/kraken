"use client"
import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";

const SuperAdminOverviewMetricGrid = () => {
  return (
    <div className='w-full grid grid-cols-4 gap-5'>
      {/* Total Users Metric */}
      <DashboardMetricCard
        metric='Total Revenue'
        metricPercentage='10'
        metricValue={10000}
      />
      {/* Total Agent Earnings */}
      <DashboardMetricCard
        metric='Total Agent Earnings'
        metricPercentage='10'
        metricValue= {4876.00}
      />
      {/* Total Number of transactions */}
      <DashboardMetricCard
        metric='Total No. of transactions'
        metricPercentage='10'
        metricValue= {5687}
        isAmount={false}
      />
      {/* Total Admin */}
      <DashboardMetricCard
        metric='Total Admin'
        metricPercentage='10'
        metricValue= {5687}
        hideMetricPercentage={true}
        isAmount={false}
      />
    </div>
  );
};

export default SuperAdminOverviewMetricGrid;
