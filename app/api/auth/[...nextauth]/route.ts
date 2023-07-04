import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        admin_id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.admin_id || !credentials?.password) {
          throw new Error("아이디와 비밀번호를 확인하세요");
        }

        const user = await prisma.user.findUnique({
          where: {
            admin_id: credentials.admin_id,
          },
        });

        if (!user) {
          throw new Error("아이디와 비밀번호를 확인하세요");
        }

        const checkPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!checkPassword) {
          throw new Error("이메일과 비밀번호를 확인하세요");
        }

        return user;
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.sub;
        delete session.user;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
