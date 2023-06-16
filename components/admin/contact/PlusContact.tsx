"use client";

import useCreateModal from "@/hooks/useCreateModal";
import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

const PlusContact = () => {
  const createModal = useCreateModal();

  return (
    <div
      className="text-accent cursor-pointer transition hover:opacity-70"
      onClick={createModal.onOpen}
    >
      <AiFillPlusCircle size={40} />
    </div>
  );
};

export default PlusContact;
