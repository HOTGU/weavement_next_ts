import React from "react";
import { redirect } from "next/navigation";

import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import LoginForm from "@/components/forms/LoginForm";

const authPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/");

  return (
    <div className="pt-16 min-h-screen">
      <Container>
        <LoginForm />
      </Container>
    </div>
  );
};

export default authPage;
