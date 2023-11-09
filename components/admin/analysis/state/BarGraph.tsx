"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { StateChartType } from "@/app/(admin)/admin/analysis/state/page";

interface IBarGraph {
  data: StateChartType;
}

const BarGraph = ({ data }: IBarGraph) => {
  const option: ApexOptions = {
    colors: ["#50E7A6", "#3498db"],
    xaxis: {
      categories: data.categories,
      crosshairs: {
        show: true,
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "dark",
      fixed: {
        enabled: true,
        position: "topRight",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
      },
    },
    legend: {
      show: true,
      position: "top",
    },
  };

  const series: ApexAxisChartSeries = [
    {
      name: "문의",
      data: data.series.total,
    },
    { name: "계약", data: data.series.success },
  ];

  return <Chart type="bar" options={option} series={series} height={400} />;
};

export default BarGraph;
