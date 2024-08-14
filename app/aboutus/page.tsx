import React from "react";
import metadataConfig from "@/constants/metadataConfig";
import AboutUsClient from "@/components/screens/aboutus/AboutUsClient";

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
