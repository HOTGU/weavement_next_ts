import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import { IAnalysisParams } from "../page";
import DateSearch from "@/components/admin/analysis/DateSearch";
import PieGraph from "@/components/admin/analysis/PieGraph";
import YearSearch from "@/components/admin/analysis/YearSearch";
import BarGraph from "@/components/admin/analysis/BarGraph";
import DataList from "@/components/admin/analysis/DataList";
import getBarDataByPlatform from "@/actions/chart/getBarDataByPlatform";
import getPieDataByPlatform from "@/actions/chart/getPieDataByPlatform";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisPathPage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.date) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/platform",
      query: { date: "month", year: 2023 },
    });
    redirect(url);
  }
  const barData = await getBarDataByPlatform(searchParams);
  const pieData = await getPieDataByPlatform(searchParams);

  if (!barData || !pieData) {
    return <div>차트 데이터 가져오는 도중 오류발생</div>;
  }

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-6">
      <div className="flex justify-between">
        <DateSearch />
        <YearSearch />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-3/4">
          <BarGraph
            categories={barData.categories}
            series={barData.series}
            stacked
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

export default AnalysisPathPage;
