"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter, usePathname } from "@/i18n/navigation";

export default function LanguageDropDown({ locale }: { locale: string }) {
	const router = useRouter();
	const pathname = usePathname();

	function onValueChange(value: string) {
		router.replace(pathname, { locale: value });
	}

	return (
		<div className="text-xs">
			<Select value={locale} onValueChange={onValueChange}>
				<SelectTrigger>
					<SelectValue placeholder="Change Language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup className="text-xs">
						<SelectLabel>Language</SelectLabel>
						<SelectItem value="en">English</SelectItem>
						<SelectItem value="bn">Bangla</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
}
