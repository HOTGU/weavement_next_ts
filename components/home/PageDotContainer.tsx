import React from "react";

import PageDot from "./PageDot";
import { homePages } from "./HomeClient";

interface PageDotContainerProps {
  refs: React.MutableRefObject<(null | HTMLDivElement)[]>;
  showPage: number;
}

const PageDotContainer = ({ refs, showPage }: PageDotContainerProps) => {
  return (
    <div className="fixed top-1/2 right-10 -translate-y-1/2 flex flex-col">
      {homePages.map((page, index) => (
        <PageDot
          label={page.label}
          index={index}
          refs={refs}
          showPage={showPage}
          key={page.label}
        />
      ))}
    </div>
  );
};

export default PageDotContainer;
