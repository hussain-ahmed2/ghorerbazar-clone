import { Badge } from "@/components/ui/badge";

const items = ["OFFER ZONE", "Best Seller", "Mustard Oil", "Ghee (ঘি)", "Dates (খেজুর)", "খেজুর গুড়", "Honey", "Masala", "Nuts & Seeds", "Tea/Coffee", "Honeycomb", "Organic Zone"];

export default function PopularCategories() {
	return (
		<div className="flex items-center justify-center flex-wrap gap-2 p-4 bg-neutral-50">
			{items.map((item) => (
				<Badge key={item} variant="outline">
					{item}
				</Badge>
			))}
		</div>
	);
}
