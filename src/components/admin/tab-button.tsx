"use client";

import { cn } from "@/lib/utils";
import { navigation } from "./sidebar";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

export default function TabButton({ name, id }: { name: string; id: string }) {
	const IconComponent = useMemo(() => navigation.find((item) => item.id === id)?.icon, [id]);
	const tab = useSearchParams().get("tab") || "dashboard";
	const router = useRouter();

	function handleTabClick() {
		router.push(`/admin?tab=${id}`);
	}

	return (
		<button
			onClick={handleTabClick}
			key={id}
			className={cn("flex items-center gap-2 px-4 py-2 font-medium rounded-md hover:bg-accent transition duration-300", tab === id && "bg-primary hover:bg-primary/90 text-primary-foreground")}>
			{IconComponent && <IconComponent className="size-5" />}
			{name}
		</button>
	);
}
