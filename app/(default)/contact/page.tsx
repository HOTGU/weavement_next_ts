import ContactClient from "@/components/screens/contact/ContactClient";
import React from "react";
import metadataConfig from "@/constants/metadataConfig";
import Container from "@/components/Container";
import PaddingSection from "@/components/global/PaddingSection";
import Input from "@/components/global/Input";
import Select from "@/components/global/Select";
import getSelectOptions from "@/actions/getSelectOptions";
import Textarea from "@/components/global/Textarea";
import Radio from "@/components/global/Radio";
import FileInput from "@/components/global/FileInput";
import ReverseUnderlineText from "@/components/framer/ReverseUnderlineText";

export const metadata = metadataConfig.contactMetadata;

const FormColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <div className=" font-ibm text-3xl font-[300] mb-4">{children}</div>
);

const ContactPage = () => {
  const { costOptions, hasDesignOptions, scheduleOptions } = getSelectOptions();
  return (
    <div className="bg-black min-h-screen text-slate-200">
      <PaddingSection size="lg" />
      <Container>
        <div className="flex justify-between ">
          <div className=" space-y-10 w-[33%] font-ibm">
            <div className="text-6xl">함께 이야기해요</div>
            <div className="text-2xl whitespace-pre-wrap break-keep font-[200]">
              어떤 걸 만들고 싶으신지, 그리고 저희가 어떻게 도움 드리면 좋을지
              들려주세요.
            </div>
          </div>

          <div className="w-1/2">
            <form action="">
              <FormColumnTitle>프로젝트 정보</FormColumnTitle>
              <Textarea
                name="description"
                label="어떤 걸 만들고 싶으신가요? *"
                required
              />
              <Select
                name="cost"
                options={costOptions}
                label="예산을 선택해주세요 *"
                required
              />
              <Radio
                options={hasDesignOptions}
                name="hasDesign"
                label="디자인을 가지고 계신가요 *"
                required
              />
              <Radio
                options={scheduleOptions}
                name="schedule"
                label="일정을 선택해주세요 *"
                required
              />
              <FileInput label="참고사진 (최대5개)" name="file" />

              <PaddingSection size="sm" />

              <FormColumnTitle>고객 정보</FormColumnTitle>
              <Input name="clientCompany" label="회사명" />
              <Input name="name" label="성함 *" required />
              <Input name="position" label="직급" />
              <Input name="phone" label="번호 *" />
              <Input name="email" label="이메일 *" />

              <PaddingSection size="sm" />

              <ReverseUnderlineText label="제출하기" color="white" size="lg" />

              <PaddingSection size="lg" />
            </form>
          </div>
        </div>
      </Container>
    </div>
    // <div className="pt-14 min-h-screen">
    //   <ContactClient />
    // </div>
  );
};

export default ContactPage;
