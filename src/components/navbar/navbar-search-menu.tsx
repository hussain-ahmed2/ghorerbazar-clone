import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Search } from "lucide-react";

export default function NavbarSearchMenu() {
	return (
		<Drawer direction="top">
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

			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Move Goal</DrawerTitle>
						<DrawerDescription>Set your daily activity goal.</DrawerDescription>
					</DrawerHeader>

					<DrawerFooter>
						<Button>Submit</Button>
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
