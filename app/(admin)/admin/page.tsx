import getUsers from "@/actions/db/getUsers";
import Container from "@/components/Container";
import UserBlock from "@/components/admin/user/UserBlock";
import UserCreateButton from "@/components/admin/user/UserCreateButton";

const AdminPage = async () => {
  const users = await getUsers();

  if (!users) return <div>유저 정보 가져오는 도중 에러발생</div>;

  return (
    <Container>
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
