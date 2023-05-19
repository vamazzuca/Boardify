import "../styles/register.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

export default function Register() {
   
    return (
        <div className="register">
            <div className="form">
                <h1>Register</h1>
                <div className="inputs">
                    <TextField sx={{ input: { color: "#BB86FC" } }} id="outlined-basic" label="First Name" variant="outlined" InputLabelProps={{ className: "input_label" }} />
                    <TextField sx={{ input: { color: "#BB86FC" } }} id="outlined-basic" label="Last Name" variant="outlined" InputLabelProps={ {className: "input_label"}} />
                    <TextField sx={{ input: { color: "#BB86FC" } }} id="outlined-basic" label="Email" variant="outlined" InputLabelProps={ {className: "input_label"}} />
                    <TextField sx={{ input: { color: "#BB86FC" } }} id="outlined-basic" label="Password" variant="outlined" InputLabelProps={{ className: "input_label" }} />
                    <TextField sx={{input: {color: "#BB86FC"}}} id="outlined-basic" label="Confirm Password" variant="outlined" InputLabelProps={ {className: "input_label"}}/>
                
                    <Button style={{
                    backgroundColor: "#BB86FC",
                    fontSize: "14px",
                    color: "#212121",
                    fontWeight: "bold"
                    }} variant="contained">Submit</Button>
                    
                    <Link to="/login">
                        Already have an account? Login here.
                    </Link>
                </div>
            </div>
        </div>
    )
}