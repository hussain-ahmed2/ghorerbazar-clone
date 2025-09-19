import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import FiledError from "./field-error";
import { HTMLInputTypeAttribute } from "react";

type Props = {
	name: string;
	defaultValue: string;
	label: string;
	error: string;
	type?: HTMLInputTypeAttribute;
};

export default function InputField({ name, defaultValue, label, type = "text", error }: Props) {
	return (
		<div className="space-y-1">
			<Label htmlFor={name}>{label}</Label>
			<Input
				className={cn("bg-white border-neutral-300", {
					"border-rose-300 focus:!border-rose-400 focus:!ring-rose-200": error,
				})}
				type={type}
				id={name}
				name={name}
				defaultValue={defaultValue}
			/>
			<FiledError error={error} />
		</div>
	);
}
