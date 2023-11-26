import { User } from "@/types";
import { create } from "zustand";

interface UpdateUser {
  isUpdate: boolean;
  target?: User;
  onUpdate: (target: User) => void;
  onClose: () => void;
}

export default create<UpdateUser>((set) => ({
  isUpdate: false,
  target: undefined,
  onUpdate: (target) => set({ target, isUpdate: true }),
  onClose: () => set({ isUpdate: false, target: undefined }),
}));
