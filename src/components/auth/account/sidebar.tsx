"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
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
	const router = useRouter();

	return (
		<aside className={cn("flex flex-col gap-2 h-full sm:min-w-48")}>
			<Select onValueChange={(value) => router.push(value)}>
				<SelectTrigger className="shadow-none min-w-48 w-full">
					<SelectValue placeholder={t(selected)} />
				</SelectTrigger>

				<SelectContent>
					<SelectGroup className="text-xs">
						<SelectLabel>{t("title")}</SelectLabel>
						<SelectItem value="/account">{t("sidebar.account")}</SelectItem>
						<SelectItem value="/account/orders">{t("sidebar.orders")}</SelectItem>
						<SelectItem value="/account/wishlist">{t("sidebar.wishlist")}</SelectItem>
						<SelectItem value="/account/settings">{t("sidebar.settings")}</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>

			<div className="flex flex-col gap-2 w-full max-sm:hidden">
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
