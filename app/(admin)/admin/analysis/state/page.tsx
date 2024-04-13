import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import { IAnalysisParams } from "../page";
import DateSearch from "@/components/admin/analysis/DateSearch";
import YearSearch from "@/components/admin/analysis/YearSearch";
import BarGraph from "@/components/admin/analysis/BarGraph";
import PieGraph from "@/components/admin/analysis/PieGraph";
import getPieDataByState from "@/actions/chart/getPieDataByState";
import getBarDataByState from "@/actions/chart/getBarDataByState";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisStatePage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.date) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/state",
      query: { date: "month", year: new Date().getFullYear() },
    });
    redirect(url);
  }

  const barData = await getBarDataByState(searchParams);
  const pieData = await getPieDataByState(searchParams);

  if (!barData || !pieData) {
    return <div>차트 데이터 가져오는 도중 오류발생</div>;
  }

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-2 lg:p-6">
      <div className="flex justify-between">
        <DateSearch />
        <YearSearch />
      </div>
      <div className="flex flex-col lg:flex-row items-center gap-4 mt-4">
        <BarGraph categories={barData.categories} series={barData.series} />
        <PieGraph
          labels={pieData.labels}
          series={pieData.series}
          total={pieData.total}
          colors={pieData.colors}
          showLegend
        />
      </div>
      <div className="mt-4">
        {/* <DataList data={data} searchParams={searchParams} isState /> */}
      </div>
    </div>
  );
};

export default AnalysisStatePage;
