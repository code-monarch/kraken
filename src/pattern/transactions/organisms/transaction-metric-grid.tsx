import React from "react";
import DashboardMetricCard from "@/pattern/common/organisms/dashboard-metric-card";

const TransactionMetricGrid = () => {
  return (
    <div className='w-full grid grid-cols-3 gap-5'>
      {/* Total Transactions */}
      <DashboardMetricCard
        metric='Total Transactions'
        metricPercentage='10'
        metricValue= {10000}
        isAmount={false}
      />
      {/* Total Amount Transacted */}
      <DashboardMetricCard
        metric='Total Amount Transacted'
        metricPercentage='10'
        metricValue={200000}
        isAmount={true}
      />
      {/* Average Transaction Amount */}
      <DashboardMetricCard
        metric='Average Transaction Amount'
        metricPercentage='10'
        metricValue={133.33}
        isAmount={true}
      />
    </div>
  );
};

export default TransactionMetricGrid;
