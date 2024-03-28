import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { contactS3 } from "@/libs/s3config";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getPlaiceholder } from "plaiceholder";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const portfolios = await prisma.portfolio.findMany();

    portfolios.map(async (portfolio) => {
      const fileKey = portfolio.thumb.split("com/")[1];
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: fileKey,
      });

      const res = await contactS3.send(command);
      const stream = res.Body as Blob;

      //@ts-ignore
      const buffer = Buffer.concat(await stream.toArray());
      const { base64: blurData } = await getPlaiceholder(buffer, {
        size: 6,
      });

      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: {
          blurThumb: portfolio.blurThumb ? portfolio.blurThumb : blurData,
        },
      });
    });

    //create blur image

    return NextResponse.json("성공", { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
