"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface IBarGraph {
  categories?: string[];
  series?: any[];
  total?: number[];
}

const LineGraph = ({ categories, series, total }: IBarGraph) => {
  const hasTotal = total && total.length > 0;
  const tooltip: ApexOptions["tooltip"] = hasTotal
    ? {
        shared: true,
        intersect: false,
        theme: "dark",

        custom: function ({ dataPointIndex, w }) {
          const category = categories?.[dataPointIndex] ?? "";
          const totalCount = total[dataPointIndex] ?? 0;

          let html = `
          <div style="
            padding: 12px 14px;
            min-width: 160px;
          ">
            <div style="
              font-weight: 600;
              margin-bottom: 8px;
              font-size: 14px;
            ">
              ${category}
            </div>
        `;

          w.globals.seriesNames.forEach((name: string, seriesIndex: number) => {
            const value = w.globals.series[seriesIndex][dataPointIndex];

            if (value > 0) {
              html += `
                <div style="
                  display: flex;
                  justify-content: space-between;
                  gap: 20px;
                  font-size: 13px;
                  margin-top: 4px;
                ">
                  <span>${name}</span>
                  <strong>${value}건</strong>
                </div>
              `;
            }
          });

          html += `
            <div style="
              border-top: 1px solid rgba(255,255,255,0.2);
              margin-top: 10px;
              padding-top: 8px;
              display: flex;
              justify-content: space-between;
              font-weight: 700;
            ">
              <span>총 문의</span>
              <span>${totalCount}건</span>
            </div>
          </div>
        `;

          return html;
        },
      }
    : {
        shared: true,
        intersect: false,
        theme: "dark",

        y: {
          formatter: (value) => `${value}건`,
        },
      };
  const option: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    series,

    xaxis: {
      categories,
    },

    stroke: {
      curve: "straight",
      width: 3,
    },

    markers: {
      size: 4,
    },

    dataLabels: {
      enabled: false,
    },

    legend: {
      position: "top",
    },

    tooltip,
    colors: [
      "#F97F51",
      "#1B9CFC",
      "#58B19F",
      "#FC427B",
      "#82589F",
      "#25CCF7",
      "#EAB543",
      "#2C3A47",
      "#6D214F",
      "#182C61",
      "#BDC581",
      "#b7ab3b",
    ],
  };

  return (
    <div className="flex-1 w-full">
      <Chart type="line" options={option} series={option.series} height={350} />
    </div>
  );
};

export default LineGraph;
