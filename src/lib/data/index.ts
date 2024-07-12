export type intervalType = {
  value: "lastYear" | "thisYear" | "last90Days" | "last30Days" | "last7Days"
}

export const overviewChartToggle: {
  label: string;
  value: intervalType['value'];
}[] = [
    {
      label: "Last 7 days",
      value: "last7Days",
    },
    {
      label: "Last 30 days",
      value: "last30Days",
    },
    {
      label: "Last 90 days",
      value: "last90Days",
    },
    {
      label: "This year",
      value: "thisYear",
    },
    {
      label: "Last Year",
      value: "lastYear",
    },
  ];
