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
        "#b7ab3b",
        "#be0719",
        "#051a00",
        "#03f2c2",
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
    <div className="w-[300px]">
      <Chart
        type="donut"
        options={options}
        series={options.series}
        // height={300}
      />
    </div>
  );
};

export default PieGraph;
