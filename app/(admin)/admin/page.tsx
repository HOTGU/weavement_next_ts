import getUsers from "@/actions/db/getUsers";
import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import UserBlock from "@/components/admin/user/UserBlock";
import UserCreateButton from "@/components/admin/user/UserCreateButton";
import DeleteUserConfirm from "@/components/confirms/DeleteUserConfirm";
import CreateUserModal from "@/components/modals/CreateUserModal";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import { redirect } from "next/navigation";

const AdminPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser?.admin_id !== process.env.MASTER_ID) {
    return redirect("/admin/analysis/state");
  }

  const users = await getUsers();

  if (!users) return <div>유저 정보 가져오는 도중 에러발생</div>;

  return (
    <Container>
      <CreateUserModal />
      <UpdateUserModal />
      <DeleteUserConfirm />
      <div className="flex flex-col mx-auto gap-6 w-[500px] mt-4 p-4 border rounded">
        <div className=" self-center font-bold text-2xl">위브먼트 직원일동</div>
        <div className="py-4 flex flex-col gap-4">
          {users.map((user) => (
            <div key={user.id}>
              <UserBlock user={user} />
            </div>
          ))}
        </div>
        <UserCreateButton />
      </div>
    </Container>
  );
};
export default AdminPage;
