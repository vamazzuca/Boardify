import { Link, useNavigate } from "react-router-dom";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "../styles/header.scss"
import Button from '@mui/material/Button';
import useAuth from "../hooks/useAuth";
import { useShoppingCart } from "../context/cartContext";


export default function Header() {

    const { auth } = useAuth();
    const { cartClientQuantity, cartServerQuantity } = useShoppingCart();
    
    const cartQuantity = () => {
        if (auth.email) {
            return cartServerQuantity
        } else {
            return cartClientQuantity
        }
    }

    const handleMenu = (btn) => {
        btn.target.classList.toggle("active");
        document.querySelector(".sandwich").classList.toggle("active");
      };

    return (
        <div className="header">
            <div className="left">
                <Link to="/">
                    <h1>Boardify</h1>
                </Link>
                <Link to="/profile">
                    {auth.email ? "Welcome, " + auth.firstName +" "+ auth.lastName: null}
                </Link>
            </div>
            <div className="right">
                <Link to="/admin-panel">
                    {auth.email && auth.type === "admin" ? "Admin Panel" : null}
                </Link>
                <Link to="/" className="shop">
                    Home
                </Link>
                <Link to="/shop" className="shop">
                    Shop
                </Link>
                <Link to="/cart" className="cart">
                    <ShoppingBagIcon/>
                    {cartQuantity() > 0 && cartQuantity() < 100 && <p>{cartQuantity()}</p>}
                    {cartQuantity() > 99 && <p>{99}+</p>}
                </Link>
                {auth.email ? <Logout /> : <Login />}
            </div>

            <button
                className="sandwich-button"
                onClick={(e) => handleMenu(e)}
            ></button>
            <div className="sandwich">
                <div className="menu">
                    <Link to="/admin-panel">
                        {auth.email && auth.type === "admin" ? "Admin Panel" : null}
                    </Link>
                    <Link to="/" className="shop">
                        Home
                    </Link>
                    <Link to="/shop" className="shop">
                        Shop
                    </Link>
                    <Link to="/cart" className="cart">
                        <ShoppingBagIcon/>
                        {cartQuantity() > 0 && cartQuantity() < 100 && <p>{cartQuantity()}</p>}
                        {cartQuantity() > 99 && <p>{99}+</p>}
                    </Link>
                    {auth.email ? <Logout /> : <Login />}

                </div>

            </div>
        </div>
    )
}


function Login() {

    return (
        <div className="login-button">
            <Link to="/login">
                <Button style={{
                    backgroundColor: "#BB86FC",
                    fontSize: "14px",
                    color: "#212121",
                    fontWeight: "bold"
                }} variant="contained">Log In</Button>
                </Link>
        </div>
    )
}

function Logout() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        setAuth({});
        navigate('/');
    }

    return (
        <div className="logout-button">
            <Button style={{
                    fontSize: "14px",
                    color: "#BB86FC",
                    fontWeight: "bold"
                }} variant="outlined" onClick={logoutHandler}>Log Out</Button>
        </div>
    )
}

