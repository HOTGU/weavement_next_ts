import bcrypt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { admin_id, password, verifyPassword, username } = body;

    if (!admin_id || !password || !verifyPassword)
      return new NextResponse("필수항목을 입력하세요", { status: 400 });

    if (password !== verifyPassword)
      return new NextResponse("비밀번호 확인이 다릅니다", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        admin_id,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    if (error?.code === "P2002")
      return new NextResponse("이메일이 존재합니다", { status: 400 });
    return new NextResponse("서버 오류발생", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { isAdmin, password, verifyPassword, id, username } = body;

    if (!id)
      return NextResponse.json(
        { message: "잘못된 경로입니다." },
        { status: 400 }
      );

    let dataQuery = { isAdmin, username } as any;

    if (password && verifyPassword) {
      if (password !== verifyPassword)
        return NextResponse.json(
          { message: "비밀번호 확인이 다릅니다" },
          { status: 400 }
        );
      const hashedPassword = await bcrypt.hash(password, 12);
      dataQuery.password = hashedPassword;
    }

    const user = await prisma.user.update({
      where: { id },
      data: dataQuery,
    });

    return NextResponse.json(user);
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    if (error?.code === "P2002")
      return NextResponse.json(
        { message: "이메일이 존재합니다" },
        { status: 400 }
      );
    return NextResponse.json({ message: "서버 오류발생" }, { status: 500 });
  }
}
