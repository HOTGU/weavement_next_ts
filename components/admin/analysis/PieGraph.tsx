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
  showLegend?: boolean;
}

const PieGraph = ({
  series,
  labels,
  total,
  colors,
  showLegend = false,
}: IGraph) => {
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
      show: showLegend,
      position: "top",
    },
    dataLabels: {
      formatter(val: number, opts) {
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
              label: "합계",
              fontSize: "16",
              color: "black",
              fontWeight: "800",
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
        height={300}
      />
    </div>
  );
};

export default PieGraph;
