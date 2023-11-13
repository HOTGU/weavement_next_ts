"use client";

import { IChartDataTypes } from "@/app/(admin)/admin/analysis/page";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IGraph {
  data: IChartDataTypes;
  isState?: boolean;
}

const PieGraph = ({ data, isState }: IGraph) => {
  const total = useMemo(() => {
    let sum = 0;

    if (isState) {
      data.series.map((item) => {
        if (item.name === "문의") {
          item.data.map((number) => (sum += number));
        }
      });
      return sum;
    }

    data.series.map((item) => {
      item.data.map((number) => (sum += number));
    });
    return sum;
  }, []);

  const series = useMemo(() => {
    if (isState) {
      let success = 0;

      data.series.map((item) => {
        if (item.name === "계약") {
          item.data.map((number) => (success += number));
        }
      });

      const fail = total - success;
      return [fail, success];
    }

    return data.series.map((item) =>
      item.data.reduce((sumValue, currentValue) => sumValue + currentValue)
    );
  }, []);

  const labels = useMemo(() => {
    if (isState) {
      return ["불발", "계약"];
    }

    return data.series.map((item) => item.name);
  }, []);

  const colors = useMemo(() => {
    if (isState) {
      return ["#f95151", "#1B9CFC"];
    }

    return [
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
  }, []);

  const options: ApexOptions = {
    series,
    labels,
    colors,
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
