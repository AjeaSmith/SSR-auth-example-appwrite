import { redirect } from "next/navigation";
import { getLoggedInUser } from "../lib/server/appwrite";
import { signInWithGithub } from "../lib/server/oauth";
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default async function SignUpPage() {
	const user = await getLoggedInUser();
	if (user) redirect("/");

	return (
		<div className="min-h-screen flex flex-col justify-center">
			<SignupForm />
			<div className="mt-6">
				<form action={signInWithGithub} className="max-w-md mx-auto">
					<button
						type="submit"
						className="w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition duration-300"
					>
						Sign up with GitHub
					</button>
				</form>
			</div>

			<span className="block text-center mt-4 text-gray-600">
				Already got an account?{" "}
				<Link href="/sign-in" className="text-blue-500 hover:underline">
					Sign in
				</Link>
			</span>
		</div>
	);
}
