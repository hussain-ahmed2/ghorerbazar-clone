"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function LoginForm() {
	const t = useTranslations("loginPage");

	return (
		<form action="" className="mt-6 space-y-4">
			<div className="space-y-1">
				<Label htmlFor="email">{t("fields.email")}</Label>
				<Input className="bg-white border-neutral-300" id="email" type="email" name="email" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">{t("fields.password")}</Label>
				<Input className="bg-white border-neutral-300" id="password" type="password" name="password" />
			</div>

			<Button type="submit" className="w-full">
				{t("title")}
			</Button>
		</form>
	);
}
