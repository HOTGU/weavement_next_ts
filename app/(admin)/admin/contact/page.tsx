import React, { Suspense } from "react";

import { IContactParams } from "@/actions/db/getContacts";
import ContactPage from "./contactPage";
import queryString from "query-string";
import AdminContactSkeleton from "@/components/skeleton/AdminContactSkeleton";
interface AdminProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const AdminContactPage = async ({ searchParams }: AdminProps) => {
  const asyncSearchParams = await searchParams;
  const copySearchParams = { ...asyncSearchParams };
  const searchString = queryString.stringify(copySearchParams, {
    skipNull: true,
  });

  return (
    <Suspense fallback={<AdminContactSkeleton />} key={searchString}>
      {/* @ts-expect-error Async Server Component */}
      <ContactPage searchParams={asyncSearchParams} />
    </Suspense>
  );
};

export default AdminContactPage;
