"use client";

import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Link } from "@/i18n/navigation";

export default function PopularCategories({ categories }: { categories: string[] }) {
	return (
		<div className="w-full bg-neutral-50 p-4">
			<ScrollArea className="w-full whitespace-nowrap max-w-6xl mx-auto relative">
				<div className="absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-white to-transparent z-40" />
				<div className="absolute right-0 top-0 h-full w-4 bg-gradient-to-r from-transparent to-white z-40" />
				<div className="flex gap-2 px-2.5">
					{categories.map((item) => (
						<Badge key={item} variant="outline" className="whitespace-nowrap capitalize">
							<Link href={`/category/${item}`}>{item}</Link>
						</Badge>
					))}
				</div>
				{/* Show scrollbar only on md+ devices */}
				<ScrollBar orientation="horizontal" className="hidden" />
			</ScrollArea>
		</div>
	);
}
