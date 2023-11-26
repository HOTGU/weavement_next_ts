"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IBarGraph {
  categories?: string[];
  series?: any[];
  stacked?: boolean;
  setColorByCategory?: boolean;
}

const BarGraph = ({
  categories,
  series,
  stacked = false,
  setColorByCategory = false,
}: IBarGraph) => {
  const option: ApexOptions = {
    series,
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
      marker: {
        show: setColorByCategory ? false : true,
      },
      y: {
        title: {
          formatter: function (name) {
            if (setColorByCategory) return "";
            return `${name}`;
          },
        },
      },
      fixed: {
        enabled: true,
        position: "topLeft",
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        distributed: setColorByCategory,
        barHeight: "100%",
      },
    },
    legend: {
      show: true,
      position: "right",
    },
  };

  return (
    <Chart type="bar" options={option} series={option.series} height={400} />
  );
};

export default BarGraph;
