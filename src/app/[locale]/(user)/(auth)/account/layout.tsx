import SideBar from "@/components/auth/account/sidebar";
import { Separator } from "@/components/ui/separator";

export default function layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="pt-30 pb-10 px-4 flex flex-col max-w-6xl mx-auto w-full h-full min-h-screen md:h-screen">
			<div className="flex max-md:flex-col gap-4 md:gap-8 flex-1 bg-white border rounded-lg p-4 relative h-full">
				<SideBar />
				<Separator orientation="vertical" className="max-md:hidden" />
				<Separator orientation="horizontal" className="md:hidden" />
				<div className="flex flex-col flex-1 h-full">{children}</div>
			</div>
		</div>
	);
}
