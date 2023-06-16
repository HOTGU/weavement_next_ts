import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  target: string;
  onOpen: (id: string) => void;
  onClose: () => void;
}

const useDeletePortfolioConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  target: "",
  onOpen: (id) => set({ isOpen: true, target: id }),
  onClose: () => set({ isOpen: false, target: "" }),
}));

export default useDeletePortfolioConfirm;
