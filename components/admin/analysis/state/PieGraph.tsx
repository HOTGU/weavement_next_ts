"use client";

import { StateChartType } from "@/app/(admin)/admin/analysis/state/page";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IGraph {
  data: StateChartType;
}

const PieGraph = ({ data }: IGraph) => {
  const totalSum = data.series.total.reduce((sumValue, currentValue) => {
    return sumValue + currentValue;
  });

  const successSum = data.series.success.reduce((sumValue, currentValue) => {
    return sumValue + currentValue;
  });

  const options: ApexOptions = {
    series: [successSum, totalSum - successSum],
    labels: ["계약", "불발"],
    colors: ["#3498db", "#eb4d4b"],
    legend: {
      show: true,
      position: "top",
    },
    dataLabels: {
      formatter(val: number, opts) {
        const count = opts.w.globals.seriesTotals[opts.seriesIndex];
        return `${val.toFixed(2)}%(${count})`;
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
                return w.globals.seriesTotals.reduce((a: number, b: number) => {
                  return a + b;
                }, 0);
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
