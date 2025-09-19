import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/user.type";
import { $ZodIssue } from "zod/v4/core";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateAccessToken(payload: JWTPayload) {
	const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1d" });
	return token;
}

export function generateRefreshToken(payload: { id: string }) {
	const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
	return token;
}

export function verifyAccessToken(token: string) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
		return decoded;
	} catch {
		return null;
	}
}

export function verifyRefreshToken(token: string) {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
		return decoded;
	} catch {
		return null;
	}
}

export function makeJson<T>(data: T): T {
	return JSON.parse(JSON.stringify(data));
}

export function getZErrors(issues: $ZodIssue[]) {
	const errors = {} as { [key: string]: string };
	for (const error of issues) {
		errors[error.path[0] as string] = error.message;
	}
	return errors;
}
