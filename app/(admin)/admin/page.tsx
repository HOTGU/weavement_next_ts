import { redirect } from "next/navigation";

const AdminPage = async () => {
  redirect("/admin/analysis");
};

export default AdminPage;
