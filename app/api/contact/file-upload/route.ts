import s3PutImage from "@/libs/s3PutImage";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const fd = await request.formData();

    const imageLocations = new Array();
    const files = new Array();

    fd.forEach(async (value, key) => {
      if (key === "files") {
        files.push(value);
      }
    });

    for (let index = 0; index < files.length; index++) {
      const location = await s3PutImage({
        folderName: fd.get("company") as string,
        file: files[index] as File,
        type: "CONTACT",
        resizeWidth: 600,
      });
      imageLocations.push(location);
    }

    return NextResponse.json(imageLocations);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    console.log(error);
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}
