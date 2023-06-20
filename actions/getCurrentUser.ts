import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/libs/prismadb";

export default async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.id) {
      return null;
    }

    const user = await prisma.user.findUnique({ where: { id: session.id } });

    if (!user) {
      return null;
    }

    const { password, ...noPwUser } = user;

    return noPwUser;
  } catch (error) {
    return null;
  }
};
