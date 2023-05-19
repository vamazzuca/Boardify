import "../styles/login.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import axios from "axios"
import { useState } from "react";


export default function Login() {
    const schema = z.object({
        email: string().email(),
        password: string()
    })
    

    const { register, handleSubmit, formState, reset} = useForm({ resolver: zodResolver(schema) });
    const navigate = useNavigate();
    const [errorState, setErrorState] = useState("");

    const handleSave = async (formValues) => {

        const data = {
            Email: formValues.email,
            Password: formValues.password
        }
        
        await axios.post('https://localhost:7011/api/users/login', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    
                    navigate("/");
                } else if (dt.statusCode === 100) {
                    setErrorState(dt.statusMessage)
                }
            })
            .catch((error) => {
                setErrorState(error);
                
        })
        

        reset();
        
    }

    const { errors } = formState;

   
    return (
        <div className="login">
            <div className="form" onSubmit={handleSubmit(handleSave)}>
                <h1>Login</h1>
                <div className="inputs">
                    <form>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('email')}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null} />
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            type={"password"}
                            label="Password"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('password')}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null}/>
                    
                        <Button
                            style={{
                                    backgroundColor: "#BB86FC",
                                    fontSize: "14px",
                                    color: "#212121",
                                    fontWeight: "bold"
                                    }}
                            variant="contained"
                            type="submit">
                                Log In
                        </Button>
                        <div style={{ color: "red" }}>
                            {errorState.message}
                        </div>
                    </form>
                    <Link to="/register">
                        Dont have an account? Register here.
                    </Link>
                </div>
            </div>
        </div>
    )
}