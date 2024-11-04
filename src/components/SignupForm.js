"use client";
import { signUpWithEmail } from "@/app/lib/server/actions";
import { useActionState } from "react";

const SignupForm = () => {
	const [message, formAction, isPending] = useActionState(signUpWithEmail, {
		errors: {},
	});

	console.log("PENDING State: ", isPending);
	console.log("MESSAGE State: ", message.errors);
	console.log(formAction);
	return (
		<form
			action={formAction}
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
			{message.errors.fieldErrors?.email && (
				<p className="text-sm italic text-red-500">
					{message.errors.fieldErrors.email[0]}
				</p>
			)}
			<input
				id="password"
				name="password"
				placeholder="Password"
				type="password"
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
			/>
			{message.errors.fieldErrors?.password && (
				<p className="text-sm italic text-red-500">
					{message.errors.fieldErrors.password[0]}
				</p>
			)}

			<input
				id="name"
				name="name"
				placeholder="Name"
				type="text"
				className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
			/>
			{message.errors.fieldErrors?.name && (
				<p className="text-sm italic text-red-500">
					{message.errors.fieldErrors.name[0]}
				</p>
			)}

			<button
				disabled={isPending}
				type="submit"
				className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
			>
				Sign up
			</button>
		</form>
	);
};

export default SignupForm;
