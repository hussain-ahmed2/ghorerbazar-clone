import AdminLayout from "@/components/admin/admin-layout";
import Users from "@/components/admin/users";
import { Suspense } from "react";

export default async function page({ searchParams }: PageProps<"/[locale]/admin">) {
	const { tab = "dashboard", limit = 12, q = "", sortBy = "", sortOrder = "", page = 1 } = await searchParams;

	function renderTab(tab: string) {
		switch (tab) {
			case "dashboard":
				return <div>Dashboard</div>;
			case "users":
				return (
					<Suspense fallback={<div>Loading...</div>}>
						<Users limit={parseInt(limit as string)} q={q as string} sortBy={sortBy as string} sortOrder={sortOrder as string} page={parseInt(page as string)} />
					</Suspense>
				);
			case "orders":
				return <div>Orders</div>;
			case "products":
				return <div>Products</div>;
			case "settings":
				return <div>Settings</div>;
			default:
				return <div>Dashboard</div>;
		}
	}

	return <AdminLayout>{renderTab(tab as string)}</AdminLayout>;
}
