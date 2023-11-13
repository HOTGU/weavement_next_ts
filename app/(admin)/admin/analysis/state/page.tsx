import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import getChartDataByState from "@/actions/db/getChartDataByState";
import DateSearch from "@/components/admin/analysis/DateSearch";
// import PieGraph from "@/components/admin/analysis/state/PieGraph";
import DataList from "@/components/admin/analysis/DataList";
import YearSearch from "@/components/admin/analysis/YearSearch";
import { IAnalysisParams } from "../page";
import BarGraph from "@/components/admin/analysis/BarGraph";
import PieGraph from "@/components/admin/analysis/PieGraph";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisStatePage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.date) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/state",
      query: { date: "month", year: 2023 },
    });
    redirect(url);
  }
  const data = await getChartDataByState(searchParams);

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-6">
      <div className="flex justify-between">
        <DateSearch />
        <YearSearch />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-3/4">
          <BarGraph data={data} />
        </div>
        <div className="w-1/4 h-full">
          <PieGraph data={data} isState />
        </div>
      </div>
      <div className="mt-4">
        <DataList data={data} searchParams={searchParams} isState />
      </div>
    </div>
  );
};

export default AnalysisStatePage;
