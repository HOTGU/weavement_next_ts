import DeletePortfolioConfirm from "@/components/confirms/DeletePortfolioConfirm";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <DeletePortfolioConfirm />
      <div>{children}</div>
    </div>
  );
}
