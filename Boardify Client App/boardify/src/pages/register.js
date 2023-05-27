import "../styles/register.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import axios from "axios"
import { useState } from "react";


export default function Register() {
    const [isSuccessful, setIsSuccessful] = useState(false);

    return (
        <div>
            {isSuccessful ? <RegisterSuccess /> : <RegisterForm setIsSuccessful={setIsSuccessful}/>}
        </div>
    )
}

function RegisterForm(props) {

    const schema = z.object({
        email: string().email(),
        password: string().min(8, { message: "Must be at least 8 characters long" }),
        confirmPassword: string().min(8, {message: "Must be at least 8 characters long"}),
        firstName: string(),
        lastName: string()
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords do not match",
                path: ['confirmPassword']
            })
        }
    })

    const { register, handleSubmit, formState, reset} = useForm({ resolver: zodResolver(schema) });
    
    const [errorState, setErrorState] = useState("");

    const { errors } = formState;
    
    const handleRegister = async (formValues) => {
     
        const data = {
            Email: formValues.email,
            Password: formValues.password,
            FirstName: formValues.firstName,
            LastName: formValues.lastName,
        }

        
        
        await axios.post('https://localhost:7011/api/users/registration', data)
            .then((result) => {
                const dt = result.data;
                
                if (dt.statusCode === 200) {
                    reset();
                    props.setIsSuccessful(true)
                } else if (dt.statusCode === 100) {
                    setErrorState(dt.statusMessage)
                }
            })
            .catch((error) => {
                setErrorState(error);
                
        })
        
        
    }
   
    return (
        <div className="register">
            <div className="form" onSubmit={handleSubmit(handleRegister)}>
                <h1>Register</h1>
                <div className="inputs">
                    <form>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic" label="First Name"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('firstName')}
                            error={!!errors?.firstName}
                            helperText={errors?.firstName ? errors.firstName.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            label="Last Name"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('lastName')}
                            error={!!errors?.lastName}
                            helperText={errors?.lastName ? errors.lastName.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('email')}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            label="Password"
                            type={"password"}
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('password')}
                            error={!!errors?.password}
                            helperText={errors?.password ? errors.password.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic"
                            label="Confirm Password"
                            type={"password"}
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('confirmPassword')}
                            error={!!errors?.confirmPassword}
                            helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}/>
                    
                        <Button style={{
                        backgroundColor: "#BB86FC",
                        fontSize: "14px",
                        color: "#212121",
                        fontWeight: "bold"
                        }}
                            type="submit"
                            variant="contained">Submit</Button>
                        <div style={{ color: "red" }}>
                            {errorState}
                        </div>
                    </form>
                    <Link to="/login">
                        Already have an account? Login here.
                    </Link>
                </div>
            </div>
        </div>
    )
}

function RegisterSuccess() {
    
    return (
        <div className="success">
            <div className="container">
                <h1>Successfully Registered</h1>
                    
                    <Link to="/login">
                        <Button style={{
                                    backgroundColor: "#BB86FC",
                                    fontSize: "14px",
                                    color: "#212121",
                                    fontWeight: "bold"
                            }} variant="contained">Return to Login</Button>
                        </Link>
                    
            </div>
        </div>
    )
}