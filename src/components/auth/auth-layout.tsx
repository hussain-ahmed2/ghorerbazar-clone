"use client";

import { useAuthStore } from "@/store/auth.store";
import { memo, useEffect } from "react";
import Logo from "../logo";
import { Loader2 } from "lucide-react";

function AuthLayout() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isAuthenticating = useAuthStore((state) => state.isAuthenticating);
	const checkAuth = useAuthStore((state) => state.checkAuth);

	useEffect(() => {
		if (!isAuthenticated) {
			checkAuth();
		}
	}, [isAuthenticated, checkAuth]);

	return isAuthenticating ? (
		<div className="fixed inset-0 flex items-center justify-center bg-white z-50">
			<div className="flex flex-col justify-center items-center gap-2">
				<Logo />
				<div className="animate-spin size-10 aspect-square flex items-center justify-center">
					<Loader2 size={32} />
				</div>
			</div>
		</div>
	) : null;
}

export default memo(AuthLayout);
