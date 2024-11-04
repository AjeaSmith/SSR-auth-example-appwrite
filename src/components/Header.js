import { signOut } from "@/app/lib/server/actions";
import { getLoggedInUser } from "@/app/lib/server/appwrite";
import React from "react";
import { Button } from "./ui/button";

const Header = async () => {
	const user = await getLoggedInUser();
	return (
		<header className="flex items-center justify-between p-5 bg-slate-800 text-white mb-5">
			<h2 className="text-xl">Hello, {user.name}</h2>

			<form action={signOut}>
				<Button type="submit">Sign Out</Button>
			</form>
		</header>
	);
};

export default Header;
