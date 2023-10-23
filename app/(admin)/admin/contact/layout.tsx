import Container from "@/components/Container";
import ContactNav from "@/components/admin/contact/ContactNav";
import DeleteClientConfirm from "@/components/confirms/DeleteClientConfirm";
import DeleteContactConfirm from "@/components/confirms/DeleteContactConfirm";
import AddClientModal from "@/components/modals/AddClientModal";
import CreateModal from "@/components/modals/CreateModal";
import FileModal from "@/components/modals/FileModal";
import SearchModal from "@/components/modals/SearchModal";
import UpdateClientModal from "@/components/modals/UpdateClientModal";
import UpdateModal from "@/components/modals/UpdateModal";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <CreateModal />
      <SearchModal />
      <UpdateModal />
      <AddClientModal />
      <UpdateClientModal />
      <DeleteClientConfirm />
      <DeleteContactConfirm />
      <FileModal />
      <Container>
        <ContactNav />
      </Container>
      <div>{children}</div>
    </div>
  );
}
