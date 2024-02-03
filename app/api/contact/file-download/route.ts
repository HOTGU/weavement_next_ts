import { contactS3 } from "@/libs/s3config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: body.key,
    });

    const response = await contactS3.send(command);

    const base64Data = await response.Body?.transformToString("base64");
    const contentType = response.ContentType;

    return NextResponse.json({ contentType, base64Data }, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
