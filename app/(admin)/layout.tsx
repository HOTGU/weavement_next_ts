import getCurrentUser from "@/actions/getCurrentUser";
import AdminNav from "@/components/navbar/AdminNav";
import { redirect } from "next/navigation";

export const metadata = {
  title: "위브먼트 ADMIN",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/");
  if (!currentUser.isAdmin) redirect("/");

  return (
    <main lang="en">
      <AdminNav />
      <div className="pt-12">{children}</div>
    </main>
  );
}
