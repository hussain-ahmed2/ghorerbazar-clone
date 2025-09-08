import { getTranslations } from "next-intl/server";

export default async function HomePage() {
	const t = await getTranslations("homepage");

	return (
		<div className="min-h-[400vh]">
			<h1>{t("title")}</h1>
		</div>
	);
}
