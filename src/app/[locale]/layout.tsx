import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Noto_Sans_Bengali } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";
import { Metadata } from "next";
import Navbar from "@/components/navbar/navbar";
import { getLocale } from "next-intl/server";

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
		<html lang={locale}>
			<body className={`${natoSansBengali.className} antialiased`}>
				<NextIntlClientProvider>
					<Navbar />
					<main className="bg-accent flex flex-col min-h-screen w-full overflow-hidden">{children}</main>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
