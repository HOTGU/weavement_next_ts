import Navbar from "@/components/navbar/Navbar";
import getCurrentUser from "@/actions/getCurrentUser";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <main lang="en">
      <div className=" min-h-screen">
        <Navbar currentUser={currentUser} />
        {children}
        <div className=" sticky top-[100vh]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
