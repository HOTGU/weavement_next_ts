import getContacts, { IContactParams } from "@/actions/db/getContacts";
import ContactDetail from "@/components/admin/contact/ContactDetail";
import ContactList from "@/components/admin/contact/ContactList";
import React from "react";

interface IContactPage {
  searchParams: IContactParams;
}

const ContactPage = async ({ searchParams }: IContactPage) => {
  const { pm, state, term, startDate, endDate, take } = searchParams;
  const contacts = await getContacts({
    pm,
    state,
    term,
    startDate,
    endDate,
    take,
  });
  return (
    <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
      <ContactList contacts={contacts} />
      <div className="flex-1 py-2 h-[calc(100vh-126px)] overflow-y-auto">
        <ContactDetail />
      </div>
    </div>
  );
};

export default ContactPage;
