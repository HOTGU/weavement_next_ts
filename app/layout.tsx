import localFont from "next/font/local";
import { Racing_Sans_One } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Weavement",
  description: "Generated by create next app",
};

const pretendard = localFont({
  src: "../public/fonts/Pretendard-Regular.subset.woff2",
  preload: true,
});

const racingSansOne = Racing_Sans_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--racing",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${pretendard.className} ${racingSansOne.variable} bgColor`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
