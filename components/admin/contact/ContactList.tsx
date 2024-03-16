"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import qs from "query-string";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

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

  const params = useSearchParams();

  useEffect(() => {
    reset();
  }, [initialConctacts]);

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

  const reset = () => {
    setContacts(initialConctacts);
    setSkip(SKIP_CONTACTS);
    setPrefetchContacts([]);
    setIsLast(false);
    if (initialConctacts.length < SKIP_CONTACTS) {
      setIsLast(true);
    }
  };

  return (
    <div className="w-full sm:w-fit flex flex-row sm:flex-col gap-2 h-auto sm:h-[calc(100vh-126px)] overflow-x-auto sm:overflow-y-auto pr-4 py-2">
      {contacts.map((contact) => (
        <ContactBlock contact={contact} key={contact.id} />
      ))}

      {!isLast && (
        <div
          className=" pt-4 pb-2 flex items-center justify-center group hover:cursor-pointer hover:bg-slate-100"
          onClick={() => {
            setContacts([...contacts, ...prefetchContacts]);
            setSkip(skip + SKIP_CONTACTS);
          }}
        >
          <MdKeyboardDoubleArrowDown className=" animate-bounce w-10 h-10 p-2  border border-slate-300 text-slate-500 rounded-full group-hover:bg-accent group-hover:text-white transition" />
        </div>
      )}
    </div>
  );
};

export default ContactList;
