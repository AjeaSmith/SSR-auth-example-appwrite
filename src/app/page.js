import { redirect } from "next/navigation";
import { getLoggedInUser } from "./lib/server/appwrite";
import { signOut } from "./lib/server/actions";
import { Button } from "@/components/ui/button";

export default async function Home() {
	const user = await getLoggedInUser();
	if (!user) redirect("/sign-up");
	return (
		<>
			<h1 className="text-2xl font-bold">Protected Content Page</h1>
			{/* What you see here is the protected content */}
			<form action={signOut}>
				<Button type="submit">Sign Out</Button>
			</form>
		</>
	);
}
