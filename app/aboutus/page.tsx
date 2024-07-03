import React from "react";
import metadataConfig from "@/constants/metadataConfig";
import Container from "@/components/Container";
import AboutUsClient from "@/components/aboutus/AboutUsClient";

export const metadata = metadataConfig.aboutusMetadata;

const page = () => {
  return (
    <div className="min-h-screen">
      <AboutUsClient />
      {/* <AboutUsClient /> */}
    </div>
  );
};

export default page;
