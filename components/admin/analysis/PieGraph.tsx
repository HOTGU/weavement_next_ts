"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IGraph {
  series: number[];
  labels: string[];
  total: number;
  colors?: string[];
}

const PieGraph = ({ series, labels, total, colors }: IGraph) => {
  const colorsArr = colors
    ? colors
    : [
        "#F97F51",
        "#1B9CFC",
        "#3B3B98",
        "#8e44ad",
        "#2c3e50",
        "#58B19F",
        "#FC427B",
        "#6D214F",
        "#CAD3C8",
      ];

  const options: ApexOptions = {
    series,
    labels,
    colors: colorsArr,
    legend: {
      show: true,
      position: "top",
    },
    dataLabels: {
      formatter(val: number, opts) {
        // const count = opts.w.globals.seriesTotals[opts.seriesIndex];
        return `${val.toFixed(1)}%`;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "총문의",
              fontSize: "14",
              formatter: function (w) {
                return `${total}`;
              },
            },
          },
        },
      },
    },
  };

  return (
    <div>
      <Chart
        type="donut"
        options={options}
        series={options.series}
        height={400}
      />
    </div>
  );
};

export default PieGraph;
