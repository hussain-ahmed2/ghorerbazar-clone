import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

type Props = { href: string; children: React.ReactNode; tooltip: string };

export default function ToolTipLink({ href, children, tooltip, ...props }: Props) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link href={href} {...props}>
					{children}
				</Link>
			</TooltipTrigger>
			<TooltipContent>{tooltip}</TooltipContent>
		</Tooltip>
	);
}
