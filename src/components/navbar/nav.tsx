"use client";

import Link from "next/link";
import NavbarSearchMenu from "./navbar-search-menu";
import Logo from "../logo";
import NavbarRightSideIconMenus from "./navbar-right-side-icon-menus";
import LanguageDropDown from "../lang-dropdown";
import { motion, AnimatePresence } from "motion/react";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";
import NavbarTopInfo from "./navbar-top-info";
import PopularCategories from "./popular-categories";
import { useState } from "react";

export default function Nav({ locale, categories }: { locale: string; categories: string[] }) {
	const [showInfo, setShowInfo] = useState(true);
	const { showNavbar, showTopInfo } = useHideOnScroll();

	return (
		<motion.nav initial={{ y: 0 }} animate={{ y: showNavbar ? 0 : "-100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed top-0 left-0 w-full bg-background z-50 shadow-xs">
			<AnimatePresence>
				{showTopInfo && showInfo && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						style={{ overflow: "hidden" }}>
						<NavbarTopInfo onClose={() => setShowInfo(false)} />
					</motion.div>
				)}
			</AnimatePresence>

			<div className="flex items-center justify-between max-w-6xl mx-auto min-h-20 px-4">
				<NavbarSearchMenu />
				<Link href="/">
					<Logo />
				</Link>
				<div className="flex items-center justify-center gap-2">
					<NavbarRightSideIconMenus />
					<LanguageDropDown locale={locale} />
				</div>
			</div>

			{/* <PopularCategories categories={categories} /> */}
		</motion.nav>
	);
}
