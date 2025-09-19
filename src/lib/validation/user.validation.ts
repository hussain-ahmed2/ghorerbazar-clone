import * as z from "zod/v4";

const userSchema = z.object({
	firstName: z.string().min(2, { message: "First name must be at least 2 characters" }).max(50, { message: "First name must be at most 50 characters" }),
	lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }).max(50, { message: "Last name must be at most 50 characters" }),
	fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }).max(50, { message: "Full name must be at most 50 characters" }),
	email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, { message: "Invalid email format" }),
	password: z.string().min(6, { message: "Password must be at least 6 characters" }),
	phone: z.string().min(10, { message: "Phone number must be at least 10 characters" }).max(12, { message: "Phone number must be at most 12 characters" }),
	address: z.string().min(2, { message: "Address must be at least 2 characters" }).max(50, { message: "Address must be at most 50 characters" }),
	avatar: z.string().optional().default("/default-avatar.png"),
});

export const signupSchema = userSchema
	.pick({
		firstName: true,
		lastName: true,
		email: true,
		password: true,
		phone: true,
	})
	.extend({
		confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
	})
	.refine((data) => data.password === data.confirmPassword, { message: "Passwords do not match", path: ["confirmPassword"] });

export type SignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = userSchema.pick({ email: true, password: true });

export type LoginSchema = z.infer<typeof loginSchema>;
