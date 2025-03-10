import React, { Suspense } from "react";

import { IContactParams } from "@/actions/db/getContacts";
import ContactPage from "./contactPage";
import queryString from "query-string";
import AdminContactSkeleton from "@/components/skeleton/AdminContactSkeleton";
interface AdminProps {
  params?: { [key: string]: string | string[] | undefined };
}

const AdminContactPage = async ({ params }: AdminProps) => {
  const searchParams = await params;
  const copySearchParams = { ...searchParams };
  const searchString = queryString.stringify(copySearchParams, {
    skipNull: true,
  });

  return (
    <Suspense fallback={<AdminContactSkeleton />} key={searchString}>
      {/* @ts-expect-error Async Server Component */}
      <ContactPage searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminContactPage;
