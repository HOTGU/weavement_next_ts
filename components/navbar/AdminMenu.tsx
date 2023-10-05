"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <Link
        className={`${pathname === "/admin/contact" && "text-accent"} `}
        href="/admin/contact"
        passHref
      >
        문의
      </Link>
      <Link
        className={`${pathname === "/admin/portfolio" && "text-accent"} `}
        href="/admin/portfolio"
        passHref
      >
        포트폴리오
      </Link>
      <div onClick={() => signOut()} className=" cursor-pointer">
        로그아웃
      </div>
    </>
  );
};

export default AdminMenu;
