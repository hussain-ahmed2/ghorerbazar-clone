import { cn } from "@/lib/utils";

export default function FiledError({ error }: { error: string }) {
	return (
		<div
			className={cn("overflow-hidden transition-all duration-300", {
				"h-0 invisible": !error,
			})}>
			<p className="text-rose-500 text-xs">{error}</p>
		</div>
	);
}
