import { getUsers } from "@/actions/admin.action";

export default async function Users(props: { limit: number; q: string; sortBy: string; sortOrder: string; page: number }) {
	const { limit = 12, q = "", sortBy = "", sortOrder = "", page = 1 } = props;
	const result = await getUsers({ limit, q, sortBy, sortOrder, page });

	return (
		<div>
			<div className="sticky top-0 bg-white z-50 p-4 border-b">Users</div>
			<div>
				<pre>{JSON.stringify(result, null, 2)}</pre>
			</div>
		</div>
	);
}
