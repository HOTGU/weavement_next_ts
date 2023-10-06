"use client";

import useDeleteClientConfirm from "@/hooks/useDeleteClientConfirm";
import React, { useCallback, useState } from "react";
import Confirm from "./Confirm";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useCurrentContact from "@/hooks/useCurrentContact";

const DeleteClientConfirm = () => {
  const useConfirm = useDeleteClientConfirm();
  const currentContact = useCurrentContact();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    if (!useConfirm.target) return;
    const loadingToast = toast.loading("삭제중..");

    setIsLoading(true);
    axios
      .delete(`/api/client/${useConfirm.target}`)
      .then((result) => {
        toast.success("삭제 성공", { id: loadingToast });
        currentContact.setCurrent(result.data);
        useConfirm.onClose();
        router.refresh();
      })
      .catch(() => {
        toast.error("삭제 실패", { id: loadingToast });
      })
      .finally(() => setIsLoading(false));
  }, [useConfirm, currentContact, router]);

  return (
    <Confirm
      isOpen={useConfirm.isOpen}
      onClose={useConfirm.onClose}
      onSubmit={onSubmit}
      text="정말 클라이언트를 삭제하시겠습니까?"
      disabled={isLoading}
    />
  );
};

export default DeleteClientConfirm;
