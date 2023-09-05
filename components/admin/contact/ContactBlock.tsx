"use client";

import useCurrentContact from "@/hooks/useCurrentContact";
import { ContactWithClients } from "@/types";
import { format } from "date-fns";
import React from "react";

interface ContactBlockProps {
  contact: ContactWithClients;
}

const ContactBlock = ({ contact }: ContactBlockProps) => {
  const useContact = useCurrentContact();

  return (
    <div
      className={`w-full max-w-[200px] relative whitespace-nowrap p-2 rounded shadow-sm border flex flex-col transition cursor-pointer ${
        useContact.current?.id === contact.id
          ? "border-black border"
          : "border-neutral-300"
      }`}
      onClick={() => useContact.setCurrent(contact)}
    >
      <div className="w-full flex items-center justify-between gap-2 text-sm">
        <div className="text-xs text-neutral-500 font-extralight">
          {format(contact.createdAt, "MM/dd hh:mm")}
        </div>
        <div className="flex gap-1 sm:gap-2 text-xs">
          <div>{contact.pm}</div>
          <div>{contact.state}</div>
        </div>
      </div>
      <div className="truncate">
        {contact.clientCompany ? contact.clientCompany : contact.client[0].name}
      </div>
      {contact.client.length > 0 && contact.client[0] && (
        <div className="text-xs text-neutral-500">
          {contact.client[0].phone}
        </div>
      )}
      {(contact.pm === "미정" || contact.pm === "") && (
        <span className="absolute flex h-3 w-3 -top-1 -right-1">
          <span className="absolute animate-ping inline-flex bg-accent w-3 h-3 top-0 right-0 rounded-full"></span>
          <span className=" bg-accent inline-flex w-3 h-3 rounded-full"></span>
        </span>
      )}
    </div>
  );
};

export default ContactBlock;
