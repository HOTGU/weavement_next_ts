"use client";

import React, { useState } from "react";
import Confirm from "./Confirm";
import useDeleteContactConfirm from "@/hooks/useDeleteContactConfirm";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import useCurrentContact from "@/hooks/useCurrentContact";

const DeleteContactConfirm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deleteConfirm = useDeleteContactConfirm();
  const currentContact = useCurrentContact();

  const onSubmit = () => {
    setLoading(true);
    const toastLoading = toast.loading("삭제중..");
    axios
      .delete(`/api/contact/${deleteConfirm.target}`)
      .then(() => {
        toast.success("문의삭제 성공", { id: toastLoading });
        deleteConfirm.onClose();
        router.refresh();
        currentContact.reset();
      })
      .catch(() => {
        toast.error("문의삭제 실패", { id: toastLoading });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Confirm
      isOpen={deleteConfirm.isOpen}
      text="정말 문의를 삭제하시겠습니까?"
      onClose={deleteConfirm.onClose}
      onSubmit={onSubmit}
      disabled={loading}
    />
  );
};

export default DeleteContactConfirm;
