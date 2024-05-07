"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LinkBtn = ({ label, target }: { label: string; target: string }) => {
  const pathname = usePathname();

  return (
    <Link href={target} className="flex-1">
      <div
        className={`text-center py-2 hover:bg-neutral-200 transition ${
          pathname === target && "bg-neutral-200"
        }`}
      >
        {label}
      </div>
    </Link>
  );
};

const AdminAnalysisNav = () => {
  const linkArr = [
    { target: "/admin/analysis/state", label: "문의별" },
    { target: "/admin/analysis/platform", label: "플랫폼별" },
    { target: "/admin/analysis/material", label: "소재별" },
    { target: "/admin/analysis/path", label: "문의경로별" },
  ];

  return (
    <div className="w-full max-w-md cursor-pointer bg-neutral-50 rounded-lg flex ">
      {linkArr.map((item) => (
        <LinkBtn label={item.label} target={item.target} key={item.label} />
      ))}
    </div>
  );
};

export default AdminAnalysisNav;
