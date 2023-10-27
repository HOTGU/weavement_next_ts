import { Client } from "@prisma/client";
import { create } from "zustand";

interface UpdateClientModalStore {
  isOpen: boolean;
  onOpen: (target: Client) => void;
  onClose: () => void;
  target?: Client;
}

export default create<UpdateClientModalStore>((set) => ({
  isOpen: false,
  target: undefined,
  onOpen: (target: Client) => set({ isOpen: true, target }),
  onClose: () => set({ isOpen: false, target: undefined }),
}));
