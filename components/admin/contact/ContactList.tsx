"use client";

import React, { useEffect, useMemo, useState } from "react";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import ContactBlock from "./ContactBlock";
import { ContactWithClients } from "@/types";

const ContactList = ({ contacts }: { contacts: ContactWithClients[] }) => {
  const router = useRouter();
  const [isLast, setIsLast] = useState(false);

  const params = useSearchParams();

  useEffect(() => {
    const paramsTake = params.get("take");
    let take = paramsTake ? +paramsTake : 10;

    contacts.length <= take ? setIsLast(true) : setIsLast(false);
  }, [params]);

  const moreBtnClick = () => {
    const currentQuery = qs.parse(params.toString());
    const take = currentQuery.take ? +currentQuery.take + 10 : 20;
    const updatedQuery = {
      ...currentQuery,
      take,
    };
    const url = qs.stringifyUrl(
      { url: "/admin/contact", query: updatedQuery },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <div className="w-full sm:w-fit flex flex-row sm:flex-col gap-2 h-auto sm:h-[calc(100vh-126px)] overflow-x-auto sm:overflow-y-auto pr-4 py-2">
      {contacts
        .filter((__, i) => {
          if (isLast) {
            return i < contacts.length;
          } else {
            return i < contacts.length - 1;
          }
        })
        .map((contact) => (
          <ContactBlock contact={contact} key={contact.id} />
        ))}

      {!isLast && (
        <div
          className=" pt-4 pb-2 flex items-center justify-center group hover:cursor-pointer hover:bg-slate-100"
          onClick={moreBtnClick}
        >
          <MdKeyboardDoubleArrowDown className=" animate-bounce w-10 h-10 p-2  border border-slate-300 text-slate-500 rounded-full group-hover:bg-accent group-hover:text-white transition" />
        </div>
      )}
    </div>
  );
};

export default ContactList;
