"use client";

import { signup } from "@/actions/auth.action";
import InputField from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { SignupSchema } from "@/lib/validation/user.validation";
import { useAuthStore } from "@/store/auth.store";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
	errors: { firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "", server: null } as SignupSchema & { server?: string | null },
	form: { firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "" } as SignupSchema,
};

type State = typeof INITIAL_STATE;

export default function SignUpForm() {
	const t = useTranslations("signUpPage");
	const [state, formAction, isPending] = useActionState(submit, INITIAL_STATE);
	const setUser = useAuthStore((state) => state.setUser);

	async function submit(prevState: State, formData: FormData) {
		const data = Object.fromEntries(formData) as SignupSchema;
		const result = await signup(data);
		if (result.success) {
			setUser(result.data.user, true);
			toast.success(result.message);
			redirect("/account");
		}
		toast.error(result.message);
		return { ...prevState, form: { ...prevState.form, ...data }, errors: { ...INITIAL_STATE.errors, ...result.errors } };
	}

	return (
		<form action={formAction} className="mt-6 space-y-4">
			<div className="grid grid-cols-2 gap-4">
				<InputField name="firstName" label={t("fields.firstName")} defaultValue={state.form.firstName} error={state.errors.firstName} />
				<InputField name="lastName" label={t("fields.lastName")} defaultValue={state.form.lastName} error={state.errors.lastName} />
			</div>

			<InputField name="email" label={t("fields.email")} defaultValue={state.form.email} error={state.errors.email} />
			<InputField name="phone" label={t("fields.phone")} defaultValue={state.form.phone} error={state.errors.phone} />
			<InputField name="password" label={t("fields.password")} defaultValue={state.form.password} error={state.errors.password} type="password" />
			<InputField name="confirmPassword" label={t("fields.confirmPassword")} defaultValue={state.form.confirmPassword} error={state.errors.confirmPassword} type="password" />

			<Button disabled={isPending} type="submit" className="w-full">
				{t("title")}
			</Button>
		</form>
	);
}
