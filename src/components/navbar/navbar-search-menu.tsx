import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search, ShoppingBag, User2 } from "lucide-react";
import Link from "next/link";
import Logo from "../logo";
import { Input } from "../ui/input";
import { useRef, useEffect, useState } from "react";
import ToolTipLink from "../tooltip-link";

export default function NavbarSearchMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOpen) {
			const focusInput = () => {
				if (inputRef.current) {
					inputRef.current.focus();
					inputRef.current.select();
				}
			};

			const timer1 = setTimeout(() => {
				requestAnimationFrame(focusInput);
			}, 100);

			const timer2 = setTimeout(() => {
				requestAnimationFrame(focusInput);
			}, 300);

			return () => {
				clearTimeout(timer1);
				clearTimeout(timer2);
			};
		}
	}, [isOpen]);

	// Alternative approach using onAnimationEnd
	const handleDrawerAnimationEnd = () => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	};

	return (
		<Drawer direction="top" open={isOpen} onOpenChange={setIsOpen}>
			<Tooltip>
				<DrawerTrigger asChild>
					<TooltipTrigger asChild>
						<Button size="icon" variant="ghost">
							<Search />
						</Button>
					</TooltipTrigger>
				</DrawerTrigger>
				<TooltipContent>Search</TooltipContent>
			</Tooltip>

			<DrawerContent className="!rounded-b-none" onAnimationEnd={handleDrawerAnimationEnd}>
				<div className="mx-auto w-full max-w-6xl my-10">
					<DrawerHeader>
						<DrawerTitle className="flex items-center justify-between gap-8">
							<DrawerClose asChild>
								<Link href="/">
									<Logo />
								</Link>
							</DrawerClose>
							<div className="flex items-center relative w-full max-w-xl">
								<Input ref={inputRef} type="search" className="w-full placeholder:font-light" placeholder="Search Product" autoComplete="off" />
								<Button variant="ghost" className="absolute right-0 hover:bg-transparent cursor-pointer">
									<Search />
								</Button>
							</div>
							<div className="flex items-center gap-2">
								<ToolTipLink href="/account" tooltip="Account">
									<Button onClick={() => setIsOpen(false)} className="cursor-pointer" variant="ghost" size="icon">
										<User2 />
									</Button>
								</ToolTipLink>
								<ToolTipLink href="/cart" tooltip="Cart">
									<Button onClick={() => setIsOpen(false)} className="cursor-pointer" variant="ghost" size="icon">
										<ShoppingBag />
									</Button>
								</ToolTipLink>
							</div>
						</DrawerTitle>

						<DrawerDescription className="flex items-center gap-4 justify-center mt-5">
							<span>Popular Searches:</span>
							<DrawerClose asChild>
								<Link href="/" className="underline">
									Organic Oil
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href="/" className="underline">
									Honey
								</Link>
							</DrawerClose>
							<DrawerClose asChild>
								<Link href="/" className="underline">
									Nuts & Seeds
								</Link>
							</DrawerClose>
						</DrawerDescription>
					</DrawerHeader>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
