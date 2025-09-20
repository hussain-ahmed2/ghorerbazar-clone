import Header from "@/components/auth/account/header";
import { getTranslations } from "next-intl/server";
import AccountInfo from "./account-info";

export default async function page() {
	const t = await getTranslations("accountPage");

	return (
		<section className="flex flex-col flex-1 gap-4">
			<Header title={t("title")} description={t("description")} />
			<AccountInfo />
		</section>
	);
}
