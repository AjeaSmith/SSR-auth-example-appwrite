import Header from "@/components/Header";

export default function ProtectedLayout({ children }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}
