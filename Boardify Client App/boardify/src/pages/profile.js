import "../styles/profile.scss"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { string, z } from "zod"
import axios from "axios"
import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useCallback } from 'react'

export default function Profile() {

    const schema = z.object({
        email: string().email(),
        firstName: string(),
        lastName: string()
    })

    const { register, handleSubmit, formState} = useForm({ resolver: zodResolver(schema) });
    
    const [errorState, setErrorState] = useState("");
    const { errors } = formState;
    const { auth, setAuth } = useAuth();
    


    const getProfile = useCallback(async () => {

        const data = {
            ID: auth.id
        }
        
         await axios.post('https://localhost:7011/api/users/viewUser', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                        const email = dt.user.email;
                        const id = dt.user.id;
                        const type = dt.user.type;
                        const firstName = dt.user.firstName;
                        const lastName = dt.user.lastName;
                        setAuth({ id, email, type, firstName, lastName })
                }
                 else if (dt.statusCode === 100) {
                    setErrorState(dt.statusMessage)
                }
            })
            .catch((error) => {
                if (error?.response) {
                    setErrorState(error);
                } else {
                    setErrorState('No Server Response');
                }
                
            })

    }, [auth.id, setAuth])

    
    
    const handleUpdate = async (formValues) => {
     
        const data = {
            Email: formValues.email,
            FirstName: formValues.firstName,
            LastName: formValues.lastName,
            ID: auth.id
        }
        
        await axios.put('https://localhost:7011/api/users/updateProfile', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    getProfile();
                }else if (dt.statusCode === 100) {
                    setErrorState(dt.statusMessage)
                }
            })
            .catch((error) => {
                if (error?.response) {
                    setErrorState(error);
                } else {
                    setErrorState('No Server Response');
                }
                
            })
        
        
    }

    useEffect(() => {
        getProfile();
    }, [getProfile])
   
    
    return (
        <div className="profile">
            <div className="form" onSubmit={handleSubmit(handleUpdate)}>
                <h1>Profile</h1>
                <div className="inputs">
                    <form>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-basic" label="First Name"
                            variant="outlined"   
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            defaultValue={auth.firstName}
                            {...register('firstName')}
                            error={!!errors?.firstName}
                            helperText={errors?.firstName ? errors.firstName.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-helperText"
                            label="Last Name"
                            variant="outlined"
                            InputLabelProps={{ className: "input_label" }}
                            defaultValue={auth.lastName}
                            required={true}
                            {...register('lastName')}
                            error={!!errors?.lastName}
                            helperText={errors?.lastName ? errors.lastName.message : null}/>
                        <TextField
                            sx={{ input: { color: "#BB86FC" } }}
                            id="outlined-helperText"
                            label="Email"
                            variant="outlined"
                            defaultValue={auth.email}  
                            InputLabelProps={{ className: "input_label" }}
                            required={true}
                            {...register('email')}
                            error={!!errors?.email}
                            helperText={errors?.email ? errors.email.message : null}/>
                        
                    
                        <Button style={{
                        backgroundColor: "#BB86FC",
                        fontSize: "14px",
                        color: "#212121",
                        fontWeight: "bold"
                        }}
                            type="submit"
                            variant="contained">Update</Button>
                        <div style={{ color: "red" }}>
                            {errorState}
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>

    )
}