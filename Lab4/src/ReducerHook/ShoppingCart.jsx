import { useReducer, useState } from "react"
import CheckoutForm from "./CheckoutForm"
import OrderSummary from "./OrderSummary"

const initialState = {items: []};

function reducer(state, action) {
    switch (action.type) {
        case "add":
            {
                const existing = state.items.find((i) => i.id === action.products.id);
                if(existing){
                    return { items: state.items.map((i) => i.id === action.products.id ? { ...i, quantity: i.quantity + 1} : i)}
                }
                return {items:[...state.items, {...action.products, quantity: 1}]};
            }
        case "remove":
            return { items: state.items.filter((i) => i.id !== action.id) };
        case "update_quantity":
            return { items: state.items.map((i) => i.id === action.products.id ? { ...i, quantity: action.products.quantity } : i) };
        case "clear":
            return initialState;
    
        default:
            throw Error("unknown type: " + action.type)
    }
} 

const products = [
    { id: 1, name: "Item 1", price: 5 },
    { id: 2, name: "Item 2", price: 10 },
    { id: 3, name: "Item 3", price: 20} 
];

export default function ShoppingCart() {

    const [cart, dispatch] = useReducer(reducer, initialState)
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const [order, setOrder] = useState(null);

    function handleOrderSubmit(values) {
        setOrder({
            customer: values,
            items: cart.items,
            totalQuantity,
            totalPrice,
        });
        dispatch({ type: "clear" });
    }

    return(
        <>
            <section className="card">
                <h3> Product list:</h3>
                <ul>
                    {products.map((p) => (
                        <li key={p.id}>
                            <span className="name">{p.name}</span>
                            <span className="price">{p.price}$</span>
                            <button onClick={() => dispatch({type: "add", products: p})}>Add to cart</button>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="card">
                <h3>Shopping cart: </h3>
                {cart.items.length === 0 && <p className="empty">Your cart is empty. Add an item above to start.</p>}
                <ul>
                    {cart.items.map((item) => (
                        <li key={item.id}>
                            <span className="name">{item.name}</span>
                            <span className="price">{item.price}$</span>
                            <input type="number" min="1" value={item.quantity}
                            aria-label={"Quantity of " + item.name}
                            onChange={(e) => dispatch({ type: "update_quantity", products: {id: item.id, quantity: Number(e.target.value)}})}
                            />
                            <button className="btn-danger" onClick={() => dispatch({ type: "remove", id: item.id })}>Remove</button>
                        </li>
                    ))}
                </ul>
                <p className="totals">Total Quantity: <strong>{totalQuantity}</strong></p>
                <p className="totals">Total Price: <strong>{totalPrice}$</strong></p>
                <button className="btn-danger cart-actions" onClick={() => dispatch({ type: "clear" })}>Clear cart</button>
            </section>
            <CheckoutForm
                isCartEmpty={cart.items.length === 0}
                onOrderSubmit={handleOrderSubmit}
            />

            {order && <OrderSummary order={order} />}
        </>
    )
}
