"use client";

import { useNavbarStore } from "@/store/navbar.store";
import { Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NavbarTopInfo() {
	const t = useTranslations("navbar");
	const onClose = useNavbarStore((state) => state.toggleTopInfo);

	return (
		<div className="flex items-center space-x-4 justify-center flex-wrap p-2 bg-foreground text-background text-xs md:text-sm relative">
			<p className="flex items-center gap-2">
				<Phone className="size-3 md:size-4" />
				{t("topInfo.orderMessage")} {t("topInfo.orderNumber")}
			</p>

			<p className="flex items-center gap-2">
				<Phone className="size-3 md:size-4" />
				{t("topInfo.hotlineMessage")} {t("topInfo.hotlineNumber")}
			</p>

			<button className="absolute top-1.5 right-1 p-1 rounded hover:bg-secondary-foreground" onClick={onClose}>
				<X className="size-3 md:size-4" />
			</button>
		</div>
	);
}
