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
];

export default function ShoppingCart() {

    const [cart, dispatch] = useReducer(reducer, initialState)
    // const [newQuantity, setUpdateQuantity] = useState();
    const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // order = null khi chưa đặt hàng; có giá trị sau khi submit form thành công
    const [order, setOrder] = useState(null);

    function handleOrderSubmit(values) {
        // 1) Lưu lại bản "chụp" đơn hàng (thông tin khách + giỏ hiện tại + tổng)
        setOrder({
            customer: values,
            items: cart.items,
            totalQuantity,
            totalPrice,
        });
        // 2) Xóa giỏ hàng
        dispatch({ type: "clear" });
    }

    return(
        <>
            <h3> Product list:</h3>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - {p.price}$  
                        <button onClick={() => dispatch({type: "add", products: p})}>Add to cart</button>
                    </li>
                ))}
            </ul>

            <h3>Shopping cart: </h3>
            <ul>
                {cart.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price}$
                        <input type="number" min="1" value={item.quantity}
                        onChange={(e) => dispatch({ type: "update_quantity", products: {id: item.id, quantity: Number(e.target.value)}})}
                        />
                        <button onClick={() => dispatch({ type: "remove", id: item.id })}>Remove</button>
                    </li>
                ))}
            </ul>
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: {totalPrice}$</p>
            <button onClick={() => dispatch({ type: "clear" })}>Clear cart</button>
            <CheckoutForm
                isCartEmpty={cart.items.length === 0}
                onOrderSubmit={handleOrderSubmit}
            />

            {order && <OrderSummary order={order} />}
        </>
    )
}