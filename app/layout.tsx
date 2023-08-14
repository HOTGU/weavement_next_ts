import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "위브먼트 | 홈",
  description: "조형물 제작 전문 업체, 위브먼트 WEAVEMENT",
  icons: {
    icon: "/favicon.png",
  },
};

const pretendard = localFont({
  src: "../public/fonts/Pretendard-Regular.subset.woff2",
  preload: true,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${pretendard.className} bgColor`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
