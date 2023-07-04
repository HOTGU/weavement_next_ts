"use client";

import React from "react";
import { Client } from "@prisma/client";
import useDeleteClientConfirm from "@/hooks/useDeleteClientConfirm";

interface ClientBlockProps {
  client: Client;
}

const ClientBlock = ({ client }: ClientBlockProps) => {
  const useConfirm = useDeleteClientConfirm();

  return (
    <div
      key={client.name}
      className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-2 sm:py-0"
    >
      <span className=" w-24">
        {client.name}
        {client.position ? ` ${client.position}` : " 님"}
      </span>
      <span className=" w-44">
        {client.phone ? `연락처: ${client.phone}` : "연락처 없음"}
      </span>
      <span>{client.email ? `이메일: ${client.email}` : "이메일 없음"}</span>
      <span
        className="cursor-pointer text-rose-500 text-sm hover:font-bold transition"
        onClick={() => useConfirm.onOpen(client.id)}
      >
        삭제
      </span>
    </div>
  );
};

export default ClientBlock;
