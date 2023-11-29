import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useContactDownloadConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useContactDownloadConfirm;
