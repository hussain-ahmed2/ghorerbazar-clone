import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Noto_Sans_Bengali } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import AuthLayout from "@/components/auth/auth-layout";

export const natoSansBengali = Noto_Sans_Bengali({
	subsets: ["bengali", "latin", "latin-ext"],
});

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export const metadata = async () => {
	const locale = await getLocale();

	const titles: Record<string, string> = {
		bn: "ঘরের বাজার - আপনার বিশ্বস্ত অনলাইন বাজার",
		en: "Ghorer Bazar - Your Trusted Online Grocery",
	};

	const descriptions: Record<string, string> = {
		bn: "ঘরের বাজার থেকে আপনার প্রয়োজনীয় সকল পণ্য অর্ডার করুন। হটলাইন এবং WhatsApp মাধ্যমে সহজ যোগাযোগ।",
		en: "Order all your daily essentials from Ghorer Bazar. Easy contact via hotline and WhatsApp.",
	};

	return {
		title: titles[locale] || titles.en,
		description: descriptions[locale] || descriptions.en,
	} as Metadata;
};

type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
	const { locale = "en" } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	return (
		<html lang={locale} className="h-full">
			<body className={`${natoSansBengali.className} antialiased h-full`}>
				<NextIntlClientProvider>
					<main className="bg-accent flex flex-col h-full w-full p-4 relative">{children}</main>
					<Toaster closeButton position="top-right" theme="light" richColors />
					<AuthLayout />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
