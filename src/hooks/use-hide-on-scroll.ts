"use client";

import { useState, useEffect } from "react";

export function useHideOnScroll(threshold = 50) {
	const [showNavbar, setShowNavbar] = useState(true);
	const [showTopInfo, setShowTopInfo] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		let ticking = false;

		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const currentScrollY = window.scrollY;

					// Always show navbar when at the very top
					if (currentScrollY === 0) {
						setShowNavbar(true);
					}
					// Show navbar when close to top (within threshold)
					else if (currentScrollY <= threshold) {
						setShowNavbar(true);
					}
					// Handle scroll direction for other positions
					else {
						const scrollDiff = currentScrollY - lastScrollY;

						if (scrollDiff > 0) {
							// Scrolling down - hide navbar
							setShowNavbar(false);
						} else if (scrollDiff < 0) {
							// Scrolling up - show navbar
							setShowNavbar(true);
						}
					}

					// Show top info only when at the very top
					const topInfoHeight = 36;
					setShowTopInfo(currentScrollY <= topInfoHeight);

					setLastScrollY(currentScrollY);
					ticking = false;
				});
				ticking = true;
			}
		};

		// Initial check
		const initialScrollY = window.scrollY;
		if (initialScrollY === 0 || initialScrollY <= threshold) {
			setShowNavbar(true);
		}

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, [threshold, lastScrollY]);

	return { showNavbar, showTopInfo };
}
