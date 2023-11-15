import Container from "@/components/Container";
import AdminAnalysisNav from "@/components/navbar/AdminAnalysisNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <div className="flex mt-4 gap-4">
        <AdminAnalysisNav />
        {children}
      </div>
    </Container>
  );
};

export default layout;
