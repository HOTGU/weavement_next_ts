import { contactS3 } from "@/libs/s3config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import sharpResize from "./sharpResize";

const returnCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return `${year}년${month}월${day}일${hour}시${minutes}분`;
};

interface PutImageParams {
  folderName: string;
  file: File;
  type: "CONTACT" | "PORTFOLIO";
  resizeWidth?: number;
  isRep?: boolean;
}

export default async ({
  folderName,
  file,
  type,
  resizeWidth,
  isRep = false,
}: PutImageParams) => {
  let bufferData = (await file.arrayBuffer()) as Buffer;

  if (resizeWidth) {
    bufferData = await sharpResize(bufferData, resizeWidth);
  }

  try {
    const input = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${type}/${
        process.env.NODE_ENV
      }/${folderName}/${returnCurrentDate()}__${file.name}${
        isRep && "__대표사진"
      }`,
      Body: bufferData,
    };

    await contactS3.send(new PutObjectCommand(input));

    return `${process.env.AWS_S3_DOMAIN}/${input.Key}`;
  } catch (error) {
    throw new Error("업로드 실패");
  }
};
