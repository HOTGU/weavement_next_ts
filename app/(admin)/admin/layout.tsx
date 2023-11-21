import getCurrentUser from "@/actions/getCurrentUser";
import DeleteUserConfirm from "@/components/confirms/DeleteUserConfirm";
import CreateUserModal from "@/components/modals/CreateUserModal";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (currentUser?.admin_id !== process.env.MASTER_ID)
    redirect("/admin/analysis/state");

  return (
    <div>
      <CreateUserModal />
      <UpdateUserModal />
      <DeleteUserConfirm />
      {children}
    </div>
  );
}
