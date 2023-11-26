"use client";

import useDeleteUserConfirm from "@/hooks/useDeleteUserConfirm";
import useUpdateUserModal from "@/hooks/useUpdateUserModal";
import { User } from "@/types";
import React from "react";

interface UserBlock {
  user: User;
}

const UserBlock = ({ user }: UserBlock) => {
  const updateModal = useUpdateUserModal();
  const deleteConfirm = useDeleteUserConfirm();

  return (
    <div className="flex justify-between">
      <div className="flex gap-1 text-lg">
        <span>{user.admin_id}</span>
        <span>{user.isAdmin && "✅"}</span>
      </div>
      <div className="text-sm flex gap-1 items-center">
        <span
          className="border rounded px-2 py-1 bg-sky-400 text-white cursor-pointer hover:opacity-70 transition"
          onClick={() => updateModal.onUpdate(user)}
        >
          수정
        </span>
        <span
          onClick={() => deleteConfirm.onOpen(user.id)}
          className="border rounded px-2 py-1 bg-red-400 text-white cursor-pointer hover:opacity-70 transition"
        >
          삭제
        </span>
      </div>
    </div>
  );
};

export default UserBlock;
