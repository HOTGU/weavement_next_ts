import React from "react";

import getContacts, { IContactParams } from "@/actions/db/getContacts";
import Container from "@/components/Container";
import ContactNav from "@/components/admin/contact/ContactNav";
import ExcelDownload from "@/components/admin/contact/ExcelDownload";
import ContactMainScreen from "@/components/admin/contact/ContactMainScreen";

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

      <ContactMainScreen initialContacts={contacts} />
    </Container>
  );
};

export default ContactPage;
