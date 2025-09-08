import { getLocale } from "next-intl/server";
import Nav from "./nav";
import { Suspense } from "react";

export default async function Navbar() {
	const locale = await getLocale();
	return (
		<header className="bg-background">
			<Suspense>
				<Nav locale={locale} />
			</Suspense>
		</header>
	);
}
