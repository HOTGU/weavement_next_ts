"use client";

import { IAnalysisParams } from "@/app/(admin)/admin/analysis/page";
import { IChartDataTypes } from "@/app/(admin)/admin/analysis/page";
import React, { useMemo } from "react";

interface IBarGraph {
  data: IChartDataTypes;
  searchParams: IAnalysisParams;
  isState?: Boolean;
}

const DataList = ({ searchParams, data, isState }: IBarGraph) => {
  const date = searchParams?.date;

  const type = useMemo(() => {
    const list = [];
    let name = "";
    if (date === "month") {
      name = "월별";
      for (let i = 0; i < 12; i++) {
        list.push(`${i + 1}월`);
      }
    }
    if (date === "quarter") {
      name = "분기별";
      for (let i = 0; i < 4; i++) {
        list.push(`${i + 1}분기`);
      }
    }
    return { name, list };
  }, [date]);

  const list = useMemo(() => {
    const arr = new Array();

    for (let i = 0; i < type.list.length; i++) {
      const dataOfDate = data.series.map((item) => item.data[i]);
      arr.push(dataOfDate);
    }

    return arr;
  }, [date]);

  const labels = useMemo(() => {
    return data.series.map((item) => item.name);
  }, []);

  return (
    <div className="space-y-4 mt-10">
      <div className="flex text-neutral-500 border-b pb-4 text-left">
        <div className="flex-1">{type.name}</div>
        {labels.map((label) => (
          <div key={label} className="w-24">
            {label}
          </div>
        ))}
        {isState && (
          <>
            <div className="w-24">불발</div>
            <div className="w-24">계약률</div>
          </>
        )}
      </div>
      {list.map((item, index) => (
        <div className="flex text-left text-neutral-500">
          <div className="flex-1">{type.list[index]}</div>
          {item.map((count: number, index: number) => (
            <div className="w-24" key={index}>
              {count}
            </div>
          ))}
          {isState && (
            <>
              <div className="w-24">{item[0] - item[1]}</div>
              <div className="w-24">
                {item[1] / item[0]
                  ? `${((item[1] / item[0]) * 100).toFixed(1)}%`
                  : "-"}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default DataList;
