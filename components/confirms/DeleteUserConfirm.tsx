"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import Confirm from "./Confirm";
import useDeleteUserConfirm from "@/hooks/useDeleteUserConfirm";

const DeleteUserConfirm = () => {
  const useConfirm = useDeleteUserConfirm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    if (!useConfirm.target) return;
    const loadingToast = toast.loading("삭제중..");

    setIsLoading(true);
    axios
      .delete(`/api/user/${useConfirm.target}`)
      .then((result) => {
        toast.success("삭제 성공", { id: loadingToast });
        useConfirm.onClose();
        router.refresh();
      })
      .catch(() => {
        toast.error("삭제 실패", { id: loadingToast });
      })
      .finally(() => setIsLoading(false));
  }, [useConfirm, router]);

  return (
    <Confirm
      isOpen={useConfirm.isOpen}
      onClose={useConfirm.onClose}
      onSubmit={onSubmit}
      text="정말 삭제하시겠습니까?"
      disabled={isLoading}
    />
  );
};

export default DeleteUserConfirm;
