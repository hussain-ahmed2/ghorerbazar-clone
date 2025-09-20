import { getTranslations } from "next-intl/server";
import LoginForm from "./login-form";
import { Link } from "@/i18n/navigation";

export default async function page() {
	const t = await getTranslations("loginPage");

	return (
		<div className="min-h-screen pb-10 flex items-center justify-center">
			<section className="max-w-3xl w-full px-4 mt-40 mb-20">
				<h1 className="text-2xl md:text-4xl font-extrabold text-center">{t("title")}</h1>
				<p className="text-center my-4 font-medium">{t("description")}</p>
				<LoginForm />
				<p className="mt-4 text-center text-sm text-gray-600">
					{t("doNotHaveAccount")}&nbsp;
					<Link href="/signup" className="font-semibold text-black hover:underline">
						{t("signUp")}
					</Link>
				</p>
			</section>
		</div>
	);
}
