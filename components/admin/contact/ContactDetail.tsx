"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import DOMpurify from "dompurify";
import { BsFillImageFill } from "react-icons/bs";
import { ImFolderUpload } from "react-icons/im";

import useCurrentContact from "@/hooks/useCurrentContact";
import useUpdateModal from "@/hooks/useUpdateModal";
import useAddClientModal from "@/hooks/useAddClientModal";
import useFileModal from "@/hooks/useFileModal";

import ClientBlock from "./ClientBlock";
import ContactImages from "./ContactImages";
import useDeleteContactConfirm from "@/hooks/useDeleteContactConfirm";

interface ItemProps {
  label: string;
  item: any;
  isDate?: boolean;
  isNote?: boolean;
  column?: boolean;
  full?: boolean;
  onClick?: () => void;
}

const Item = ({
  label,
  item,
  column,
  isDate,
  isNote,
  full,
  onClick,
}: ItemProps) => {
  return (
    <div
      className={`flex gap-2 ${column ? "flex-col" : "flex-row"} ${
        full ? " w-full" : "w-fit"
      }`}
      onClick={onClick}
    >
      <span className="text-neutral-400">{label}</span>
      <span className=" whitespace-pre-wrap">
        {isDate ? (
          <>
            {item ? (
              format(new Date(item), "MM월dd일 hh시mm분")
            ) : (
              <span className="text-gray-600 font-light">안정해짐</span>
            )}
          </>
        ) : (
          <>
            {item ? (
              isNote ? (
                <span
                  dangerouslySetInnerHTML={{ __html: DOMpurify.sanitize(item) }}
                ></span>
              ) : (
                item
              )
            ) : (
              <span className="text-gray-600 font-light">모름</span>
            )}
          </>
        )}
      </span>
    </div>
  );
};

const ContactDetail = () => {
  const [showImage, setShowImage] = useState(false);
  const { current } = useCurrentContact();
  const updateModal = useUpdateModal();
  const addClientModal = useAddClientModal();
  const fileModal = useFileModal();
  const deleteContactConfirm = useDeleteContactConfirm();

  if (!current)
    return <span className=" text-xl font-semibold">위브먼트 화이팅🫡</span>;

  return (
    <>
      <ContactImages
        images={current.images}
        show={showImage}
        setShow={setShowImage}
      />
      <div>
        <div className="flex items-center justify-between whitespace-nowrap">
          <span className="text-3xl sm:text-5xl font-bold truncate">
            {current.clientCompany}
          </span>
          <span
            className=" bg-rose-500 text-white px-2 rounded cursor-pointer hover:opacity-70 transition"
            onClick={() => deleteContactConfirm.onOpen(current.id)}
          >
            삭제
          </span>
        </div>
        <div className="mb-4 sm:mb-9 mt-0 sm:mt-2 flex flex-col sm:flex-row gap-0 sm:gap-4">
          <div
            className="text-neutral-400 cursor-pointer hover:underline"
            onClick={addClientModal.onOpen}
          >
            클라이언트
          </div>
          <div className="flex flex-col gap-1">
            {current.client.map((client, index) => (
              <ClientBlock client={client} key={client.id} />
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="text-xl font-semibold mb-2 sm:mb-4 flex items-center gap-4">
              <span
                className="cursor-pointer hover:underline"
                onClick={() => updateModal.onOpen("INFO")}
              >
                문의내용
              </span>
              {current.images.length > 0 ? (
                <div
                  className="hover:text-accent transition cursor-pointer"
                  onClick={() => setShowImage(true)}
                >
                  <BsFillImageFill />
                </div>
              ) : (
                <div
                  className="hover:text-accent transition cursor-pointer"
                  onClick={() => fileModal.onOpen()}
                >
                  <ImFolderUpload />
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <Item label="단계" item={current.step} />
              <Item label="디자인" item={current.hasDesign} />
              <Item label="예산" item={current.cost} />
              <Item label="일정" item={current.schedule} />
              <Item label="문의경로" item={current.contactPath} />
              <Item label="알게된경로" item={current.knowPlatform} />
              <div
                onClick={() => {
                  updateModal.onOpen("DESC");
                }}
                className="w-full cursor-pointer hover:underline"
              >
                <Item label="문의노트" item={current.description} column full />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div
              className="text-xl font-semibold mb-4 cursor-pointer hover:underline"
              onClick={() => updateModal.onOpen("PROJECT")}
            >
              상담내용
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                <Item
                  label="소재"
                  item={current.meterial
                    .map((meterial) => ` ${meterial}`)
                    .toString()}
                />
                <Item label="콘텐츠" item={current.content} />
                <Item label="크기" item={current.size} />
                <Item label="납기일" item={current?.deadline} isDate />
                <Item label="협력사" item={current.orderCompany} />
                <Item label="담당자" item={current.pm} />
                <div
                  onClick={() => {
                    updateModal.onOpen("NOTE");
                  }}
                  className="w-full cursor-pointer hover:underline"
                >
                  <Item
                    label="상담노트"
                    item={current.note}
                    full
                    column
                    isNote
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
