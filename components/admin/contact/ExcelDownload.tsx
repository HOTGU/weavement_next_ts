"use client";

import { ContactWithClients } from "@/types";
import React from "react";
import { CSVLink } from "react-csv";
import { AiOutlineFileExcel } from "react-icons/ai";

interface ExcelDownloadProps {
  contacts: ContactWithClients[];
}
const ExcelDownload = ({ contacts }: ExcelDownloadProps) => {
  const headers = [
    { label: "순번", key: "key" },
    { label: "회사명", key: "clientCompany" },
  ];

  const data =
    contacts &&
    contacts.map((contact, i) => {
      return { key: i + 1, clientCompany: contact.clientCompany };
    });

  console.log(data);

  return (
    <CSVLink
      data={data}
      headers={headers}
      className="border cursor-pointer transition hover:opacity-70 w-fit px-2 h-9 rounded flex items-center justify-center gap-2"
    >
      <span>엑셀 다운로드</span>
      <AiOutlineFileExcel size={18} />
    </CSVLink>
  );
};

export default ExcelDownload;
