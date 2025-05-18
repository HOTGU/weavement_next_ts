import prisma from "@/libs/prismadb";

export default async () => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, admin_id: true, isAdmin: true, username: true },
    });

    return users;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.log(error);
    }
    return null;
  }
};
