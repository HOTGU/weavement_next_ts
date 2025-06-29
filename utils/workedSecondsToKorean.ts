import { intervalToDuration } from "date-fns";

export function workedSecondsToKorean(workedSeconds: number) {
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
}
