"use client";
import { signInWithEmail } from "@/app/lib/server/actions";
import { useActionState } from "react";

const SigninForm = () => {
	const [message, formAction, isPending] = useActionState(signInWithEmail, {
		errors: {},
	});

	return (
		<form
			action={formAction}
			className="space-y-4 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto"
		>
			<h2 className="text-2xl font-semibold text-center text-gray-800">
				Sign In
			</h2>
			<input
				id="email"
				name="email"
				placeholder="Email"
				type="email"
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
			/>
			{message.errors.fieldErrors?.email && (
				<p className="text-sm italic text-red-500">
					{message.errors.fieldErrors.email[0]}
				</p>
			)}
			<input
				id="password"
				name="password"
				placeholder="Password"
				minLength={8}
				type="password"
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
			/>
			{message.errors.fieldErrors?.password && (
				<p className="text-sm italic text-red-500">
					{message.errors.fieldErrors.password[0]}
				</p>
			)}

			<button
				disabled={isPending}
				type="submit"
				className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
			>
				Sign In
			</button>
		</form>
	);
};

export default SigninForm;
