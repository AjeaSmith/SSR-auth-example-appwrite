"use server";

import { cookies } from "next/headers";
import { createAdminClient, createSessionClient } from "./appwrite";
import { SESSION_COOKIE } from "./const";
import { redirect } from "next/navigation";

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

export async function signUpWithEmail(formData) {
	const email = formData.get("email");
	const password = formData.get("password");
	const name = formData.get("name");

	if (!name) {
		return;
	}
	const { account } = await createAdminClient();

	await account.create(ID.unique(), email, password, name);
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

export async function signOut() {
	const { account } = await createSessionClient();

	cookies().delete(SESSION_COOKIE);
	await account.deleteSession("current");

	redirect("/sign-up");
}
