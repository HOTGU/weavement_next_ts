"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import Confirm from "./Confirm";
import useDownloadFilesConfirm from "@/hooks/useDownloadFilesConfirm";
import useFileModal from "@/hooks/useFileModal";

const DownloadFilesConfirm = () => {
  const [loading, setLoading] = useState(false);
  const confirm = useDownloadFilesConfirm();
  const fileModal = useFileModal();

  const onSubmit = async () => {
    const loadingToast = toast.loading("다운로드중..");
    setLoading(true);
    try {
      confirm.target.map(async (image: string) => {
        const key = image.split("com/")[1]; // ex)CONTACT/production/올리/2023년10월3일6시59분__DSC_1255.JPG
        const keyArrayOfSlash = key.split("/"); // ex) ["CONTACT", "production", "올리", "2023년10월3일6시59분__DSC_1255.JPG"]
        const fileNameArray = keyArrayOfSlash.filter((item, index) => {
          if (index === 0 || index === 1) {
            return false;
          }

          return true;
        }); // ex) ["올리", "2023년10월3일6시59분__DSC_1255.JPG"]
        const fileNameStr = fileNameArray.join("-");

        const { data } = await axios.post("/api/contact/file-download", {
          key,
        });

        const a = window.document.createElement("a");
        a.href = `data:${data.contentType};base64,${data.base64Data}`;
        a.download = `${fileNameStr}`;
        a.click();
      });
      toast.success("파일 다운로드 성공", {
        id: loadingToast,
      });
      confirm.onClose();
      fileModal.onClose();
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.log(error);
      }
      toast.error("파일 다운로드 실패", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Confirm
      text="파일들을 다운로드받으시겠습니까?"
      onSubmit={onSubmit}
      onClose={confirm.onClose}
      isOpen={confirm.isOpen}
      disabled={loading}
    />
  );
};

export default DownloadFilesConfirm;
