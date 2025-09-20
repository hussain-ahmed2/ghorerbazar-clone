"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const routes = {
	"/account": "sidebar.account",
	"/account/orders": "sidebar.orders",
	"/account/wishlist": "sidebar.wishlist",
	"/account/settings": "sidebar.settings",
};

export default function SideBar() {
	const pathname = usePathname();
	const t = useTranslations("accountPage");
	const selected = routes[pathname as keyof typeof routes];

	return (
		<aside className={cn("flex flex-col gap-2 md:h-full md:min-w-48")}>
			<div className="text-xs grid grid-cols-4 text-center md:hidden">
				{Object.entries(routes).map(([route, label]) => (
					<Link
						key={route}
						className={cn("py-2 font-medium rounded-md hover:bg-accent transition duration-300", {
							"bg-accent-foreground text-accent hover:bg-accent-foreground": selected === label,
						})}
						href={route}>
						{t(label)}
					</Link>
				))}
			</div>

			<div className="flex flex-col gap-2 w-full max-md:hidden">
				<Link
					className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
						"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account",
					})}
					href="/account">
					{t("sidebar.account")}
				</Link>
				<Link
					className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
						"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/orders",
					})}
					href="/account/orders">
					{t("sidebar.orders")}
				</Link>
				<Link
					className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
						"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/wishlist",
					})}
					href="/account/wishlist">
					{t("sidebar.wishlist")}
				</Link>
				<Link
					className={cn("px-4 py-2 rounded-md hover:bg-accent transition duration-300", {
						"bg-accent-foreground text-accent hover:bg-accent-foreground": pathname === "/account/settings",
					})}
					href="/account/settings">
					{t("sidebar.settings")}
				</Link>
			</div>
		</aside>
	);
}
