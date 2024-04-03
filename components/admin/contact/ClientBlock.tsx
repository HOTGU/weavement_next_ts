"use client";

import React from "react";
import { Client } from "@prisma/client";
import useDeleteClientConfirm from "@/hooks/useDeleteClientConfirm";
import useUpdateClientModal from "@/hooks/useUpdateClientModal";

interface ClientBlockProps {
  client: Client;
}

const ClientBlock = ({ client }: ClientBlockProps) => {
  const useConfirm = useDeleteClientConfirm();
  const updateClientModal = useUpdateClientModal();

  return (
    <div
      key={client.name}
      className="flex items-center gap-4 overflow-x-auto whitespace-nowrap py-2 sm:py-0"
    >
      <span className="min-w-[100px]">
        {client.name}
        {client.position ? ` ${client.position}` : " 님"}
      </span>
      <span className="min-w-[180px]">
        {client.phone ? `연락처: ${client.phone}` : "연락처 없음"}
      </span>
      <span className="min-w-[150px]">
        {client.email ? `이메일: ${client.email}` : "이메일 없음"}
      </span>
      <span
        className="cursor-pointer text-sky-500 text-sm hover:font-bold transition"
        onClick={() => updateClientModal.onOpen(client)}
      >
        수정
      </span>
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
