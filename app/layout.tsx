import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <head>
        <meta
          name="google-site-verification"
          content="nttY9KvKnF19jp-g2LLo0bbUYN7HOUMLEeDJGlpHE74"
        />
        <meta
          name="naver-site-verification"
          content="e973f3026fadbe5aa3e63d93373214633c771c9e"
        />
      </head>
      <body className={`${pretendard.className} bgColor`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
