import { Link } from "react-router-dom"
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "../styles/header.scss"
import Button from '@mui/material/Button';

export default function Header() {
    return (
        <div className="header">
            <div className="left">
                <Link to="/">
                    <h1>Boardify</h1>
                </Link>
            </div>
            <div className="right">
                <Link to="/">
                    Home
                </Link>
                <Link to="/shop">
                    Shop
                </Link>
                <Link>
                    About
                </Link>
                <Link to="/cart">
                    <ShoppingBagIcon></ShoppingBagIcon>
                </Link>
                <Button style={ {backgroundColor: "#BB86FC", fontSize: "14px", color:"#212121", fontWeight: "bold"}} variant="contained">Log In</Button>
            </div>
        </div>
    )
}