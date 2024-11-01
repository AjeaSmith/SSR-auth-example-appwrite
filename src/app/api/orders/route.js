import { createSessionClient } from "@/appwrite/config";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request) {
	const sessionCookie = (await cookies()).get("session");

	try {
		const { databases } = await createSessionClient(sessionCookie.value);
		const { documents: orders, total } = await databases.listDocuments(
			process.env.NEXT_PUBLIC_DATABASE_ID,
			process.env.NEXT_PUBLIC_COLLECTION_PRODUCTS
		);
		return Response.json({ orders, total });
	} catch (error) {
		console.error("ERROR", error);
		return Response.json("Access DENIED!", {
			status: 403,
		});
	}
}
