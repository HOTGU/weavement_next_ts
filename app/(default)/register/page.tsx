import Code from "@/components/Code";
import RegisterForm from "@/components/forms/RegisterForm";
import React from "react";

const page = () => {
  return (
    <div className="pt-16 min-h-screen">
      <Code>
        <RegisterForm />
      </Code>
    </div>
  );
};

export default page;
