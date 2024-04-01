"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import { ContactWithClients } from "@/types";

const SKIP_UNIT = 10;

type ContactContextType = {
  contacts: ContactWithClients[];
  prefetchContacts: ContactWithClients[];
  isLast: boolean;
  skip: number;
  moreBtnClick: (data: ContactWithClients[]) => void;
  onPrefetch: (data: ContactWithClients[]) => void;
  updateContact: (data: ContactWithClients) => void;
};

const ContactContext = createContext<ContactContextType | null>(null);

const ContactMainScreen = ({
  initialContacts,
}: {
  initialContacts: ContactWithClients[];
}) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [prefetchContacts, setPrefetchContacts] = useState<
    ContactWithClients[]
  >([]);
  const [skip, setSkip] = useState(SKIP_UNIT);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    reset();
  }, [initialContacts]);

  const reset = () => {
    setContacts(initialContacts);
    setSkip(SKIP_UNIT);
    setPrefetchContacts([]);
    setIsLast(false);
    if (initialContacts.length < SKIP_UNIT) {
      setIsLast(true);
    }
  };

  const moreBtnClick = (data: ContactWithClients[]) => {
    setContacts([...contacts, ...data]);
    setSkip(skip + SKIP_UNIT);
  };

  const onPrefetch = (data: ContactWithClients[]) => {
    setPrefetchContacts(data);
    data.length === 0 ? setIsLast(true) : setIsLast(false);
  };

  const updateContact = (data: ContactWithClients) => {
    setContacts(
      contacts.map((contact) => {
        if (contact.id === data.id) {
          contact = data;
        }
        return contact;
      })
    );
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        prefetchContacts,
        isLast,
        skip,
        moreBtnClick,
        onPrefetch,
        updateContact,
      }}
    >
      <div className="flex gap-4 sm:gap-8 flex-col sm:flex-row">
        <ContactList />
        <div className="flex-1 py-2 h-[calc(100vh-126px)] overflow-y-auto">
          <ContactDetail />
        </div>
      </div>
    </ContactContext.Provider>
  );
};

export default ContactMainScreen;

export const useContacts = () => {
  const context = useContext(ContactContext);

  if (!context) {
    throw Error("No provider!");
  }

  return context;
};
