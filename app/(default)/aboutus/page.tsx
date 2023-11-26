import React from "react";
import metadataConfig from "@/constants/metadataConfig";
import Container from "@/components/Container";

export const metadata = metadataConfig.aboutusMetadata;

const page = () => {
  return (
    <div className="pt-36 min-h-screen">
      <div className="w-screen h-[300px] bg-neutral-200"></div>
      <Container>
        <div className="pt-12">page</div>
      </Container>
    </div>
  );
};

export default page;
