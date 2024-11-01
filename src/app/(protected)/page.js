import axiosInstance from "../lib/axiosinstance";

export default async function Home() {
	const response = await axiosInstance({
		url: "http://localhost:3000/api/orders",
		method: "get",
	});
	const orders = response.data.orders;
	return (
		<main className="container mx-auto max-w-[800px]">
			<div id="orders-container">
				<strong>Orders</strong>
				<p>Recent orders from your store.</p>

				<table>
					<thead>
						<tr>
							<th>Customer</th>
							<th>Total</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order.$id}>
								<td className="flex flex-col">
									<strong>{order.customer}</strong>
									<p>{order.customer_email}</p>
								</td>

								<td>${order.total}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
