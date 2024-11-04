"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { SESSION_COOKIE } from "./const";
import { redirect } from "next/navigation";
import { signUpSchema } from "@/lib/validationSchema";
import { ID } from "node-appwrite";

export async function signInWithEmail(formData) {
	const email = formData.get("email");
	const password = formData.get("password");

	const { account } = await createAdminClient();
	const session = await account.createEmailPasswordSession(email, password);

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, session.secret, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});

	redirect("/");
}

export async function signUpWithEmail(prevState, formData) {
	const data = {
		email: formData.get("email"),
		password: formData.get("password"),
		name: formData.get("name"),
	};

	const result = signUpSchema.safeParse(data);

	if (!result.success) {
		// Return validation errors to the client
		return { errors: result.error.flatten() };
	}

	const { account } = await createAdminClient();

	await account.create(ID.unique(), data.email, data.password, data.name);
	const session = await account.createEmailPasswordSession(data.email, data.password);

	const cookieStore = await cookies();
	cookieStore.set(SESSION_COOKIE, session.secret, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});

	redirect("/");
}

export async function signOut() {
	const { account } = await createSessionClient();

	cookies().delete(SESSION_COOKIE);
	await account.deleteSession("current");

	redirect("/sign-up");
}
