import Sidebar from "./sidebar";
import Header from "./header";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex-1 flex flex-col gap-2.5 max-w-6xl mx-auto w-full h-full">
			<div className="bg-white border rounded-lg h-16 flex items-center justify-between px-4 flex-shrink-0">
				<Header />
			</div>

			<div className="flex flex-1 gap-2.5 min-h-0">
				<div className="bg-white rounded-lg border p-4 min-w-52 flex flex-col flex-shrink-0">
					<Sidebar />
				</div>

				<div className="bg-white flex-1 rounded-lg border overflow-hidden">
					<ScrollArea className="h-full p-4">{children}</ScrollArea>
				</div>
			</div>
		</div>
	);
}
