"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export default function SideBar() {
	const pathname = usePathname();
	const t = useTranslations("accountPage.sidebar");

	return (
		<aside className="flex flex-col gap-2 h-full min-w-48">
			<Link
				className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
					"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account",
				})}
				href="/account">
				{t("account")}
			</Link>
			<Link
				className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
					"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/orders",
				})}
				href="/account/orders">
				{t("orders")}
			</Link>
			<Link
				className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
					"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/wishlist",
				})}
				href="/account/wishlist">
				{t("wishlist")}
			</Link>
			<Link
				className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
					"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/settings",
				})}
				href="/account/settings">
				{t("settings")}
			</Link>
		</aside>
	);
}
