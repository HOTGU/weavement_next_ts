"use server";

import client from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { ActionResult, ContactFormData } from "@/types";
import { contactFormSchema } from "@/types/schema";
import { parseFormData } from "@/utils/parseFormData";
import z from "zod";

export const clientContactAddFormData = async (
  formData: FormData
): Promise<ActionResult<ContactFormData>> => {
  const { data, files } = parseFormData(formData, ["images"]);

  try {
    // 3️⃣ Zod 검증

    const zodData = contactFormSchema.parse({
      ...data,
    });

    // form에 images가 있을 때

    if (files.images.length > 5) {
      return {
        success: false,
        error: "이미지는 최대 5개까지 업로드 가능합니다",
      };
    }

    let imageUrls: string[] = [];

    if (files.images.length > 0) {
      try {
        imageUrls = await Promise.all(
          files.images.map((file, index) =>
            s3PutImage({
              folderName: zodData.name || "anonymous",
              file,
              type: "CONTACT",
              resizeWidth: 1200,
              isRep: index === 0,
            })
          )
        );
      } catch {
        return { success: false, error: "파일 업로드 중 오류발생" };
      }
    }

    // db 저장

    const { name, phone, email, position, ...contactBody } = zodData;
    const clientBody = { name, phone, email, position };

    const contact = await client.contact.create({
      data: {
        ...contactBody,
        images: imageUrls,
        client: {
          create: [
            {
              ...clientBody,
            },
          ],
        },
      },
    });

    return { success: true, data: {} };

    //     return { success: true, data: parsedData };
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err);
      return {
        success: false,
        error: err.issues.map((e) => e.message).join("\n"), // ✅ 모달용 단순 문자열
      };
    }
    return {
      success: false,
      error:
        "알 수 없는 오류가 발생했습니다\ncontact@weavement.co.kr로 연락부탁합니다",
    };
  }
};
