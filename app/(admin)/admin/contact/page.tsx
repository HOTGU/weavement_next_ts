import React from "react";

import getContacts, { IContactParams } from "@/actions/db/getContacts";
import Container from "@/components/Container";
import ContactBlock from "@/components/admin/contact/ContactBlock";
import ContactDetail from "@/components/admin/contact/ContactDetail";

interface AdminProps {
  searchParams: IContactParams;
}

const ContactPage = async ({ searchParams }: AdminProps) => {
  const contacts = await getContacts(searchParams);

  return (
    <Container>
      <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
        <div className="w-full sm:w-fit flex flex-row sm:flex-col gap-2 h-auto sm:h-[calc(100vh-126px)] overflow-x-auto sm:overflow-y-auto pr-4 py-2">
          {contacts.map((contact) => (
            <ContactBlock contact={contact} key={contact.id} />
          ))}
        </div>
        <div className="flex-1 py-2 h-[calc(100vh-126px)] overflow-y-auto">
          <ContactDetail />
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
