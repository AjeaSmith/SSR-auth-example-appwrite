import { redirect } from "next/navigation";
import { getLoggedInUser } from "./lib/server/appwrite";
import Header from "@/components/Header";

export default async function Home() {
	const user = await getLoggedInUser();
	if (!user) redirect("/sign-up");
	return (
		<>
			<Header />
			<main className="px-5">
				<h1 className="text-2xl font-bold">Protected Content Page</h1>
				{/* What you see here is the protected content */}
			</main>
		</>
	);
}
