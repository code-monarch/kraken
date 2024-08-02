export type intervalType = {
  value: "yearly" | "weekly"
}

export const overviewChartToggle: {
  label: string;
  value: intervalType['value'];
}[] = [
    {
      label: "yearly",
      value: "yearly",
    },
    {
      label: "weekly",
      value: "weekly",
    }
  ];
