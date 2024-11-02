import { cookies } from "next/headers";
import { Client, Account, Databases } from "node-appwrite";
import { SESSION_COOKIE } from "./const";

export async function createSessionClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
		.setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

	const cookieStore = await cookies();
	const session = cookieStore.get(SESSION_COOKIE);

	if (!session || !session.value) {
		throw new Error("No session");
	}

	// authenticate user by session, then allow access to DB
	client.setSession(session.value);

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		},
	};
}
export async function createAdminClient() {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
		.setProject(process.env.NEXT_PUBLIC_PROJECT_ID)
		.setKey(process.env.NEXT_PUBLIC_API_KEY);

	return {
		get account() {
			return new Account(client);
		},
		get databases() {
			return new Databases(client);
		},
	};
}

export async function getLoggedInUser() {
	try {
		const { account } = await createSessionClient();
		return await account.get();
	} catch (error) {
		return null;
	}
}

