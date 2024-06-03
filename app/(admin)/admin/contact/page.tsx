import React, { Suspense } from "react";

import { IContactParams } from "@/actions/db/getContacts";
import ContactPage from "./contactPage";
import queryString from "query-string";
import AdminContactSkeleton from "@/components/skeleton/AdminContactSkeleton";
interface AdminProps {
  searchParams: IContactParams;
}

const AdminContactPage = async ({ searchParams }: AdminProps) => {
  const searchString = queryString.stringify(searchParams);

  return (
    <Suspense fallback={<AdminContactSkeleton />} key={searchString}>
      {/* @ts-expect-error Async Server Component */}
      <ContactPage searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminContactPage;
