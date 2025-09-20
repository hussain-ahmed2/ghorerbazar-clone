import { create } from "zustand";

type NavbarState = {
	isSearchMenuOpen: boolean;
	toggleSearchMenu: () => void;
	isTopInfoVisible: boolean;
	toggleTopInfo: () => void;
};

export const useNavbarStore = create<NavbarState>((set) => ({
	isSearchMenuOpen: false,
	toggleSearchMenu: () => set((state) => ({ isSearchMenuOpen: !state.isSearchMenuOpen })),
	isTopInfoVisible: true,
	toggleTopInfo: () => set((state) => ({ isTopInfoVisible: !state.isTopInfoVisible })),
}));
