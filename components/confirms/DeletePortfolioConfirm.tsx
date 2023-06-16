"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

import Confirm from "./Confirm";
import useDeletePortfolioConfirm from "@/hooks/useDeletePortfolioConfirm";
import { useRouter } from "next/navigation";

const DeletePortfolioConfirm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const deletePortfolioConfirm = useDeletePortfolioConfirm();

  const onSubmit = () => {
    setLoading(true);
    const loadingToast = toast.loading("삭제중..");

    axios
      .delete(`/api/portfolio/${deletePortfolioConfirm.target}`)
      .then(() => {
        toast.success("삭제 성공", { id: loadingToast });
        router.refresh();
        deletePortfolioConfirm.onClose();
      })
      .catch(() => {
        toast.error("삭제 실패", { id: loadingToast });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Confirm
      text="포트폴리오를 정말 삭제하시겠습니까?"
      onClose={deletePortfolioConfirm.onClose}
      isOpen={deletePortfolioConfirm.isOpen}
      onSubmit={onSubmit}
      disabled={loading}
    />
  );
};

export default DeletePortfolioConfirm;
