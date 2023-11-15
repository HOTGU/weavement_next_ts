import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import { IAnalysisParams } from "../page";
import PieGraph from "@/components/admin/analysis/PieGraph";
import YearSearch from "@/components/admin/analysis/YearSearch";
import BarGraph from "@/components/admin/analysis/BarGraph";
import DataList from "@/components/admin/analysis/DataList";
import getBarDataByMaterial from "@/actions/chart/getBarDataByMaterial";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisMaterialPage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.year) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/material",
      query: { year: 2023 },
    });
    redirect(url);
  }

  const barData = await getBarDataByMaterial(searchParams);
  // console.log(data);

  if (!barData) return <div>차트 데이터 가져오는 도중 오류발생</div>;
  const seriesDataArr = barData.series[0].data;
  const pieData = {
    labels: barData.categories,
    series: seriesDataArr,
    total: seriesDataArr.reduce(
      (sumValue, currentValue) => sumValue + currentValue
    ),
  };

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-6">
      <div className="flex justify-between">
        <div />
        <YearSearch />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-3/4">
          <BarGraph
            categories={barData.categories}
            series={barData.series}
            setColorByCategory={true}
          />
        </div>
        <div className="w-1/4 h-full">
          <PieGraph
            labels={pieData.labels}
            series={pieData.series}
            total={pieData.total}
          />
        </div>
      </div>
      <div className="mt-4">
        {/* <DataList data={data} searchParams={searchParams} /> */}
      </div>
    </div>
  );
};

export default AnalysisMaterialPage;
