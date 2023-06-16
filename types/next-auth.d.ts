import NextAuth, { DefaultSession } from "next-auth";

export interface IUser {
  id: string;
  isAdmin: boolean;
  admin_id: string;
}

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
  interface User extends IUser {}
}
declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
