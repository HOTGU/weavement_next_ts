import getCurrentUser from "@/actions/getCurrentUser";
import createBlurImage from "@/libs/createBlurImage";
import prisma from "@/libs/prismadb";
import s3PutImage from "@/libs/s3PutImage";
import { NextResponse } from "next/server";

// 문자열 또는 JSON 배열을 string[]으로 변환
function parseStringArray(value: FormDataEntryValue | null): string[] {
  if (typeof value !== "string" || !value.trim()) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === "string") return item.trim();

          if (
            typeof item === "object" &&
            item !== null &&
            "value" in item &&
            typeof item.value === "string"
          ) {
            return item.value.trim();
          }

          return "";
        })
        .filter(Boolean);
    }
  } catch {
    // JSON이 아닌 기존 쉼표 구분 문자열도 지원
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function POST(request: Request) {
  try {
    // 관리자 권한 확인
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    if (!currentUser.isAdmin) {
      return NextResponse.json(
        { message: "권한이 없습니다." },
        { status: 403 },
      );
    }

    const data = await request.formData();

    // 이미지 파일 수집
    const images: File[] = [];

    data.forEach((value, key) => {
      if (key === "images" && value instanceof File) {
        images.push(value);
      }
    });

    // 썸네일
    const thumbValue = data.get("thumb");

    if (!(thumbValue instanceof File) || thumbValue.size === 0) {
      return NextResponse.json(
        { message: "썸네일 이미지를 선택해주세요." },
        { status: 400 },
      );
    }

    const thumb = thumbValue;

    // 기본 정보
    const title = String(data.get("title") ?? "").trim();
    const slug = String(data.get("slug") ?? "").trim();
    const description = String(data.get("description") ?? "").trim();

    if (!title || !slug || !description) {
      return NextResponse.json(
        { message: "제목, 슬러그, 설명은 필수 항목입니다." },
        { status: 400 },
      );
    }

    // 선택 정보
    const subtitle = String(data.get("subtitle") ?? "").trim();
    const challenge = String(data.get("challenge") ?? "").trim();
    const solution = String(data.get("solution") ?? "").trim();
    const clientCompany = String(data.get("clientCompany") ?? "").trim();
    const size = String(data.get("size") ?? "").trim();
    const projectDate = String(data.get("projectDate") ?? "").trim();
    const location = String(data.get("location") ?? "").trim();

    // 배열 데이터
    const category = parseStringArray(data.get("category"));
    const material = parseStringArray(data.get("material"));
    const metaKeywords = parseStringArray(data.get("metaKeywords"));

    // SEO
    const metaTitle = String(data.get("metaTitle") ?? "").trim();
    const metaDescription = String(data.get("metaDescription") ?? "").trim();

    // 문자열 "false"가 true로 처리되지 않도록 정확하게 비교
    const isRep = data.get("isRep") === "true";

    // 이미지 설명 배열
    let imageCaptions: string[] = [];

    const rawCaptions = data.get("imageCaptions");

    if (typeof rawCaptions === "string" && rawCaptions.trim()) {
      try {
        const parsed: unknown = JSON.parse(rawCaptions);

        if (!Array.isArray(parsed)) {
          return NextResponse.json(
            { message: "이미지 설명 데이터가 올바르지 않습니다." },
            { status: 400 },
          );
        }

        imageCaptions = parsed.map((caption) =>
          typeof caption === "string" ? caption.trim() : "",
        );
      } catch {
        return NextResponse.json(
          { message: "이미지 설명 데이터가 올바르지 않습니다." },
          { status: 400 },
        );
      }
    }

    // 썸네일 블러 이미지 생성
    const blurThumb = await createBlurImage(thumb);

    // 썸네일 S3 업로드
    const thumbLocation = await s3PutImage({
      folderName: title,
      file: thumb,
      type: "PORTFOLIO",
      resizeWidth: 5120,
      isRep,
    });

    // 본문 이미지 S3 업로드
    const imagesLocation: string[] = [];

    for (const image of images) {
      const imageLocation = await s3PutImage({
        folderName: title,
        file: image,
        resizeWidth: 768,
        type: "PORTFOLIO",
        isRep: false,
        setWatermark: true,
      });

      imagesLocation.push(imageLocation);
    }

    // 이미지 URL과 설명의 인덱스를 일치시킴
    imageCaptions = imagesLocation.map(
      (_, index) => imageCaptions[index] ?? "",
    );

    // DB 저장
    const portfolio = await prisma.portfolio.create({
      data: {
        title,
        slug,
        subtitle: subtitle || null,
        description,
        challenge: challenge || null,
        solution: solution || null,
        clientCompany: clientCompany || null,
        size: size || null,
        projectDate: projectDate || null,
        location: location || null,

        category,
        material,

        isRep,
        thumb: thumbLocation,
        blurThumb,
        images: imagesLocation,
        imageCaptions,

        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        metaKeywords,
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Portfolio 생성 오류:", error);
    }

    return NextResponse.json(
      { message: "포트폴리오 저장 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
