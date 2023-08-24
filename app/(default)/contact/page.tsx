import ContactClient from "@/components/contact/ContactClient";
import React from "react";
import { contactMetadata } from "@/constants/metadata";

export const metadata = contactMetadata;

const ContactPage = () => {
  return (
    <div className="pt-10 min-h-screen">
      <ContactClient />
    </div>
  );
};

export default ContactPage;
