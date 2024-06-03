import React from "react";

const AdminContactSkeleton = () => {
  return (
    <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
      <div className="w-fit flex flex-row sm:flex-col gap-2 h-auto sm:h-[calc(100vh-126px)] overflow-x-auto sm:overflow-y-auto pr-4 py-2 ">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            className={`w-[200px] relative whitespace-nowrap p-2 rounded shadow-sm border flex flex-col transition cursor-pointer bg-neutral-100 `}
            key={item}
          >
            <div className="animate-pulse space-y-2">
              <div className="w-full flex items-center justify-between gap-2 text-sm">
                <div className="bg-neutral-400 h-3 w-24 rounded-full"></div>
                <div className="bg-neutral-400 h-3 w-10 rounded-full"></div>
              </div>
              <div className="bg-neutral-400 h-4 w-14 rounded-full"></div>
              <div className="bg-neutral-400 h-3 w-20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 py-2 h-[calc(100vh-126px)] overflow-y-auto"></div>
    </div>
  );
};

export default AdminContactSkeleton;
