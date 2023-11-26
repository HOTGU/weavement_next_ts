import { redirect } from "next/navigation";

export interface IAnalysisParams {
  date: "month" | "year" | "quarter";
  year: number;
}

const AdminPage = async () => {
  redirect("/admin/analysis/state");
};

export default AdminPage;
