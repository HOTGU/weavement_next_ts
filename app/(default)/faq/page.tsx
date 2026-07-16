import metadataConfig from "@/constants/metadataConfig";

const faqs = [
  {
    question: "디자인 파일이 있어야 하나요?",
    answer: `아니요. 파일이 있다면 더 빠르고 정확한 상담이 가능하겠지만, 스케치나 레퍼런스만 전달주셔도 진행 가능합니다. 위브먼트의 디자인팀과 함께 '캐릭터 개발' 혹은 '디자인 기획'도 가능합니다.`,
  },
  {
    question: "조형물 제작에 어떤 소재가 사용되나요?",
    answer:
      "'EPS(스티로폼), 패브릭, FRP, PET, 공기 조형물' 등 폭넓은 소재로 조형물 제작이 가능하며, 앞으로도 고객님의 니즈에 맞춰 더 많은 소재들이 추가될 예정입니다.",
  },
  {
    question: "주문 과정은 어떻게 되나요?",
    answer:
      "주문은 [디자인 확인 ➡️ 상담 및 견적 ➡️ 계약 ➡️ 맞춤 제작 ➡️ 안전 배송 및 설치] 단계로 진행됩니다.",
  },
  {
    question: "계약은 어떻게 하나요?",
    answer: "실물 계약부터 나라장터, 전자계약까지 모두 가능합니다.",
  },
  {
    question: "카드 결제 가능한가요?",
    answer: "카드 결제 가능합니다.",
  },
  {
    question: "영업시간은 어떻게 되나요?",
    answer: "월-금 오전10시~오후6시 입니다. (공휴일 제외)",
  },
  {
    question: "방문 상담 가능한가요?",
    answer: "네 가능합니다. 방문 전 일정을 예약 해주세요.",
  },
  {
    question: "배송은 어떻게 진행되나요?",
    answer: "화물 운송으로 전국 내 지정 장소에 당일 납품됩니다.",
  },
  {
    question: "제작 기간은 어떻게 되나요?",
    answer:
      "제작 기간은 조형물 소재, 디자인 등에 따라 상이하므로 상담을 통해 정확한 일정을 확인하실 수 있어요.",
  },
  {
    question: "제작 과정을 확인할 수 있나요?",
    answer:
      "모든 과정은 담당 디렉터를 통해 사진, 영상 등으로 전달받을 수 있고, 전 공정 100% 국내 제작되어 방문 검수도 가능합니다.",
  },
  {
    question: "제작 현장 검수 가능한가요?",
    answer: "네 가능합니다. 방문 전 일정을 예약 해주세요.",
  },
  {
    question: "소량 제작도 가능한가요?",
    answer:
      "네, 위브먼트는 MOQ(최소 주문 수량)가 없어, 1개부터 제작이 가능합니다.",
  },
  {
    question: "운송, 설치도 가능한가요?",
    answer:
      "네, 위브먼트는 디자인부터 제작, 운송, 설치까지 조형물 제작에 필요한 전 과정을 제공합니다.",
  },
  {
    question: "하자 및 보수(AS)도 가능한가요?",
    answer:
      "제작상의 하자는 납품 후 1년간 무상 AS를 보장합니다. 사용 중 발생한 파손이나 노후화로 인한 보수는 유상으로 신속하게 처리해 드립니다.",
  },
  {
    question: "납품 후 조형물은 어떻게 관리해야하나요?",
    answer:
      "소재별 맞춤 관리법이 다르므로, 제작 완료 후 담당 디렉터가 오랫동안 깨끗하게 유지할 수 있는 관리 가이드를 친절히 안내해 드립니다.",
  },
];

export const metadata = metadataConfig.faqMetadata;

export default function FAQPage() {
  return (
    <section className="max-w-6xl mx-auto py-32">
      <h1 className="text-7xl font-bold mb-10">FAQ</h1>
      <p className="text-lg text-zinc-400 max-w-2xl mb-20">
        조형물 제작 과정에서 가장 많이 문의해주시는 내용을 정리했습니다.
        <br />
        원하는 답변이 없다면 언제든 문의해주세요.
      </p>

      <div className="border-t border-zinc-300">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="border-b border-zinc-300 group"
          >
            <summary
              className="
                list-none cursor-pointer
                flex justify-between items-center
                py-8 text-2xl font-medium
              "
            >
              <h2>{faq.question}</h2>

              <span
                className="
                  transition-transform duration-300
                  group-open:rotate-45
                "
              >
                +
              </span>
            </summary>

            <p
              className="pb-8 text-zinc-600 font-bold leading-relaxed w-2/3  break-keep
  whitespace-pre-line"
            >
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
