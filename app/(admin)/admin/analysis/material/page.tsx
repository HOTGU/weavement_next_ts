import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import DateSearch from "@/components/admin/analysis/DateSearch";
import PieGraph from "@/components/admin/analysis/PieGraph";
import YearSearch from "@/components/admin/analysis/YearSearch";
import { IAnalysisParams } from "../page";
import BarGraph from "@/components/admin/analysis/BarGraph";
import DataList from "@/components/admin/analysis/DataList";

interface AnalysisParams {
  searchParams: IAnalysisParams;
}

const AnalysisMaterialPage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.date) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/material",
      query: { date: "month", year: 2023 },
    });
    redirect(url);
  }
  // console.log(data);

  return (
    <div className="flex-1 bg-neutral-50 rounded-lg p-6">
      <div className="flex justify-between">
        <DateSearch />
        <YearSearch />
      </div>
      <div className="flex items-center gap-4 mt-4">
        <div className="w-3/4">{/* <BarGraph data={data} /> */}</div>
        <div className="w-1/4 h-full">{/* <PieGraph data={data} /> */}</div>
      </div>
      <div className="mt-4">
        {/* <DataList data={data} searchParams={searchParams} /> */}
      </div>
    </div>
  );
};

export default AnalysisMaterialPage;
