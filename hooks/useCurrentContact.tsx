import { ContactWithClients } from "@/types";
import { create } from "zustand";

interface CurrentContactStore {
  current: ContactWithClients | undefined;
  setCurrent: (contact: ContactWithClients) => void;
  reset: () => void;
}

export default create<CurrentContactStore>((set) => ({
  current: undefined,
  setCurrent: (contact) => set({ current: contact }),
  reset: () => set({ current: undefined }),
}));
