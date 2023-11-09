import { redirect } from "next/navigation";

const AdminPage = async () => {
  redirect("/admin/analysis/state");
};

export default AdminPage;
