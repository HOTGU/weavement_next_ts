import DeleteClientConfirm from "@/components/confirms/DeleteClientConfirm";
import DownloadFilesConfirm from "@/components/confirms/DownloadFilesConfirm";
import AddClientModal from "@/components/modals/AddClientModal";
import CreateModal from "@/components/modals/CreateModal";
import FileModal from "@/components/modals/FileModal";
import SearchModal from "@/components/modals/SearchModal";
import UpdateClientModal from "@/components/modals/UpdateClientModal";
import DownloadContactConfirm from "@/components/confirms/DownloadContactConfirm";
import UpdateModal from "@/components/modals/UpdateModal";
import DeleteContactConfirm from "@/components/confirms/DeleteContactConfirm";
import ContactNav from "@/components/admin/contact/ContactNav";
import ExcelDownload from "@/components/admin/contact/ExcelDownload";
import Container from "@/components/Container";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <CreateModal />
      <SearchModal />
      <UpdateModal />
      <AddClientModal />
      <UpdateClientModal />
      <DeleteClientConfirm />
      <DeleteContactConfirm />
      <DownloadFilesConfirm />
      <DownloadContactConfirm />
      <FileModal />

      <div className="flex items-center justify-between">
        <ContactNav />
        <ExcelDownload />
      </div>

      {children}
    </Container>
  );
}
