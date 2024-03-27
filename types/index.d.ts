import { Portfolio, Prisma } from "@prisma/client";

interface User {
  id: string;
  admin_id: string;
  isAdmin: boolean;
}

export interface CurrentUserProps {
  currentUser?: User | null;
}

export type ContactWithClients = Prisma.ContactGetPayload<{
  include: { client: true };
}>;
