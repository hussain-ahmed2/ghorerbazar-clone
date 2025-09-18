"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export default function SignUpForm() {
	const t = useTranslations("signUpPage");

	return (
		<form action="" className="mt-6 space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<div className="space-y-1">
					<Label htmlFor="firstName">{t("fields.firstName")}</Label>
					<Input className="bg-white border-neutral-300" id="firstName" name="firstName" />
				</div>
				<div className="space-y-1">
					<Label htmlFor="lastName">{t("fields.lastName")}</Label>
					<Input className="bg-white border-neutral-300" id="lastName" name="lastName" />
				</div>
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">{t("fields.email")}</Label>
				<Input className="bg-white border-neutral-300" id="email" type="email" name="email" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="phone">{t("fields.phone")}</Label>
				<Input className="bg-white border-neutral-300" id="phone" type="tel" name="phone" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">{t("fields.password")}</Label>
				<Input className="bg-white border-neutral-300" id="password" type="password" name="password" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="confirmPassword">{t("fields.confirmPassword")}</Label>
				<Input className="bg-white border-neutral-300" id="confirmPassword" type="password" name="confirmPassword" />
			</div>

			<Button type="submit" className="w-full">
				{t("title")}
			</Button>
		</form>
	);
}
