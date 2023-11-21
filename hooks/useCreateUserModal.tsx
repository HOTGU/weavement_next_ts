import { create } from "zustand";

interface AddClientModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export default create<AddClientModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
