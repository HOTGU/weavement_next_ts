import getCurrentUser from "@/actions/getCurrentUser";
import createBlurImage from "@/libs/createBlurImage";
import prisma from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.error();
    if (!currentUser.isAdmin) return NextResponse.error();

    const data = await request.formData();
    const images = new Array();
    const imagesLocation = new Array();

    data.forEach((value, key) => {
      if (key === "images") {
        images.push(value);
      }
    });
    const thumb = data.get("thumb") as File;
    const title = data.get("title") as string;
    const dataCategory = data.get("category") as string;
    const isRep = data.get("isRep") ? true : false;
    const description = data.get("description") as string;
    const metaTitle = data.get("metaTitle") as string;
    const metaDescription = data.get("metaDescription") as string;
    const dataMetaKeywords = data.get("metaKeywords") as string;

    const category = dataCategory ? dataCategory.split(",") : [];
    const metaKeywords = dataMetaKeywords ? dataMetaKeywords.split(",") : [];

    //create blur image
    const blurThumb = await createBlurImage(thumb);

    const thumbLocation = await s3PutImage({
      folderName: title,
      file: thumb,
      type: "PORTFOLIO",
      resizeWidth: 2560,
      isRep,
    });

    for (let i = 0; i < images.length; i++) {
      const imageLocation = await s3PutImage({
        folderName: title,
        file: images[i],
        resizeWidth: 768,
        type: "PORTFOLIO",
        isRep: false,
        setWatermark: true,
      });
      imagesLocation.push(imageLocation);
    }

    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        category,
        description,
        isRep,
        thumb: thumbLocation,
        images: imagesLocation,
        metaTitle,
        metaDescription,
        metaKeywords,
        blurThumb,
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
