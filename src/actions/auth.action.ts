"use server";

import { getZErrors } from "@/lib/utils";
import { signupSchema, SignupSchema } from "@/lib/validation/user.validation";

type E = { success: false; errors: object };
type S = { success: true; data: object };

type SignupReturnType = E | S;

export async function signup(data: SignupSchema): Promise<SignupReturnType> {
	try {
		const result = signupSchema.safeParse(data);
		if (!result.success) return { success: false, errors: getZErrors(result.error.issues) };
		return { success: true, data: result.data };
	} catch (error) {
		console.log(error);
		return { success: false, errors: { server: "Something went wrong!" } };
	}
}
