import React from "react";
import { CurrentUserProps } from "@/types";

import Container from "../Container";
import Link from "next/link";
import RacingFont from "../RacingFont";
import AdminMenu from "./AdminMenu";

const AdminNav = ({ currentUser }: CurrentUserProps) => {
  return (
    <div className={`w-full bg-white z-10 fixed text-black`}>
      <div className="py-1 border-b">
        <Container>
          <div className="flex items-center justify-between h-full">
            <div className=" font-racing flex items-end">
              <RacingFont>
                <Link href="/" passHref>
                  <span className="text-4xl text-accent">WM</span>
                </Link>
                <Link href="/admin">
                  <span className="text-sm">Admin</span>
                </Link>
              </RacingFont>
            </div>
            <div className="flex gap-4">
              <AdminMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminNav;
