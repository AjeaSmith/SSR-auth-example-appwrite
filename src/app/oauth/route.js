// src/app/oauth/route.js

import { createAdminClient } from "../lib/server/appwrite";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "../lib/server/const";

export async function GET(request) {
	const userId = request.nextUrl.searchParams.get("userId");
	const secret = request.nextUrl.searchParams.get("secret");

	const { account } = await createAdminClient();
	const session = await account.createSession(userId, secret);

	const cookieStore = await cookies();

	cookieStore.set(SESSION_COOKIE, session.secret, {
		path: "/",
		httpOnly: true,
		sameSite: "strict",
		secure: true,
	});

	return NextResponse.redirect(`${request.nextUrl.origin}`);
}
