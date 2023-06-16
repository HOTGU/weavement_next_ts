"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { throttle } from "lodash";
import PageDotContainer from "./PageDotContainer";

export const homePages = [
  { label: "Main", el: <div className="h-full w-full bg-red-200"></div> },
  {
    label: "Portfolio",
    el: <div className="h-full w-full bg-blue-200"></div>,
  },
  {
    label: "About us",
    el: <div className="h-full w-full bg-green-200"></div>,
  },
  { label: "Contact", el: <div className="h-full w-full bg-teal-200"></div> },
];

const HomeClient = () => {
  const [showPage, setShowPage] = useState<number>(0);
  const refs = useRef<(null | HTMLDivElement)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const screenHeight = sectionRef.current?.offsetHeight as number;
        const scrollTop = sectionRef.current?.scrollTop as number;

        if (scrollTop === 0) setShowPage(0);
        if (screenHeight - 10 < scrollTop && scrollTop < screenHeight + 10)
          setShowPage(1);
        if (
          screenHeight * 2 - 10 < scrollTop &&
          scrollTop < screenHeight * 2 + 10
        )
          setShowPage(2);
        if (
          screenHeight * 3 - 10 < scrollTop &&
          scrollTop < screenHeight * 3 + 10
        )
          setShowPage(3);
      }, 200),
    [showPage]
  );

  useEffect(() => {
    sectionRef.current?.addEventListener("scroll", handleScroll);

    return () =>
      sectionRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-screen w-full snap-y snap-mandatory overflow-y-scroll relative scrollbar-hide"
    >
      {homePages.map((page, index) => (
        <div
          key={index}
          ref={(i) => (refs.current[index] = i)}
          className=" snap-center snap-always h-screen"
        >
          {page.el}
        </div>
      ))}

      <PageDotContainer refs={refs} showPage={showPage} />
    </div>
  );
};

export default HomeClient;
