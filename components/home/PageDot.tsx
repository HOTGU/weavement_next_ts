import React from "react";

interface PageDotProps {
  label: string;
  index: number;
  refs: React.MutableRefObject<(null | HTMLDivElement)[]>;
  showPage: number;
}

const PageDot = ({ label, index, refs, showPage }: PageDotProps) => {
  return (
    <div key={label} className="flex gap-2 h-8 flex-row-reverse items-center">
      <div
        key={label}
        onClick={() =>
          refs!.current[index]?.scrollIntoView({ behavior: "smooth" })
        }
        className={`peer w-3 h-3 border rounded-full  cursor-pointer hover:scale-150 transition ${
          showPage === index
            ? "bg-rose-500 border-rose-500 scale-125"
            : "bg-neutral-700 border-neutral-700 "
        }`}
      ></div>
      <div className="hidden text-sm font-racing peer-hover:block">{label}</div>
    </div>
  );
};

export default PageDot;
