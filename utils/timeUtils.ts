import { intervalToDuration } from "date-fns";

export const workedSecondsToKorean = (workedSeconds: number) => {
  const duration = intervalToDuration({
    start: 0,
    end: workedSeconds * 1000,
  });

  // 0인 단위는 생략
  return (
    (
      (duration.hours ? `${duration.hours}시간 ` : "") +
      (duration.minutes ? `${duration.minutes}분 ` : "") +
      (duration.seconds ? `${duration.seconds}초` : "")
    ).trim() || "0초"
  );
};

export const getKstDayRange = (date: Date) => {
  const KST_OFFSET_MS = 9 * 60 * 60 * 1000; // 9시간 밀리초

  // 1) 입력된 UTC Date를 밀리초로 가져와 KST 시간으로 이동
  const kstTs = date.getTime() + KST_OFFSET_MS;
  const kstDate = new Date(kstTs);

  // 2) KST 기준 연/월/일 가져오기 (UTC getter 사용)
  const year = kstDate.getUTCFullYear();
  const month = kstDate.getUTCMonth();
  const day = kstDate.getUTCDate();

  // 3) KST 자정(00:00) UTC 타임스탬프: Date.UTC(year, month, day) - offset
  const startUtcTs = Date.UTC(year, month, day, 0, 0, 0, 0) - KST_OFFSET_MS;
  // 4) KST 다음날 자정 1ms 전(23:59:59.999) UTC 범위
  const endUtcTs = startUtcTs + 24 * 60 * 60 * 1000 - 1;

  return {
    startUtc: new Date(startUtcTs),
    endUtc: new Date(endUtcTs),
  };
};
