import { IUser } from "./next-auth";
import { Prisma } from "@prisma/client";

export interface currentUserProps {
  currentUser?: IUser | null;
}

export type ContactWithClients = Prisma.ContactGetPayload<{
  include: { client: true };
}>;
