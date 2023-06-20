"use client";

import React from "react";
import { CurrentUserProps } from "@/types";
import { signOut } from "next-auth/react";

import Container from "../Container";
import Link from "next/link";

const AdminNav = ({ currentUser }: CurrentUserProps) => {
  return (
    <div className={`w-full bg-white z-10 fixed text-black`}>
      <div className="py-1 border-b">
        <Container>
          <div className="flex items-center justify-between h-full">
            <div className=" font-racing flex items-end">
              <span className="text-4xl text-accent">WM</span>
              <span className="text-sm">Admin</span>
            </div>
            <div className="flex gap-4">
              <Link href="/admin/contact">문의</Link>
              <Link href="/admin/portfolio">포트폴리오</Link>
              <div onClick={() => signOut()} className=" cursor-pointer">
                로그아웃
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminNav;
