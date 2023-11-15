"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminAnalysisNav = () => {
  const pathname = usePathname();

  return (
    <div className="w-[150px] h-fit cursor-pointer bg-neutral-50 rounded-lg">
      <Link href="/admin/analysis/state">
        <div
          className={`text-center py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/state" && "bg-neutral-200"
          }`}
        >
          문의별
        </div>
      </Link>
      <Link href="/admin/analysis/platform">
        <div
          className={`text-center py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/platform" && "bg-neutral-200"
          }`}
        >
          플랫폼별
        </div>
      </Link>
      <Link href="/admin/analysis/path">
        <div
          className={`text-center py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/path" && "bg-neutral-200"
          }`}
        >
          문의경로별
        </div>
      </Link>
      <Link href="/admin/analysis/material">
        <div
          className={`text-center py-5 hover:bg-neutral-200 transition ${
            pathname === "/admin/analysis/material" && "bg-neutral-200"
          }`}
        >
          소재별
        </div>
      </Link>
    </div>
  );
};

export default AdminAnalysisNav;
