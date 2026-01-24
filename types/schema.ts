import { z } from "zod";

export const hasDesignEnum = z.enum(
  ["2D디자인(사진포함)", "3D디자인", "도면", "아니오"] as const,
  {
    message: "디자인 여부를 선택해주세요.",
  }
);

export const costEnum = z.enum(
  [
    "100만원이하",
    "300만원이하",
    "500만원이하",
    "1000만원이하",
    "2000만원이하",
    "5000만원이하",
    "1억원이하",
    "1억원이상",
    "알수없음",
  ] as const,
  {
    message: "예산을 선택해주세요.",
  }
);

export const knowPlatformEnum = z.enum(
  [
    "블로그",
    "홈페이지",
    "인스타그램",
    "페이스북",
    "유튜브",
    "기존고객",
    "소개",
    "크몽",
    "기타",
    "알수없음",
  ] as const,
  {
    message: "알게 된 경로를 선택해주세요.",
  }
);

export const scheduleEnum = z.enum(
  ["1개월내", "3개월내", "3개월이상", "알수없음"] as const,
  { message: "일정을 선택해주세요." }
);

export const contactFormSchema = z.object({
  description: z.string().min(1, "프로젝트 설명을 입력해주세요."),
  cost: costEnum,
  hasDesign: hasDesignEnum,
  schedule: scheduleEnum,
  clientCompany: z.string().optional(),
  name: z.string().min(1, "이름을 입력해주세요."),
  position: z.string().optional(),
  phone: z.string().min(1, "전화번호를 입력해주세요."),
  email: z.string().email("유효한 이메일을 입력해주세요."),
  knowPlatform: knowPlatformEnum,
});
