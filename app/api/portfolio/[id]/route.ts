import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function PUT(request: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const { id } = params;

    if (!id || typeof id !== "string") return new Error("Invalid ID");

    const data = await request.formData();
    const images = new Array();
    const imagesLocation = new Array();

    const title = data.get("title") as string;
    const isRep = data.get("isRep");
    const description = data.get("description") as string;

    data.forEach((value, key) => {
      if (key === "oldImages") {
        imagesLocation.push(value);
      }
      if (key === "images") {
        images.push(value);
      }
    });

    for (let i = 0; i < images.length; i++) {
      const imageLocation = await s3PutImage({
        folderName: title,
        file: images[i],
        resizeWidth: 768,
        type: "PORTFOLIO",
      });
      imagesLocation.push(imageLocation);
    }

    let thumbLocation = data.get("oldThumb") as string;

    if (data.get("thumb")) {
      const thumb = data.get("thumb") as File;
      thumbLocation = await s3PutImage({
        folderName: title,
        file: thumb,
        type: "PORTFOLIO",
        resizeWidth: 2560,
      });
    }

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title,
        description,
        isRep: isRep ? true : false,
        thumb: thumbLocation,
        images: imagesLocation,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const { id } = params;

    if (!id || typeof id !== "string") return new Error("Invalid ID");

    await prisma.portfolio.delete({ where: { id } });

    return new NextResponse("삭제 성공", { status: 200 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
