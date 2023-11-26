"use client";

import useCreateUserModal from "@/hooks/useCreateUserModal";
import React from "react";

const UserCreateButton = () => {
  const createUserModal = useCreateUserModal();

  return (
    <div
      className="rounded text-center bg-teal-600 text-white p-4 hover:opacity-70 transition cursor-pointer"
      onClick={createUserModal.onOpen}
    >
      유저생성
    </div>
  );
};

export default UserCreateButton;
