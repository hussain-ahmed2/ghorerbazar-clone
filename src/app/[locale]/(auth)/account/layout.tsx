import SideBar from "@/components/auth/account/sidebar";
import { Separator } from "@/components/ui/separator";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pt-30 px-4 flex max-w-6xl mx-auto w-full h-[95vh]">
			<div className="flex gap-4 md:gap-8 flex-1 bg-white border rounded-lg p-4">
				<SideBar />
				<Separator orientation="vertical" className="h-full" />
				<div className="flex flex-col flex-1">{children}</div>
			</div>
		</div>
	);
}
