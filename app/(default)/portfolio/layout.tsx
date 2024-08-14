import { PortfolioSearchModal } from "@/components/modals/PortfolioSearchModal";
import { PortfolioSearchButton } from "@/components/screens/portfolio/PortfolioSearchButton";
import { PropsWithChildren } from "react";

export default function PortfolioLayout({ children }: PropsWithChildren) {
  return (
    <div className="pt-10 md:pt-12 lg:pt-14 pb-4 w-full">
      <PortfolioSearchModal />
      <PortfolioSearchButton />
      {children}
    </div>
  );
}
