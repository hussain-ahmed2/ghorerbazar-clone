"use client";

import { ShoppingBag, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolTipLink from "../tooltip-link";
import { useAuthStore } from "@/store/auth.store";

export default function NavbarRightSideIconMenus() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<div className="flex items-center gap-2">
			<ToolTipLink href={isAuthenticated ? "/account" : "/login"} tooltip="Account">
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<User2 />
				</Button>
			</ToolTipLink>
			<ToolTipLink href="/cart" tooltip="Cart">
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<ShoppingBag />
				</Button>
			</ToolTipLink>
		</div>
	);
}
