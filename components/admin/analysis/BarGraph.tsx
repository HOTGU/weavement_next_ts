"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IBarGraph {
  categories?: string[];
  series?: any[];
  stacked?: boolean;
  date?: "month" | "quarter";
}

const BarGraph = ({ date, categories, series, stacked = false }: IBarGraph) => {
  const option: ApexOptions = {
    colors: [
      "#F97F51",
      "#1B9CFC",
      "#3B3B98",
      "#8e44ad",
      "#2c3e50",
      "#58B19F",
      "#FC427B",
      "#6D214F",
      "#CAD3C8",
    ],
    xaxis: {
      categories,
      labels: {
        formatter(value) {
          if (date) {
            const string = date === "month" ? "월" : "분기";
            return `${value}${string}`;
          }
          return `${value}`;
        },
      },
      crosshairs: {
        show: true,
      },
    },
    chart: {
      stacked,
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

  return <Chart type="bar" options={option} series={series} height={400} />;
};

export default BarGraph;
