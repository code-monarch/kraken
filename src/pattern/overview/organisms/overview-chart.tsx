"use client";
import React from "react";
import dynamic from 'next/dynamic'
import { ApexOptions } from "apexcharts";
import numbro from "numbro";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
})

export const OVERVIEW_CHART_LEGEND = [
  { label: "Deposit", color: "#CBD5E1" },
  { label: "Withdrawal", color: "#39CD86" },
  { label: "Deposit", color: "#08C168" },
];

const OverviewChart = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 32,
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#E2E8F0",
      strokeDashArray: 3,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    legend: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      categories: [
        "12/01/2024 GMT",
        "01/01/2024 GMT",
        "02/01/2024 GMT",
        "03/01/2024 GMT",
        "04/01/2024 GMT",
        "05/01/2024 GMT",
        "06/01/2024 GMT",
        "07/01/2024 GMT",
        "08/01/2024 GMT",
        "09/01/2024 GMT",
        "10/01/2024 GMT",
        "11/01/2024 GMT",
      ],
      position: "bottom",
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: false,
        hideOverlappingLabels: true,
        showDuplicates: false,
        trim: false,
        minHeight: undefined,
        maxHeight: 120,
        style: {
          colors: "#7D8494",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 500,
        },
        offsetX: 0,
        offsetY: 0,
        format: undefined,
        formatter: undefined,
        datetimeUTC: true,
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },

      title: {
        text: undefined,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 600,
        },
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: "16px",
          fontFamily: "inherit",
        },
      },
    },
    yaxis: {
      show: true,
      logBase: 10,
      stepSize: 100,
      forceNiceScale: true,
      decimalsInFloat: 2,
      labels: {
        show: true,
        align: "left",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: "#7D8494",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 500,
        },
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        formatter: (value: any) => {
          return numbro(value).format({
            thousandSeparated: true,
            spaceSeparated: true,
            average: true,
            totalLength: 2,
          });
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      title: {
        text: undefined,
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: "#7D8494",
          fontSize: "12px",
          fontFamily: "inherit",
          fontWeight: 500,
        },
      },
      crosshairs: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    colors: ["#08C168", "#39CD86", "#E2E8F0"],
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      style: {
        fontFamily: "inherit",
      },
    },
  };
  const series = [
    {
      name: "Deposit",
      data: [388, 160, 420, 500, 275, 230, 400, 220, 150, 600, 180, 150],
    },
    {
      name: "Withdrawal",
      data: [439, 390, 315, 430, 390, 310, 330, 300, 300, 200, 340, 200],
    },
    {
      name: "Deposit",
      data: [290, 400, 298, 378, 450, 400, 290, 460, 200, 250, 230, 300],
    },
  ];

  return (
    <div className='h-fit w-full max-w-[1200px]'>
      <Chart
        options={options}
        series={series}
        type='bar'
        width='100%'
        height='187'
      />
    </div>
  );
};

export default OverviewChart;
