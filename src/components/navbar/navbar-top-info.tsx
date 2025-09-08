"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NavbarTopInfo() {
	const t = useTranslations("navbar");

	return (
		<div className="flex items-center space-x-4 justify-center flex-wrap p-2 bg-foreground text-background text-sm">
			<p className="flex items-center gap-2">
				<Phone size={16} />
				{t("topInfo.orderMessage")} {t("topInfo.orderNumber")}
			</p>

			<p className="flex items-center gap-2">
				<Phone size={16} />
				{t("topInfo.hotlineMessage")} {t("topInfo.hotlineNumber")}
			</p>
		</div>
	);
}
