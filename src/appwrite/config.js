import { Client, Account, Databases } from "node-appwrite";

// Gets access to the appwrite DB (client) with the help of API Key that allows permission
// Returns access to Account and Databases services

const createAdminClient = async () => {
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
};


const createSessionClient = async (session) => {
	const client = new Client()
		.setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
		.setProject(process.env.NEXT_PUBLIC_PROJECT_ID);

	if (session) {
		client.setSession(session);
	}

	return {
		get account() {
			return new Account(client);
		},

		get databases() {
			return new Databases(client);
		},
	};
};

export { createAdminClient, createSessionClient };

