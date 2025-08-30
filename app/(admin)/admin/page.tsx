import getUsers from "@/actions/db/getUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import AdminDbChangeForm from "@/components/admin/AdminDbChangeForm";
import UserBlock from "@/components/admin/user/UserBlock";
import UserCreateButton from "@/components/admin/user/UserCreateButton";
import DeleteUserConfirm from "@/components/confirms/DeleteUserConfirm";
import CreateUserModal from "@/components/modals/CreateUserModal";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.admin_id !== process.env.MASTER_ID) {
    return redirect("/admin/attendance");
  }

  const users = await getUsers();

  if (!users) return <div>유저 정보 가져오는 도중 에러발생</div>;

  return (
    <Container>
      <CreateUserModal />
      <UpdateUserModal />
      <DeleteUserConfirm />
      <div className="flex justify-center w-full gap-10 mt-10 mx-auto  ">
        <div className="w-1/3 flex flex-col gap-6 p-4 border rounded">
          <div className="text-center font-bold text-2xl">
            위브먼트 직원일동
          </div>
          <div className="py-4 flex flex-col gap-4">
            {users.map((user) => (
              <div key={user.id}>
                <UserBlock user={user} />
              </div>
            ))}
          </div>
          <UserCreateButton />
        </div>
        <div className="w-2/3 flex flex-col gap-6 p-4 border rounded"></div>

        {/* <AdminDbChangeForm /> */}
      </div>
    </Container>
  );
};
export default AdminPage;
