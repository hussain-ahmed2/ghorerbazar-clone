import { getTranslations } from "next-intl/server";
import SignUpForm from "./signup-form";
import { Link } from "@/i18n/navigation";

export default async function page() {
	const t = await getTranslations("signUpPage");

	return (
		<div className="min-h-screen flex items-center justify-center">
			<section className="max-w-3xl w-full mt-40 mb-20 px-4">
				<h1 className="text-2xl md:text-4xl font-extrabold text-center">{t("title")}</h1>
				<p className="text-center my-4 font-medium">{t("description")}</p>
				<SignUpForm />
				<p className="mt-4 text-center text-sm text-gray-600">
					{t("alreadyHaveAccount")}&nbsp;
					<Link href="/login" className="font-semibold text-black hover:underline">
						{t("login")}
					</Link>
				</p>
			</section>
		</div>
	);
}
