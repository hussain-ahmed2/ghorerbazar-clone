import { getProducts } from "@/actions/product.action";
import Banner from "@/components/homepage/banner";
import FeaturedProducts from "@/components/homepage/featured-products";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function HomePage({ searchParams }: PageProps<"/[locale]">) {
	const { limit = 12, q = "", sortBy = "", sortOrder = "", page = 1 } = await searchParams;
	const [t, { products }] = await Promise.all([getTranslations("homepage"), getProducts(Number(page), Number(limit), String(q), String(sortBy), String(sortOrder))]);

	return (
		<div className="">
			<section>
				<Banner />
			</section>

			<section className="my-10 max-w-6xl mx-auto px-4">
				<h2 className="text-2xl font-bold">{t("featuredProductsTitle")}</h2>
				<p className="text-muted-foreground mt-2 mb-4">{t("featuredProductsDescription")}</p>
				<FeaturedProducts products={products} />
				<Button className="mt-6 mx-auto block" variant="outline" size="lg">
					{t("viewMore")}
				</Button>
			</section>
		</div>
	);
}
