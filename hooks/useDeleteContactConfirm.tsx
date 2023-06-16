import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  target: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useDeleteContactConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  target: "",
  onClose: () => set({ isOpen: false }),
  onOpen: (id) => set({ isOpen: true, target: id }),
}));

export default useDeleteContactConfirm;
