"use server";

import { connectDB } from "@/lib/connection";
import { getZErrors, makeJson } from "@/lib/utils";
import { loginSchema, LoginSchema, signupSchema, SignupSchema, updateUserSchema, UpdateUserSchema } from "@/lib/validation/user.validation";
import User, { IUser } from "@/models/user.model";
import { UserType } from "@/types/user.type";
import { setCookie } from "./cookie.action";

type E = { success: false; message: string; errors: object };
type S = { success: true; message: string; data: { user: UserType } };

export async function signup(data: SignupSchema): Promise<E | S> {
	try {
		// validate data
		const result = signupSchema.safeParse(data);
		if (!result.success) return { success: false, message: "Invalid data", errors: getZErrors(result.error.issues) };

		// destructure data
		const { firstName, lastName, email, phone, password } = result.data;

		// connect to db
		await connectDB();

		// check if user exists
		const userExists = await User.findOne({ email });
		if (userExists) return { success: false, message: "Email already registered", errors: { email: "Email already registered" } };

		// create user
		const user: IUser = await User.create({ firstName, lastName, email, phone, password, fullName: `${firstName} ${lastName}` });
		if (!user) return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };

		// generate token
		const accessToken = user.createAccessToken();
		const refreshToken = user.createRefreshToken();

		// set cookies
		await setCookie("access_token", accessToken);
		await setCookie("refresh_token", refreshToken);

		return { success: true, message: "Successfully signed up!", data: { user: makeJson(user) } };
	} catch (error) {
		console.log(error);
		return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };
	}
}

export async function login(data: LoginSchema): Promise<E | S> {
	try {
		// validate data
		const result = loginSchema.safeParse(data);
		if (!result.success) return { success: false, message: "Invalid data", errors: getZErrors(result.error.issues) };

		// destructure data
		const { email, password } = result.data;

		// connect to db
		await connectDB();

		// check if user exists
		const userExists = await User.findOne({ email });
		if (!userExists) return { success: false, message: "Email not registered", errors: { email: "Email not registered" } };

		// check if password is correct
		const isPasswordCorrect = await userExists.comparePassword(password);
		if (!isPasswordCorrect) return { success: false, message: "Password is incorrect", errors: { password: "Password is incorrect" } };

		// generate token
		const accessToken = userExists.createAccessToken();
		const refreshToken = userExists.createRefreshToken();

		// set cookies
		await setCookie("access_token", accessToken);
		await setCookie("refresh_token", refreshToken);

		return { success: true, message: "Successfully logged in!", data: { user: makeJson(userExists) } };
	} catch (error) {
		console.log(error);
		return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };
	}
}

export async function logout() {
	try {
		await setCookie("access_token", "");
		await setCookie("refresh_token", "");
		return { success: true, message: "Successfully logged out!" };
	} catch (error) {
		console.log(error);
		return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };
	}
}

export async function updateUser(data: UpdateUserSchema, id: string): Promise<E | S> {
	try {
		// validate data
		const result = updateUserSchema.safeParse(data);
		if (!result.success) return { success: false, message: "Invalid data", errors: getZErrors(result.error.issues) };

		// destructure data
		const { firstName, lastName, phone, address } = result.data;
		const fullName = `${firstName} ${lastName}`;

		// connect to db
		await connectDB();

		// find and update user
		const user: IUser | null = await User.findByIdAndUpdate(id, { firstName, lastName, fullName, phone, address }, { new: true });
		if (!user) return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };

		return { success: true, message: "Successfully updated user!", data: { user: makeJson(user) } };
	} catch (error) {
		console.log(error);
		return { success: false, message: "Something went wrong!", errors: { server: "Something went wrong!" } };
	}
}
