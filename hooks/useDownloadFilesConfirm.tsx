import { create } from "zustand";

interface ConfirmStore {
  isOpen: boolean;
  target: string[];
  onOpen: (id: string[]) => void;
  onClose: () => void;
}

const useDownloadFilesConfirm = create<ConfirmStore>((set) => ({
  isOpen: false,
  target: [],
  onOpen: (images) => set({ isOpen: true, target: images }),
  onClose: () => set({ isOpen: false, target: [] }),
}));

export default useDownloadFilesConfirm;
