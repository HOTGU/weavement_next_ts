"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { useInView } from "react-intersection-observer";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";

import ContactBlock from "./ContactBlock";
import { ContactWithClients } from "@/types";

interface ContactListProps {
  initialConctacts: ContactWithClients[];
}

export const SKIP_CONTACTS = 10;

const ContactList = ({ initialConctacts }: ContactListProps) => {
  const [contacts, setContacts] =
    useState<ContactWithClients[]>(initialConctacts);
  const [prefetchContacts, setPrefetchContacts] = useState<
    ContactWithClients[]
  >([]);
  const [skip, setSkip] = useState(SKIP_CONTACTS);
  const [isLast, setIsLast] = useState(false);
  const [ref, inView] = useInView();

  const params = useSearchParams();

  useEffect(() => {
    const prefetch = async () => {
      let currentQuery = {};

      if (params) {
        currentQuery = qs.parse(params.toString());
      }

      const updatedQuery = {
        ...currentQuery,
        skip,
      };

      const url = qs.stringifyUrl(
        { url: "/api/contact", query: updatedQuery },
        { skipNull: true }
      );

      try {
        const response = await axios.get(url);
        if (response.data.length === 0) {
          setIsLast(true);
        }
        setPrefetchContacts(response.data);
      } catch (error) {
        toast.error("서버에러 발생 새로고침을 해보세요");
      }
    };

    prefetch();
  }, [skip]);

  useEffect(() => {
    setContacts([...contacts, ...prefetchContacts]);
    setSkip(skip + SKIP_CONTACTS);
  }, [inView]);

  return (
    <div className="w-full sm:w-fit flex flex-row sm:flex-col gap-2 h-auto sm:h-[calc(100vh-126px)] overflow-x-auto sm:overflow-y-auto pr-4 py-2">
      {contacts.map((contact) => (
        <ContactBlock contact={contact} key={contact.id} />
      ))}

      {!isLast && <div ref={ref} className="h-[100px] bg-red-500" />}
    </div>
  );
};

export default ContactList;
