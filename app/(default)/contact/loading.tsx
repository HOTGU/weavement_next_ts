import Container from "@/components/Container";
import React from "react";

const ContactSkeleton = () => {
  return (
    <div className="pt-14 min-h-screen animate-pulse">
      <Container>
        <div className="flex my-2 md:my-4 lg:my-8 2xl:my-10 md:gap-4 lg:gap-8 md:justify-center md:items-center h-full">
          <div className="hidden flex-1 md:flex flex-col md:items-center md:gap-6 lg:gap-8 xl:gap-10 h-full">
            <div className="xl:w-[360px] xl:h-[76px] lg:w-[270px] lg:h-[55px] md:w-[225px] md:h-[46px] rounded-full bg-neutral-300"></div>
            <div className=" flex flex-col items-center justify-center xl:gap-[8px] lg:gap-[6px] md:gap-[4px]">
              <div className="xl:w-[200px] xl:h-[20px] lg:w-[175px] lg:h-[16px] md:w-[150px] md:h-[12px] bg-neutral-300 rounded-full"></div>
              <div
                className="xl:w-[310px] xl:h-[20px] lg:w-[275px] lg:h-[16px] md:w-[240px]
md:h-[12px] bg-neutral-300 rounded-full"
              ></div>
              <div
                className="xl:w-[200px] xl:h-[20px] lg:w-[175px] lg:h-[16px] md:w-[150px]
md:h-[12px] bg-neutral-300 rounded-full"
              ></div>
            </div>
          </div>
          <div className="w-full md:w-1/2 lg:w-1/2 xl:w-2/5 ">
            <div className="flex justify-around items-center mb-2 font-bold">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className={`w-10 h-10 rounded-full border bg-neutral-300`}
                ></div>
              ))}
            </div>
            <div className=" mx-auto rounded flex flex-col border border-zinc-200 min-h-[75vh]">
              <div className="p-4">
                <div className="w-[90px] h-[20px] rounded-full bg-neutral-300 mb-[10px]"></div>
                <div className="w-[140px] h-[14px] rounded-full bg-neutral-300 mb-[4px]"></div>
              </div>
              <hr />
              <div className="flex-auto p-4"></div>
              <hr />
              <div className="p-4">
                <div className="w-full h-[50px] rounded-lg bg-neutral-300"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactSkeleton;
