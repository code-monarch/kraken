import React from 'react'
import OverviewMetricData from '../molecules/overview-metric-data';

const overviewMetric = [
  {
    metric: "Total Users",
    metricValue: "10000",
    metricPercentage: "10",
  },
  {
    metric: "Active Pilgrims",
    metricValue: "4000",
    metricPercentage: "10",
  },
  {
    metric: "Active Agents",
    metricValue: "3562",
    metricPercentage: "10",
  },
];

const OverviewMetricCard = () => {
  return (
    <div className='h-full bg-white space-y-[20px] pt-4 px-5 pb-6 border border-border rounded-[12px]'>
      {overviewMetric.map(({ metric, metricPercentage, metricValue }, idx) => (
        <OverviewMetricData
          key={idx}
          metric={`${metric}`}
          metricPercentage={`${metricPercentage}`}
          metricValue={`${metricValue}`}
        />
      ))}
    </div>
  );
}

export default OverviewMetricCard