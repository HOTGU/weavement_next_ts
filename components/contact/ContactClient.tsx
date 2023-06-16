"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "react-hot-toast";

import ContactCreateForm from "../forms/ContactCreateForm";
import Container from "../Container";
import Select from "../inputs/Select";
import getSelectOptions from "@/actions/getSelectOptions";
import Input from "../inputs/Input";
import Textarea from "../inputs/Textarea";
import { useRouter } from "next/navigation";
import File from "../inputs/File";

enum STEPS {
  INFO = 0,
  DESC = 1,
  FILE = 2,
  CLIENT = 3,
  ACCEPT = 4,
}

export const contactDefaultValues = {
  createdAt: undefined,
  contactPath: "홈페이지",
  state: "문의",
  step: "",
  hasDesign: "",
  cost: "",
  schedule: "",
  pm: "미정",
  knowPlatform: "",
  description: "",
  clientCompany: "",
  name: "",
  phone: "",
  position: "",
  email: "",
  meterial: [],
  content: "",
  size: "",
  deadline: undefined,
  orderCompany: "",
  note: "",
  images: [],
};

const ContactClient = () => {
  const [step, setStep] = useState(STEPS.INFO);
  const [isAccept, setIsAccept] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const {
    stepOptions,
    hasDesignOptions,
    costOptions,
    scheduleOptions,
    knowPlatformOptions,
  } = getSelectOptions();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FieldValues>({
    defaultValues: contactDefaultValues,
  });

  useEffect(() => {
    if (files.length > 5) {
      const sliceArr = [...files].slice(0, 5);
      toast.error("사진은 최대 5장입니다");
      setFiles(sliceArr);
    }
  }, [files]);

  const onNext = () => setStep((step) => step + 1);
  const onBack = () => setStep((step) => step - 1);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.ACCEPT) {
      return onNext();
    }

    if (!isAccept) {
      return toast.error("개인정보 수집 동의를 하셔야 문의가능합니다");
    }

    setIsLoading(true);
    const loadingToast = toast.loading("문의생성중..");

    if (files.length > 0) {
      const fd = new FormData();
      files.map((file) => fd.append("files", file, file.name));
      fd.append("company", data.clientCompany);
      try {
        const res = await axios.post("/api/contact/file-upload", fd);
        if (res.status === 200) {
          data.images = res.data;
        }
      } catch (error) {
        toast.error("사진 올리는 도중 오류발생", { id: loadingToast });
        setIsLoading(false);
        return;
      }
    }

    axios
      .post("/api/contact", data)
      .then(() => {
        toast.success(
          `문의가 성공적으로 접수되었습니다\n빠른 시일내에 연락드리겠습니다`,
          {
            id: loadingToast,
          }
        );
        reset();
        setStep(STEPS.INFO);
        router.push("/");
      })
      .catch(() => {
        toast.error(`문의 생성 실패\n불편을 드려 죄송합니다`, {
          id: loadingToast,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.ACCEPT) return "제출";
    return "다음";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.INFO) return "";
    return "이전";
  }, [step]);

  let headingContent = {
    title: "환영합니다",
    subtitle: "아래항목을 체크해주세요",
  };
  let content = (
    <div className="flex flex-col gap-5">
      <Select
        placeholder="어떤 단계인가요? *"
        label="단계"
        options={stepOptions}
        name="step"
        control={control}
        errors={errors}
        required
      />
      <Select
        placeholder="예산을 선택해주세요? *"
        label="예산"
        options={costOptions}
        name="cost"
        control={control}
        errors={errors}
        required
      />
      <Select
        placeholder="디자인이나 설계 도면이 준비되셨나요? *"
        label="디자인여부"
        options={hasDesignOptions}
        name="hasDesign"
        control={control}
        errors={errors}
        required
      />
      <Select
        placeholder="일정을 선택해주세요? *"
        label="일정"
        options={scheduleOptions}
        name="schedule"
        control={control}
        errors={errors}
        required
      />
    </div>
  );

  if (step === STEPS.DESC) {
    headingContent = {
      title: "문의내용",
      subtitle: "문의내용은 상세할수록 좋습니다",
    };
    content = (
      <div className="flex flex-col gap-5">
        <Textarea
          errors={errors}
          control={control}
          name="description"
          label="본문내용 *"
          required
        />
      </div>
    );
  }

  if (step === STEPS.FILE) {
    headingContent = {
      title: "사진 업로드",
      subtitle: "참고할 디자인,도면,사진을 올려주세요",
    };
    content = (
      <div>
        <File files={files} setFiles={setFiles} />
      </div>
    );
  }

  if (step === STEPS.CLIENT) {
    headingContent = {
      title: "개인정보",
      subtitle: "아래정보로 회신드리겠습니다!",
    };
    content = (
      <div className="flex flex-col gap-5">
        <Input
          name="clientCompany"
          control={control}
          label="회사명 *"
          errors={errors}
          required
        />
        <div className="flex gap-5">
          <Input
            control={control}
            errors={errors}
            name="name"
            label="성함 *"
            required
          />
          <Input
            control={control}
            errors={errors}
            name="position"
            label="직급"
          />
        </div>
        <div className="flex gap-5">
          <Input
            control={control}
            errors={errors}
            name="phone"
            label="번호 *"
            required
            formatterPhone
          />
          <Input
            control={control}
            errors={errors}
            name="email"
            label="이메일 *"
            required
          />
        </div>
      </div>
    );
  }

  if (step === STEPS.ACCEPT) {
    headingContent = {
      title: "마지막단계입니다",
      subtitle: "문의해주셔서 감사합니다",
    };
    content = (
      <div className="flex flex-col gap-5">
        <Select
          placeholder="위브먼트를 알게 된 경로를 선택해주세요 *"
          label="알게 된 경로"
          control={control}
          errors={errors}
          options={knowPlatformOptions}
          name="knowPlatform"
          required
        />
        <div className="flex flex-col gap-2 text-zinc-600">
          <div className="text-lg text-semibold ">개인정보 수집 동의</div>
          <div className="text-sm">
            수집 항목 : 필수 (성명, 연락처 등) / 선택 (첨부파일 등)
            <br />
            수집된 정보는 문의 접수 및 회신에 이용되며 ‘전자상거래’, “정보통신망
            이용촉진 및 정보보호” 등 관련 법령에 따라 6개월간 보관됩니다.
            <br />
            이용자는 본 동의를 거부할 수 있으며, 미동의 시 문의 접수가
            불가합니다.
          </div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={(e) => setIsAccept(e.target.checked)}
              className="w-4 h-4"
            />
            위 사항을 이해했으며 동의합니다 *
          </label>
        </div>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex my-2 md:my-4 lg:my-8 2xl:my-10 md:gap-4 lg:gap-8 md:justify-center md:items-center h-full">
        <div className="hidden flex-1 md:flex flex-col md:text-center md:gap-4 lg:gap-6 h-full">
          <div className="md:text-6xl lg:text-7xl xl:text-8xl font-racing font-semibold">
            Contact
          </div>
          <div className=" font-semibold md:text-xs lg:text-sm xl:text-base">
            감각적인 제조가 필요하신가요? <br />
            컨텐츠의 크기도, 목적도, 소재도 제약이 없습니다.
            <br />
            편안한 마음으로 문의해주세요!
          </div>
        </div>
        <ContactCreateForm
          disabled={isLoading}
          content={content}
          headingContent={headingContent}
          actionLabel={actionLabel}
          onSubmit={handleSubmit(onSubmit)}
          secondaryActionLabel={secondaryActionLabel}
          secondaryAction={step === STEPS.INFO ? undefined : onBack}
        />
      </div>
    </Container>
  );
};

export default ContactClient;
