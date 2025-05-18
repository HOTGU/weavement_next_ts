import { Portfolio, Prisma } from "@prisma/client";

interface User {
  id: string;
  admin_id: string;
  isAdmin: boolean;
  username: string;
}

export interface CurrentUserProps {
  currentUser?: User | null;
}

export type ContactWithClients = Prisma.ContactGetPayload<{
  include: { client: true };
}>;

export type SameCategoryPortfolioData = {
  name: string;
  next?: Portfolio;
  prev?: Portfolio;
}[];
