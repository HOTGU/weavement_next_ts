"use client";

import useCreateModal from "@/hooks/useCreateModal";
import useSearchModal from "@/hooks/useSearchModal";
import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineHome, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";

const ButtonNav = () => {
  const createModal = useCreateModal();
  const searchModal = useSearchModal();
  const router = useRouter();
  return (
    <div className="flex gap-2 items-center justify-center">
      <div
        onClick={() => router.push("/admin/contact")}
        className="text-white bg-accent cursor-pointer transition hover:opacity-70 w-9 h-9 rounded-full flex items-center justify-center"
      >
        <AiOutlineHome size={24} />
      </div>
      <div
        className="text-white bg-accent cursor-pointer transition hover:opacity-70 w-9 h-9 rounded-full flex items-center justify-center"
        onClick={createModal.onOpen}
      >
        <AiOutlinePlus size={24} />
      </div>
      <div
        onClick={searchModal.onOpen}
        className="text-white bg-accent cursor-pointer transition hover:opacity-70 w-9 h-9 rounded-full flex items-center justify-center"
      >
        <AiOutlineSearch size={24} />
      </div>
    </div>
  );
};

export default ButtonNav;
