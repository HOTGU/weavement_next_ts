"use client";

import useCurrentContact from "@/hooks/useCurrentContact";
import { ContactWithClients } from "@/types";
import { format } from "date-fns";
import React, { useMemo } from "react";

interface ContactBlockProps {
  contact: ContactWithClients;
}

const ContactBlock = ({ contact }: ContactBlockProps) => {
  const useContact = useCurrentContact();

  const pmColor = useMemo(() => {
    if (contact.pm === "SH") return { bg: "bg-pink-50", text: "text-pink-600" };
    if (contact.pm === "DW") return { bg: "bg-teal-50", text: "text-teal-600" };
    if (contact.pm === "JH") return { bg: "bg-blue-50", text: "text-blue-600" };
    return { bg: "bg-white", text: "text-neutral-500" };
  }, [contact.pm]);

  const stateColor = useMemo(() => {
    if (contact.state === "계약") return "bg-sky-400 text-white";
    if (contact.state === "불발") return "bg-red-700 text-white";
    if (contact.state === "완료") return "bg-blue-700 text-white";
    return "text-neutral-500";
  }, [contact.state]);

  return (
    <div
      className={`w-[200px] relative whitespace-nowrap p-2 rounded shadow-sm border flex flex-col transition cursor-pointer ${
        useContact.current?.id === contact.id
          ? "border-black border"
          : "border-neutral-300"
      }  ${pmColor.bg}`}
      onClick={() => useContact.setCurrent(contact)}
    >
      <div className="w-full flex items-center justify-between gap-2 text-sm">
        <div className="text-xs text-neutral-500 font-extralight">
          {format(new Date(contact.createdAt), "MM/dd hh:mm aaa")}
        </div>
        <div className="flex gap-1 text-xs">
          <div className={`font-extrabold ${pmColor.text} `}>{contact.pm}</div>
          <div className={`px-1 rounded font-bold ${stateColor}`}>
            {contact.state}
          </div>
        </div>
      </div>
      <div className="truncate">
        {contact.clientCompany
          ? contact.clientCompany
          : contact.client[0]?.name}
      </div>
      {contact.client.length > 0 && contact.client[0] && (
        <div className="text-xs text-neutral-500">
          {contact.client[0].phone}
        </div>
      )}
      {(contact.pm === "미정" ||
        contact.pm === "" ||
        contact.state === "문의") && (
        <span className="absolute flex h-3 w-3 -top-1 -right-1 z-20">
          <span className="absolute animate-ping inline-flex bg-accent w-3 h-3 top-0 right-0 rounded-full"></span>
          <span className=" bg-accent inline-flex w-3 h-3 rounded-full"></span>
        </span>
      )}
    </div>
  );
};

export default ContactBlock;
