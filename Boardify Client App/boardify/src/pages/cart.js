import "../styles/cart.scss"
import { useShoppingCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import CartItem from "../components/CartItem";


export default function Cart() {
    const { cartQuantity, clientCart } = useShoppingCart();

    const products = []

    function calcTotal() {
        clientCart.reduce((total, cartItem) => {
            const item = products.find(i => i.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
        }, 0)
    }

    return (
        <div className="shopping-cart">
            {cartQuantity < 1 && (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <p>Find items in the shop!</p>
                    <Link to="/shop">
                    <Button
                            style={{
                                    backgroundColor: "#BB86FC",
                                    fontSize: "14px",
                                    color: "#212121",
                                    fontWeight: "bold"
                                    }}
                            variant="contained"
                            type="submit">
                                Shop
                        </Button>
                    </Link>
                </div>
            )}
            

            {cartQuantity > 0 && (
                <ul>
                    <h1>My cart ({cartQuantity} items)</h1>
                    {clientCart.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem}/>
                    ))}
                
                    <div className="total-price">
                        <h3>Total</h3>

                        <div className="sub-total">
                            <p>Sub-total</p>
                            <div>{calcTotal()}</div>
                        </div>
                        <div className="shipping">
                            <p>Shipping</p>
                            <div>FREE</div>
                        </div>
                        <div className="total">
                            <p>Total</p>
                            <div>CAD {calcTotal()}</div>
                        </div>
                        <Button
                            style={{
                                    backgroundColor: "#BB86FC",
                                    fontSize: "14px",
                                    color: "#212121",
                                    fontWeight: "bold"
                                    }}
                            variant="contained"
                            type="submit">
                                ORDER
                        </Button>
                    </div>
                </ul>
            )}
        </div>
    )
}