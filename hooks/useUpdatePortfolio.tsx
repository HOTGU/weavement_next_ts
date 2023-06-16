import { Portfolio } from "@prisma/client";
import { create } from "zustand";

interface UpdatePortfolioStore {
  isUpdate: boolean;
  target?: Portfolio;
  onUpdate: (target: Portfolio) => void;
  onClose: () => void;
}

const useUpdatePortfolio = create<UpdatePortfolioStore>((set) => ({
  isUpdate: false,
  target: undefined,
  onUpdate: (target) => set({ target, isUpdate: true }),
  onClose: () => set({ isUpdate: false, target: undefined }),
}));

export default useUpdatePortfolio;
