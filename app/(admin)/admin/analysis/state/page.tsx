import React from "react";

import { redirect } from "next/navigation";
import qs from "query-string";

import Container from "@/components/Container";
import getBarDataByState, {
  IStateChartParams,
} from "@/actions/db/getBarDataByState";
import BarGraph from "@/components/admin/analysis/state/BarGraph";
import DateSearch from "@/components/admin/analysis/DateSearch";
import PieGraph from "@/components/admin/analysis/state/PieGraph";
import DataList from "@/components/admin/analysis/state/DataList";
import YearSearch from "@/components/admin/analysis/YearSearch";

interface AnalysisParams {
  searchParams: IStateChartParams;
}

export interface StateChartType {
  categories: string[];
  series: {
    total: number[];
    success: number[];
  };
}

const AnalysisStatePage = async ({ searchParams }: AnalysisParams) => {
  if (!searchParams.date) {
    const url = qs.stringifyUrl({
      url: "/admin/analysis/state",
      query: { date: "month", year: 2023 },
    });
    redirect(url);
  }
  const data = await getBarDataByState(searchParams);
  // const pieData = await getPieDataByState(searchParams);

  return (
    <Container>
      <div className="flex gap-4 mt-4">
        <div className="w-[150px] h-fit cursor-pointer bg-neutral-50 rounded-lg">
          <div className="text-center py-5 hover:bg-neutral-200 transition bg-neutral-200">
            문의별
          </div>
          <div className="text-center py-5 hover:bg-neutral-200 transition">
            유입경로별
          </div>
          <div className="text-center py-5 hover:bg-neutral-200 transition">
            소재별
          </div>
        </div>
        <div className="flex-1 bg-neutral-50 rounded-lg p-10">
          <div className="flex justify-between">
            <DateSearch />
            <YearSearch />
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="w-3/4">
              <BarGraph data={data} />
            </div>
            <div className="w-1/4 h-full">
              <PieGraph data={data} />
            </div>
          </div>
          <div className="mt-4">
            <DataList data={data} searchParams={searchParams} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AnalysisStatePage;
