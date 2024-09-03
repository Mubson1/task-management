import { create } from "zustand";

type MobileSidebarStore = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
};

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
