import auth from "@/auth";
import { redirect } from "next/navigation";

export default async function Login() {
	const user = await auth.getUser();
	if (user) redirect("/");
	return (
		<div>
			<form
				action={auth.createSession}
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100vh",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginBottom: "1rem",
					}}
				>
					<label htmlFor="email" style={{ marginBottom: "1rem" }}>
						Email:
					</label>
					<input
						style={{ padding: "1rem" }}
						type="email"
						name="email"
						placeholder="enter your email"
						defaultValue="ajea@mail.com"
					/>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						marginBottom: "1rem",
					}}
				>
					<label htmlFor="password" style={{ marginBottom: "1rem" }}>
						Password:
					</label>
					<input
						style={{ paddingBlock: "1rem", paddingInline: "1rem" }}
						type="password"
						name="password"
						placeholder="enter your password"
						defaultValue="password123"
					/>
				</div>
				<button type="submit" style={{ marginTop: "1rem", padding: "1rem" }}>
					Login
				</button>
			</form>
		</div>
	);
}
