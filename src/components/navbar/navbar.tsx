import { getLocale } from "next-intl/server";
import Nav from "./nav";
import { Suspense } from "react";
import { getCategories } from "@/actions/product.action";

export default async function Navbar() {
	const [locale, categories] = await Promise.all([getLocale(), getCategories()]);
	return (
		<header className="bg-background">
			<Suspense>
				<Nav locale={locale} categories={categories} />
			</Suspense>
		</header>
	);
}
