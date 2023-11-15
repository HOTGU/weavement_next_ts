import { redirect } from "next/navigation";

export interface IAnalysisParams {
  date: "month" | "year" | "quarter";
  year: number;
}

type PathKind =
  | "홈페이지"
  | "대표전화(HP)"
  | "대표문자(HP)"
  | "블로그(전화)"
  | "블로그(문자)"
  | "대표메일"
  | "카카오톡"
  | "카카오톡(채널)"
  | "인스타(전화)"
  | "인스타(문자)"
  | "인스타(DM)"
  | "유튜브(전화)"
  | "유튜브(문자)"
  | "기타";

const AdminPage = async () => {
  redirect("/admin/analysis/state");
};

export default AdminPage;
