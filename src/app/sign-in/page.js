import { signInWithGithub } from "../lib/server/oauth";
import { getLoggedInUser } from "../lib/server/appwrite";

import { redirect } from "next/navigation";
import { signInWithEmail } from "../lib/server/actions";
import Link from "next/link";
import SigninForm from "@/components/SigninForm";

export default async function SignInPage() {
	const user = await getLoggedInUser();
	if (user) redirect("/");

	return (
		<>
			<div className="min-h-screen flex flex-col justify-center">
				<SigninForm />
				<div className="mt-6">
					<form action={signInWithGithub} className="max-w-md mx-auto">
						<button
							type="submit"
							className="w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
						>
							Sign in with GitHub
						</button>
					</form>
				</div>

				<span className="block text-center mt-4 text-gray-600">
					Don't have an account?{" "}
					<Link href="/sign-up" className="text-blue-500 hover:underline">
						Sign Up
					</Link>
				</span>
			</div>
		</>
	);
}
