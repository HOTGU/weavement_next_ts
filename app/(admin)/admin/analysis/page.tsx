import { redirect } from "next/navigation";

export interface IAnalysisParams {
  date: "month" | "year" | "quarter";
  year: number;
}

export interface IChartDataTypes {
  categories: string[];
  series: { name: PlatformKind | StateKind; data: number[] }[];
}

type PlatformKind =
  | "홈페이지"
  | "블로그"
  | "인스타그램"
  | "페이스북"
  | "유튜브"
  | "기존고객"
  | "소개"
  | "기타"
  | "알수없음";

type StateKind = "문의" | "계약";

const AdminPage = async () => {
  redirect("/admin/analysis/state");
};

export default AdminPage;
