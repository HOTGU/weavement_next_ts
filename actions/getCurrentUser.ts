import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return null;
    }

    if (session?.user) {
      return session?.user;
    }

    return null;
  } catch (error) {
    return null;
  }
};
