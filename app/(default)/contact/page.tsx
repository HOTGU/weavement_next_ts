import ContactClient from "@/components/contact/ContactClient";
import React from "react";
import metadataConfig from "@/constants/metadataConfig";

export const metadata = metadataConfig.contactMetadata;

const ContactPage = () => {
  return (
    <div className="pt-14 min-h-screen">
      <ContactClient />
    </div>
  );
};

export default ContactPage;
