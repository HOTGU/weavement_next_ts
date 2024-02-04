import DeleteClientConfirm from "@/components/confirms/DeleteClientConfirm";
import DeleteContactConfirm from "@/components/confirms/DeleteContactConfirm";
import DownloadFilesConfirm from "@/components/confirms/DownloadFilesConfirm";
import AddClientModal from "@/components/modals/AddClientModal";
import CreateModal from "@/components/modals/CreateModal";
import FileModal from "@/components/modals/FileModal";
import SearchModal from "@/components/modals/SearchModal";
import UpdateClientModal from "@/components/modals/UpdateClientModal";
import UpdateModal from "@/components/modals/UpdateModal";
import DownloadContactConfirm from "@/components/confirms/DownloadContactConfirm";

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
      <DownloadFilesConfirm />
      <DownloadContactConfirm />
      <FileModal />

      <div>{children}</div>
    </div>
  );
}
