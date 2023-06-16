import { create } from "zustand";

type kindOfStep = "PROJECT" | "INFO" | "DESC" | "NOTE" | undefined;

interface UpdateModalStore {
  isOpen: boolean;
  step: kindOfStep;
  onOpen: (step: kindOfStep) => void;
  onClose: () => void;
}

export default create<UpdateModalStore>((set) => ({
  isOpen: false,
  step: undefined,
  onOpen: (step) => set({ isOpen: true, step }),
  onClose: () => set({ isOpen: false, step: undefined }),
}));
