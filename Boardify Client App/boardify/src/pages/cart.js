import "../styles/cart.scss"
import { useShoppingCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import CartItem from "../components/CartItem";
import axios from "axios"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";



export default function Cart() {
    const { cartClientQuantity, clientCart, serverCart, cartServerQuantity } = useShoppingCart();
    const [cartQuantity, setCartQuantity] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { auth } = useAuth();
  
    
    const createCart = () => {
        if (auth.email) {
            setCartQuantity(cartServerQuantity)
            setCart(serverCart)
        } else {
            setCartQuantity(cartClientQuantity)
            setCart(clientCart)
        }
    }
    
    

    const total = cart.reduce((total, cartItem) => {
        const item = products.find(i => i.id === parseInt(cartItem.productID))
        return(total + (item?.unitPrice || 0) * cartItem.quantity)
    }, 0)

    
    const getProducts = async () => {

        
        await axios.get('https://localhost:7011/api/products/getProducts')
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    setProducts(dt.listproducts)
                    
                }
                 else if (dt.statusCode === 100) {
                    console.log(dt.statusMessage)
                }
            })
            .catch((error) => {
                if (error?.response) {
                    console.log(error);
                } else {
                    console.log('No Server Response');
                }
                
            })

    }

    useEffect(() => {
        getProducts();
        createCart();
        
    })

    
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
                    {cart.map((cartItem, index) => (
                        <CartItem key={index} cartItem={cartItem}/>
                    ))}
                
                    <div className="total-price">
                        <h3>Total</h3>

                        <div className="sub-total">
                            <p>Sub-total</p>
                            <div>{total}</div>
                        </div>
                        <div className="shipping">
                            <p>Shipping</p>
                            <div>FREE</div>
                        </div>
                        <div className="total">
                            <p>Total</p>
                            <div>CAD {total}</div>
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