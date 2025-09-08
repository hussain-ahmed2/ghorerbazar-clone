import { ShoppingBag, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToolTipLink from "../tooltip-link";

export default function NavbarRightSideIconMenus() {
	return (
		<div className="flex items-center gap-2">
			<ToolTipLink href="/account" tooltip="Account">
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<User2 />
				</Button>
			</ToolTipLink>
			<ToolTipLink href="/cart" tooltip="Cart">
				<Button className="cursor-pointer" variant="ghost" size="icon">
					<ShoppingBag />
				</Button>
			</ToolTipLink>
		</div>
	);
}
