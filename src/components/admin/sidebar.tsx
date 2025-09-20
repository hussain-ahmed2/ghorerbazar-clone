import { LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react";
import TabButton from "./tab-button";

export const navigation = [
	{ id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
	{ id: "users", name: "Users", icon: Users },
	{ id: "orders", name: "Orders", icon: ShoppingCart },
	{ id: "products", name: "Products", icon: Package },
	{ id: "settings", name: "Settings", icon: Settings },
];

export default function Sidebar() {
	return (
		<aside className="flex flex-col">
			<nav className="flex flex-col gap-2">
				{navigation.map((item) => (
					<TabButton key={item.id} id={item.id} name={item.name} />
				))}
			</nav>
		</aside>
	);
}
