import { Package } from "lucide-react";
import LanguageDropDown from "../lang-dropdown";
import { getLocale } from "next-intl/server";

export default async function Header() {
	const locale = await getLocale();
	return (
		<>
			<div className="flex items-center gap-4">
				<Package className="size-6" />
				<h1 className="text-lg font-semibold">Dashboard</h1>
			</div>
			<LanguageDropDown locale={locale} />
		</>
	);
}
