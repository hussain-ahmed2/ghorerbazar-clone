"use client";

import { updateUser } from "@/actions/auth.action";
import InputField from "@/components/form/input-field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { UpdateUserSchema } from "@/lib/validation/user.validation";
import { useAuthStore } from "@/store/auth.store";
import { useTranslations } from "next-intl";
import { useActionState, useState } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
	errors: { firstName: "", lastName: "", phone: "", address: "" } as UpdateUserSchema & { server?: string | null },
	form: { firstName: "", lastName: "", phone: "", address: "" } as UpdateUserSchema,
};

type State = typeof INITIAL_STATE;

export default function AccountInfo() {
	const t = useTranslations("accountPage");
	const [isEditing, setIsEditing] = useState(false);
	const user = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);
	const [state, formAction, isPending] = useActionState(submit, INITIAL_STATE);

	const toggleEditing = () => setIsEditing((prev) => !prev);

	async function submit(prevState: State, formData: FormData) {
		const data = Object.fromEntries(formData) as UpdateUserSchema;
		const result = await updateUser(data, user?._id as string);
		if (result.success) {
			toast.success(result.message);
			setUser(result.data.user, true);
			toggleEditing();
			return { ...prevState, form: { ...prevState.form, ...data }, errors: { ...INITIAL_STATE.errors } };
		}
		toast.error(result.message);
		return { ...prevState, form: { ...prevState.form, ...data }, errors: { ...INITIAL_STATE.errors, ...result.errors } };
	}

	if (!user) return null;

	return (
		<div className="flex-1 h-full flex flex-col">
			<div className="flex justify-end gap-4">
				{isEditing && (
					<>
						<Button disabled={isPending} className={cn("")} variant="default" type="submit" form="account">
							{t(isPending ? "buttons.savingChanges" : "buttons.saveChanges")}
						</Button>
						<Button disabled={isPending} className={cn("bg-rose-600 hover:bg-rose-500")} variant="default" onClick={toggleEditing}>
							{t("buttons.cancelEditing")}
						</Button>
					</>
				)}
				{!isEditing && (
					<Button disabled={isPending} variant="default" onClick={toggleEditing}>
						{t("buttons.editProfile")}
					</Button>
				)}
			</div>
			<form id="account" className="space-y-4 flex-1" action={formAction}>
				<div>
					<Label htmlFor="avatar">
						<Avatar className="size-20">
							<AvatarImage src={user?.avatar} />
							<AvatarFallback>{`${user?.firstName[0]}${user?.lastName[0]}`}</AvatarFallback>
						</Avatar>
					</Label>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<InputField name="firstName" label={t("fields.firstName")} defaultValue={user?.firstName} error={state.errors?.firstName} disabled={!isEditing} />
					<InputField name="lastName" label={t("fields.lastName")} defaultValue={user?.lastName} error={state.errors?.lastName} disabled={!isEditing} />
				</div>
				<div className="grid grid-cols-2 gap-4">
					<InputField name="email" label={t("fields.email")} defaultValue={user?.email} error="" disabled />
					<InputField name="phone" label={t("fields.phone")} defaultValue={user?.phone} error={state.errors?.phone} disabled={!isEditing} />
				</div>
				<InputField name="address" label={t("fields.address")} defaultValue={user?.address} error={state.errors?.address} disabled={!isEditing} />
			</form>
		</div>
	);
}
