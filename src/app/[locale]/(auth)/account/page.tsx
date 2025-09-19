import { getTranslations } from "next-intl/server";

export default async function page() {
	const t = await getTranslations("accountPage");

	return (
		<div className="pt-30 px-4">
			<section>
				<h1 className="text-2xl md:text-4xl font-extrabold max-md:text-center">{t("title")}</h1>
			</section>
		</div>
	);
}
