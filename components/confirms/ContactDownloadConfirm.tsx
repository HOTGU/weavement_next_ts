"use client";

import React, { useEffect, useRef, useState } from "react";
import { CSVLink } from "react-csv";

import Confirm from "./Confirm";
import useContactDownloadConfirm from "@/hooks/useContactDownloadConfirm";
import { format } from "date-fns/esm";
import axios from "axios";
import { ContactWithClients } from "@/types";
import { toast } from "react-hot-toast";

interface IFetchData {
  data: ContactWithClients[];
}

type IExcelData = any;

const ContactDownloadConfirm = () => {
  const confirm = useContactDownloadConfirm();
  const [excelData, setExcelData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const csvRef = useRef<any>([]);

  const headers = [
    { label: "순번", key: "key" },
    { label: "상태", key: "state" },
    { label: "날짜", key: "createdAt" },
    { label: "회사", key: "clientCompany" },
    { label: "고객", key: "client" },
    { label: "단계", key: "step" },
    { label: "예산", key: "cost" },
    { label: "디자인여부", key: "hasDesign" },
    { label: "일정", key: "schedule" },
    { label: "유입플랫폼", key: "knowPlatform" },
    { label: "문의경로", key: "contactPath" },
    { label: "문의내용", key: "description" },
    { label: "PM", key: "pm" },
    { label: "소재", key: "meterial" },
    { label: "크기", key: "size" },
    { label: "콘텐츠", key: "content" },
    { label: "협력사", key: "orderCompany" },
    { label: "납기일", key: "deadline" },
    { label: "상담내용", key: "note" },
  ];

  const excelDownload = async () => {
    setLoading(true);
    const toastId = toast.loading("다운로드중..");

    axios
      .get("/api/contact")
      .then((res) => {
        const { data }: IFetchData = res;

        const convertData: any = data.map((contact, i) => {
          const {
            state,
            createdAt,
            clientCompany,
            client,
            step,
            cost,
            hasDesign,
            schedule,
            knowPlatform,
            contactPath,
            description,
            pm,
            meterial,
            size,
            content,
            orderCompany,
            deadline,
            note,
          } = contact;

          return {
            key: i + 1,
            state,
            createdAt: format(
              new Date(createdAt),
              "yy년MM월dd일 hh:mmaaaaa'm'"
            ),
            clientCompany,
            client:
              client &&
              client.length > 0 &&
              client.map((c) => {
                return `${c.name}${c.position} ${c.phone} ${c.email}\n`;
              }),
            step,
            cost,
            hasDesign,
            schedule,
            knowPlatform,
            contactPath,
            description: description
              ? description
                  .replace(/(<\/p>)/gi, "\n")
                  .replace(/(<li>)/gi, "*")
                  .replace(/(<([^>]+)>)/gi, "")
              : "",
            pm,
            meterial,
            size,
            content,
            orderCompany,
            deadline: deadline
              ? format(new Date(deadline), "yy년MM월dd일 hh:mmaaaaa'm'")
              : "",
            note: note
              ? note
                  .replace(/(<\/p>)/gi, "\n")
                  .replace(/(<li>)/gi, "*")
                  .replace(/(<([^>]+)>)/gi, "")
              : "",
          };
        });

        setExcelData(convertData);
        toast.success("다운로드 성공", { id: toastId });
      })
      .catch((error) => {
        console.log(error);
        toast.error("다운로드 실패", { id: toastId });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (excelData && csvRef && csvRef.current && csvRef.current.link) {
      setTimeout(() => {
        csvRef.current.link.click();
        confirm.onClose();
        setExcelData([]);
      });
    }
  }, [excelData]);

  return (
    <>
      {excelData.length > 0 ? (
        <CSVLink
          data={excelData}
          headers={headers}
          className="hidden"
          ref={csvRef}
          target="_blank"
          filename={`${format(new Date(), "yy년 MM월 dd일 - 문의자료")}`}
        ></CSVLink>
      ) : undefined}
      <Confirm
        isOpen={confirm.isOpen}
        onClose={confirm.onClose}
        text="엑셀자료를 다운 받으시겠습니까?"
        onSubmit={excelDownload}
        disabled={loading}
      />
    </>
  );
};

export default ContactDownloadConfirm;
