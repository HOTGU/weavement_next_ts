"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminAnalysisNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-full sm:w-[150px] h-fit cursor-pointer bg-neutral-50 rounded-lg flex sm:block ">
      <Link href="/admin/analysis/state" className="flex-1">
        <div
          className={`text-center py-3 sm:py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/state" && "bg-neutral-200"
          }`}
        >
          문의별
        </div>
      </Link>
      <Link href="/admin/analysis/platform" className="flex-1">
        <div
          className={`text-center py-3 sm:py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/platform" && "bg-neutral-200"
          }`}
        >
          플랫폼별
        </div>
      </Link>
      <Link href="/admin/analysis/material" className="flex-1">
        <div
          className={`text-center py-3 sm:py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/material" && "bg-neutral-200"
          }`}
        >
          소재별
        </div>
      </Link>
      <Link href="/admin/analysis/path" className="flex-1">
        <div
          className={`text-center py-3 sm:py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/path" && "bg-neutral-200"
          }`}
        >
          문의경로별
        </div>
      </Link>
    </div>
  );
};

export default AdminAnalysisNav;
