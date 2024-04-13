"use client";

import useContactDownloadConfirm from "@/hooks/useContactDownloadConfirm";
import React from "react";
import { AiOutlineFileExcel } from "react-icons/ai";

const ExcelDownload = () => {
  const contactDownloadConfirm = useContactDownloadConfirm();
  return (
    <>
      <div
        onClick={contactDownloadConfirm.onOpen}
        className="border cursor-pointer transition hover:bg-accent hover:text-white w-[160px] px-2 h-9 rounded items-center justify-center gap-2 hidden md:flex"
      >
        <div>엑셀 다운로드</div>
        <AiOutlineFileExcel size={18} />
      </div>
    </>
  );
};

export default ExcelDownload;
