import { redirect } from "next/navigation";
import { getLoggedInUser } from "../lib/server/appwrite";
import { signInWithGithub } from "../lib/server/oauth";

import { signUpWithEmail } from "../lib/server/actions";
import Link from "next/link";

export default async function SignUpPage() {
	const user = await getLoggedInUser();
	if (user) redirect("/");

	return (
		<div className="min-h-screen flex flex-col justify-center">
			<form
				action={signUpWithEmail}
				className="space-y-4 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
			>
				<h2 className="text-2xl font-semibold text-center text-gray-800">
					Sign Up
				</h2>
				<input
					id="email"
					name="email"
					placeholder="Email"
					type="email"
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
				/>
				<input
					id="password"
					name="password"
					placeholder="Password"
					minLength={8}
					type="password"
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
				/>
				<input
					id="name"
					name="name"
					minLength={2}
					placeholder="Name"
					type="text"
					className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
				/>
				<button
					type="submit"
					className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
				>
					Sign up
				</button>
			</form>

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
