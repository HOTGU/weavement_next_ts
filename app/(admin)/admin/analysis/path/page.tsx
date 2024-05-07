import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import { IAnalysisParams } from "../page";
import YearSearch from "@/components/admin/analysis/YearSearch";
import PieGraph from "@/components/admin/analysis/PieGraph";
import BarGraph from "@/components/admin/analysis/BarGraph";
import getBarDataByPath from "@/actions/chart/getBarDataByPath";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisPathPage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.year) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/path",
      query: { year: new Date().getFullYear() },
    });
    redirect(url);
  }

  const barData = await getBarDataByPath(searchParams);

  if (!barData) return <div>데이터 가져오는 도중 에러발생</div>;

  const seriesDataArr = barData.series[0].data;
  const pieData = {
    labels: barData.categories,
    series: seriesDataArr,
    total: seriesDataArr.reduce(
      (sumValue, currentValue) => sumValue + currentValue
    ),
  };

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-2 lg:p-6">
      <div className="flex justify-between">
        <div></div>
        <YearSearch />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
        <BarGraph
          categories={barData.categories}
          series={barData.series}
          setColorByCategory
        />
        <PieGraph
          labels={pieData.labels}
          total={pieData.total}
          series={pieData.series}
        />
      </div>
      <div className="mt-4">
        {/* <DataList data={data} searchParams={searchParams} /> */}
      </div>
    </div>
  );
};

export default AnalysisPathPage;
