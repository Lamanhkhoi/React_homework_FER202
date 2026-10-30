export default function OrderSummary({ order }) {
    const { customer, items, totalQuantity, totalPrice } = order;

    return (
        <div className="card order">
            <h3>Order confirmation</h3>
            <p>Full name: {customer.fullName}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Address: {customer.address}</p>
            <p>Payment method: {customer.paymentMethod}</p>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}$ x {item.quantity}
                    </li>
                ))}
            </ul>
            <p className="totals">Total Quantity: <strong>{totalQuantity}</strong></p>
            <p className="totals">Total Price: <strong>{totalPrice}$</strong></p>
        </div>
    );
}
