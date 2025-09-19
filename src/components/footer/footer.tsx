import { Link } from "@/i18n/navigation";
import Logo from "../logo";
import { getFormatter, getTranslations } from "next-intl/server";

export default async function Footer() {
	const [t, f] = await Promise.all([getTranslations("footer"), getFormatter()]);
	const year = f.dateTime(new Date(), { year: "numeric" });

	return (
		<footer>
			<div className="flex flex-col md:flex-row justify-between gap-4 px-4 py-8 max-w-6xl mx-auto">
				<section className="flex flex-col items-start max-w-xl">
					<Link href="/">
						<Logo />
					</Link>
					<h3 className="md:text-lg font-bold my-4">{t("title")}</h3>
					<p className="text-muted-foreground max-md:text-sm">{t("description")}</p>
				</section>
				<section className="flex flex-col gap-4">
					<h3 className="md:text-lg font-bold">{t("company")}</h3>

					<div className="flex flex-col gap-1 max-md:text-sm">
						<Link href="/">{t("about")}</Link>
						<Link href="/">{t("returnPolicy")}</Link>
						<Link href="/">{t("refundPolicy")}</Link>
					</div>
				</section>
				<section className="flex flex-col gap-4">
					<h3 className="md:text-lg font-bold">{t("quickHelp")}</h3>

					<div className="flex flex-col gap-1 max-md:text-sm">
						<Link href="/">{t("customerService")}</Link>
						<Link href="/">{t("contact")}</Link>
					</div>
				</section>
			</div>
			<div>
				<p className="text-center py-4 text-muted-foreground max-md:text-sm">{t("copyright", { year })}</p>
			</div>
		</footer>
	);
}
