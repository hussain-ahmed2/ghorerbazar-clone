"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth.store";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { logout } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const setUser = useAuthStore((state) => state.setUser);

	async function handleLogout() {
		const result = await logout();
		if (result.success) {
			setUser(null);
			toast.success(result.message);
			redirect("/login");
		}
		toast.error(result.message);
	}

	return isAuthenticated ? (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button onClick={handleLogout} variant="ghost" size="icon">
					<LogOut />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Logout of your account</TooltipContent>
		</Tooltip>
	) : null;
}
