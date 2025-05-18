import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/components/Container";
import AttendanceClient from "@/components/admin/attendance/AttendanceClient";
import { redirect } from "next/navigation";
import React from "react";

const AttendancePage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/");
  }

  return (
    <Container>
      <AttendanceClient userId={currentUser.id} />
    </Container>
  );
};

export default AttendancePage;
