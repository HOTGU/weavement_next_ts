export type OptionType = {
  value: string;
  label: string;
};

export default () => {
  const stepOptions: OptionType[] = [
    { value: "기획,예편", label: "기획 및 예산편성" },
    { value: "디자인,설계", label: "디자인 및 설계" },
    { value: "제작", label: "제작" },
  ];

  const hasDesignOptions: OptionType[] = [
    { value: "2D디자인(사진포함)", label: "2D디자인(사진포함)" },
    { value: "3D디자인", label: "3D디자인" },
    { value: "도면", label: "도면" },
    { value: "아니오", label: "아니오" },
  ];

  const costOptions: OptionType[] = [
    { value: "100만원이하", label: "100만원이하" },
    { value: "300만원이하", label: "100만원~300만원" },
    { value: "500만원이하", label: "300만원~500만원" },
    { value: "1000만원이하", label: "500만원~1000만원" },
    { value: "2000만원이하", label: "1000만원~2000만원" },
    { value: "5000만원이하", label: "2000만원~5000만원" },
    { value: "1억원이하", label: "5000만원~1억원" },
    { value: "1억원이상", label: "1억원이상" },
    { value: "알수없음", label: "알수없음" },
  ];

  const scheduleOptions: OptionType[] = [
    { value: "1개월내", label: "시급해요!(1개월내)" },
    { value: "3개월내", label: "1개월~3개월" },
    { value: "3개월이상", label: "3개월이상" },
    { value: "알수없음", label: "알수없음" },
  ];

  const knowPlatformOptions: OptionType[] = [
    { value: "블로그", label: "블로그" },
    { value: "홈페이지", label: "홈페이지" },
    { value: "인스타그램", label: "인스타그램" },
    { value: "페이스북", label: "페이스북" },
    { value: "유튜브", label: "유튜브" },
    { value: "기존고객", label: "기존고객" },
    { value: "소개", label: "소개" },
    { value: "기타", label: "기타" },
    { value: "알수없음", label: "알수없음" },
  ];

  const stateOptions: OptionType[] = [
    { value: "문의", label: "문의" },
    { value: "상담", label: "상담" },
    { value: "계약", label: "계약" },
    { value: "미수신", label: "미수신" },
    { value: "불발", label: "불발" },
    { value: "완료", label: "완료" },
  ];

  const pmOptions: OptionType[] = [
    { value: "미정", label: "미정" },
    { value: "SH", label: "SH" },
    { value: "DW", label: "DW" },
  ];

  const contactPathOptions: OptionType[] = [
    { value: "홈페이지", label: "홈페이지" },
    { value: "대표전화(HP)", label: "대표전화(HP)" },
    { value: "블로그(전화)", label: "블로그(전화)" },
    { value: "블로그(문자)", label: "블로그(문자)" },
    { value: "대표메일", label: "대표메일" },
    { value: "카카오톡", label: "카카오톡" },
    { value: "카카오톡(채널)", label: "카카오톡(채널)" },
    { value: "인스타(전화)", label: "인스타(전화)" },
    { value: "인스타(문자)", label: "인스타(문자)" },
    { value: "인스타(DM)", label: "인스타(DM)" },
    { value: "유튜브(전화)", label: "유튜브(전화)" },
    { value: "유튜브(문자)", label: "유튜브(문자)" },
    { value: "기타", label: "기타" },
  ];

  const meterialOptions: OptionType[] = [
    { value: "EPS", label: "EPS" },
    { value: "목재", label: "목재" },
    { value: "FRP", label: "FRP" },
    { value: "금속", label: "금속" },
    { value: "3D프린팅", label: "3D프린팅" },
    { value: "패브릭", label: "패브릭" },
    { value: "에어", label: "에어" },
    { value: "ALC", label: "ALC" },
    { value: "폼보드", label: "폼보드" },
    { value: "포맥스", label: "포맥스" },
    { value: "종이", label: "종이" },
    { value: "레진", label: "레진" },
    { value: "디자인", label: "디자인" },
    { value: "기타", label: "기타" },
  ];

  return {
    stepOptions,
    hasDesignOptions,
    costOptions,
    scheduleOptions,
    knowPlatformOptions,
    stateOptions,
    pmOptions,
    contactPathOptions,
    meterialOptions,
  };
};
