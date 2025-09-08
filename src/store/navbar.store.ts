import { create } from "zustand";

type NavbarState = {
	isSearchMenuOpen: boolean;
	toggleSearchMenu: () => void;
};

export const useNavbarStore = create<NavbarState>((set) => ({
	isSearchMenuOpen: false,
	toggleSearchMenu: () => set((state) => ({ isSearchMenuOpen: !state.isSearchMenuOpen })),
}));
