"use client";

import { login } from "@/actions/auth.action";
import InputField from "@/components/form/input-field";
import { Button } from "@/components/ui/button";
import { LoginSchema } from "@/lib/validation/user.validation";
import { useAuthStore } from "@/store/auth.store";
import { useLocale, useTranslations } from "next-intl";
import { redirect } from "@/i18n/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

const INITIAL_STATE = {
	errors: { email: "", password: "", server: null } as LoginSchema & { server?: string | null },
	form: { email: "", password: "" } as LoginSchema,
};

type State = typeof INITIAL_STATE;

export default function LoginForm() {
	const t = useTranslations("loginPage");
	const locale = useLocale();
	const [state, formAction, isPending] = useActionState(submit, INITIAL_STATE);
	const setUser = useAuthStore((state) => state.setUser);

	async function submit(prevState: State, formData: FormData) {
		const data = Object.fromEntries(formData) as LoginSchema;
		const result = await login(data);
		if (result.success) {
			setUser(result.data.user, true);
			toast.success(result.message);
			return redirect({ href: "/account", locale });
		}
		toast.error(result.message);
		return { ...prevState, form: { ...prevState.form, ...data }, errors: { ...INITIAL_STATE.errors, ...result.errors } };
	}

	return (
		<form action={formAction} className="mt-6 space-y-4">
			<InputField name="email" label={t("fields.email")} defaultValue={state.form.email} error={state.errors.email} />
			<InputField name="password" label={t("fields.password")} defaultValue={state.form.password} error={state.errors.password} type="password" />

			<Button disabled={isPending} type="submit" className="w-full">
				{t("title")}
			</Button>
		</form>
	);
}
