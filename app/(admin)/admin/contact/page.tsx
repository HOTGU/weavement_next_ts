import React from "react";

import getContacts, { IContactParams } from "@/actions/db/getContacts";
import Container from "@/components/Container";
import ContactList from "@/components/admin/contact/ContactList";
import ContactDetail from "@/components/admin/contact/ContactDetail";
import ContactNav from "@/components/admin/contact/ContactNav";
import ExcelDownload from "@/components/admin/contact/ExcelDownload";

interface AdminProps {
  searchParams: IContactParams;
}

const ContactPage = async ({ searchParams }: AdminProps) => {
  const contacts = await getContacts(searchParams);

  return (
    <Container>
      <div className="flex items-center justify-between">
        <ContactNav />
        <ExcelDownload />
      </div>
      <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
        <ContactList initialConctacts={contacts} />
        <div className="flex-1 py-2 h-[calc(100vh-126px)] overflow-y-auto">
          <ContactDetail />
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
