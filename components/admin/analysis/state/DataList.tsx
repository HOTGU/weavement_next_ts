// "use client";

import { IStateChartParams } from "@/actions/db/getBarDataByState";
import { StateChartType } from "@/app/(admin)/admin/analysis/state/page";
import React from "react";

interface IBarGraph {
  data: StateChartType;
  searchParams: IStateChartParams;
}

const DataList = ({ searchParams, data }: IBarGraph) => {
  const date = searchParams?.date;
  const total = data.series.total;
  const success = data.series.success;

  let list = new Array();

  for (let i = 0; i < total.length; i++) {
    list.push({ total: total[i], success: success[i] });
  }

  return (
    <div>
      <div className="flex text-lg border-b pb-5">
        <span className="flex-1">{date === "month" ? `월` : `분기`}</span>
        <span className="w-[150px] text-right">총</span>
        <span className="w-[150px] text-right">계약</span>
        <span className="w-[150px] text-right">불발</span>
        <span className="w-[150px] text-right">계약률</span>
      </div>
      {list.map((item, i: number) => {
        return (
          <div key={i} className="flex text-base mt-5">
            <span className="flex-1">
              {date === "month" ? `${i + 1}월` : `${i + 1}분기`}
            </span>
            <span className="w-[150px] text-right">{item.total}건</span>
            <span className="w-[150px] text-right">{item.success}건</span>
            <span className="w-[150px] text-right">
              {item.total - item.success}건
            </span>
            <span className="w-[150px] text-right">
              {item.total / item.success
                ? `${(item.success / item.total).toFixed(2)}%`
                : "-"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DataList;
