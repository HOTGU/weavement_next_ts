import getCurrentUser from "@/actions/getCurrentUser";
import createBlurImage from "@/libs/createBlurImage";
import prisma from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    if (!currentUser.isAdmin)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const { id } = params;

    if (!id || typeof id !== "string")
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const data = await request.formData();

    const images = new Array();
    const imagesLocation = new Array();

    let body = {} as any;

    data.forEach((value, key) => {
      if (key === "oldImages") {
        imagesLocation.push(value);
      } else if (key === "images") {
        images.push(value);
      } else if (key === "isRep") {
        body[key] = value ? true : false;
      } else {
        body[key] = value;
      }
    });

    for (let i = 0; i < images.length; i++) {
      const imageLocation = await s3PutImage({
        folderName: body.title,
        file: images[i],
        resizeWidth: 768,
        type: "PORTFOLIO",
        setWatermark: true,
      });
      imagesLocation.push(imageLocation);
    }

    let thumbLocation = body.oldThumb;

    if (body.thumb) {
      body.blurThumb = await createBlurImage(body.thumb);
      thumbLocation = await s3PutImage({
        folderName: body.title,
        file: body.thumb,
        type: "PORTFOLIO",
        resizeWidth: 2560,
        isRep: body.isRep,
      });
    }

    delete body.oldThumb; // 지우지 않으면 포트폴리오 업데이트 시 프리즈마 오류발생

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        ...body,
        thumb: thumbLocation,
        images: imagesLocation,
      },
    });

    return NextResponse.json(portfolio, { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return NextResponse.json("서버 오류발생", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    if (!currentUser.isAdmin)
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    const { id } = params;

    if (!id || typeof id !== "string")
      return NextResponse.json(
        { message: "인증되지 않은 경로입니다" },
        { status: 401 }
      );

    await prisma.portfolio.delete({ where: { id } });

    return NextResponse.json("삭제 성공", { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return NextResponse.json({ message: "서버 오류발생" }, { status: 500 });
  }
}
