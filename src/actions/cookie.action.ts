"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string) {
	const cookieStore = await cookies();
	cookieStore.set(name, value);
}

export async function removeCookie(name: string) {
	const cookieStore = await cookies();
	cookieStore.delete(name);
}

export async function getCookie(name: string) {
	const cookieStore = await cookies();
	return cookieStore.get(name)?.value;
}

export async function hasCookie(name: string) {
	const cookieStore = await cookies();
	return cookieStore.has(name);
}
