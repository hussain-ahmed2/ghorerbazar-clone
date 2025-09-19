"use client";

import { Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function NavbarTopInfo({ onClose }: { onClose: () => void }) {
	const t = useTranslations("navbar");

	return (
		<div className="flex items-center space-x-4 justify-center flex-wrap p-2 bg-foreground text-background text-sm relative">
			<p className="flex items-center gap-2">
				<Phone size={16} />
				{t("topInfo.orderMessage")} {t("topInfo.orderNumber")}
			</p>

			<p className="flex items-center gap-2">
				<Phone size={16} />
				{t("topInfo.hotlineMessage")} {t("topInfo.hotlineNumber")}
			</p>

			<button className="absolute top-1.5 right-1 p-1 rounded hover:bg-secondary-foreground" onClick={onClose}>
				<X size={16} />
			</button>
		</div>
	);
}
