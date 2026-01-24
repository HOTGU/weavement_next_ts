import Navbar from "@/components/navbar/Navbar";
// import getCurrentUser from "@/actions/getCurrentUser";
import Footer from "@/components/global/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const currentUser = await getCurrentUser();
  return (
    <main lang="en bg-black">
      <div className=" min-h-screen">
        <Navbar />
        {children}
        <div className=" sticky top-[100vh]">
          <Footer />
        </div>
      </div>
    </main>
  );
}
