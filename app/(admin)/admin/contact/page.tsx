import React, { Suspense } from "react";

import getContacts, { IContactParams } from "@/actions/db/getContacts";
import ContactList from "@/components/admin/contact/ContactList";
import ContactDetail from "@/components/admin/contact/ContactDetail";
import Loader from "@/components/Loader";
import ContactPage from "./contactPage";
import queryString from "query-string";
interface AdminProps {
  searchParams: IContactParams;
}

const AdminContactPage = async ({ searchParams }: AdminProps) => {
  // const contacts = await getContacts(searchParams);

  const searchString = queryString.stringify(searchParams);

  return (
    <Suspense fallback={<Loader />} key={searchString}>
      {/* @ts-expect-error Async Server Component */}
      <ContactPage searchParams={searchParams} />
    </Suspense>
  );
};

export default AdminContactPage;
