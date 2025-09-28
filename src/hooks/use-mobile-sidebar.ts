import { create } from 'zustand';

interface MobileSidebarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => {
        console.log("Opening sidebar!"); // 👈 이 로그를 추가
        set({ isOpen: true });
    },
    onClose: () => set({ isOpen: false }),
}));