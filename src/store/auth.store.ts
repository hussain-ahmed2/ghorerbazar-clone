import api from "@/lib/api";
import { UserType } from "@/types/user.type";
import { create } from "zustand";

type AuthState = {
	user: UserType | null;
	isAuthenticated: boolean;
	isAuthenticating: boolean;
	checkAuth: () => void;
	setUser: (user: UserType | null, isAuthenticated?: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	isAuthenticated: false,
	isAuthenticating: true,
	checkAuth: async () => {
		try {
			const response = await api.get("/auth/me");
			set({ user: response.data, isAuthenticated: true });
		} catch (error) {
			console.log(error);
		} finally {
			set({ isAuthenticating: false });
		}
	},
	setUser: (user: UserType | null, isAuthenticated = false) => set({ user, isAuthenticated }),
}));
