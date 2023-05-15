import "../styles/login.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="login">
            <div className="form">
                <h1>Login</h1>
                <div className="inputs">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" />
                
                    <Button style={{
                    backgroundColor: "#BB86FC",
                    fontSize: "14px",
                    color: "#212121",
                    fontWeight: "bold"
                    }} variant="contained">Log In</Button>
                    
                    <Link to="/register">
                        Dont have an account? Register here.
                    </Link>
                </div>
            </div>
        </div>
    )
}