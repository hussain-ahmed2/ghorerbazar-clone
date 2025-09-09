import { Product } from "@/types/product.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Star } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

export default function FeaturedProducts({ products }: { products: Product[] }) {
	return (
		<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{products.map((product) => (
				<Card key={product.id} className="flex flex-col hover:shadow-lg hover:ring-2 ring-muted-foreground transition duration-300">
					<AspectRatio className="relative w-full h-36" ratio={16 / 9}>
						<Image src={product.thumbnail} alt={product.title} fill className="object-contain rounded-t-lg" />
					</AspectRatio>

					<CardHeader>
						<CardTitle className="line-clamp-1">{product.title}</CardTitle>
						<CardDescription className="line-clamp-2">{product.description}</CardDescription>
					</CardHeader>

					<CardContent className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
							{product.discountPercentage > 0 && <span className="text-sm text-green-600">-{product.discountPercentage}%</span>}
						</div>

						<div className="flex items-center gap-1 text-yellow-500">
							<Star size={16} className="fill-current" />
							<span className="text-sm text-muted-foreground">{product.rating.toFixed(1)}</span>
						</div>
					</CardContent>

					<CardFooter className="mt-auto">
						<Button className="w-full">Add to Cart</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
