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
      "#F8EFBA",
      "#58B19F",
      "#2C3A47",
      "#6D214F",
      "#182C61",
      "#FC427B",
      "#BDC581",
      "#82589F",
      "#25CCF7",
      "#EAB543",
      "#CAD3C8",
      "#9AECDB",
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
      position: "top",
    },
  };

  return (
    <div className="flex-1 w-full">
      <Chart type="bar" options={option} series={option.series} height={350} />
    </div>
  );
};

export default BarGraph;
