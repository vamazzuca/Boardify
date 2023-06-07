import "../styles/addproduct.scss"
import axios from "axios"
import { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Image } from 'cloudinary-react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { string, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

export default function AddProduct() {

    const schema = z.object({
        name: string(),
        brand: string(),
        manufacturer: string(),
        unitPrice: string(),
        color: string(),
        switchType: string(),
        connectivityTechnology: string(),
        keyNumber: string(),
        discount: string()
    })

    const navigate = useNavigate();
    const { register, handleSubmit, formState } = useForm({ resolver: zodResolver(schema) });
    const [errorState, setErrorState] = useState("");
    const [imageError, setImageError] = useState("");
    const [imageURL, setImageURL] = useState("");
    const { errors } = formState;

    const setProduct = async (formValues) => {

        const data = {
            name: formValues.name,
            brand: formValues.brand,
            manufacturer: formValues.manufacturer,
            unitPrice: parseFloat(formValues.unitPrice),
            color: formValues.color,
            switchType: formValues.switchType,
            connectivityTechnology: formValues.connectivityTechnology,
            keyNumber: parseInt(formValues.keyNumber),
            discount: parseFloat(formValues.discount),
            imageURL: imageURL,
            
        }
        
        await axios.post('https://localhost:7011/api/admin/addProducts', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    navigate("/admin-panel");
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

    }

    const uploadImage = (files) => {
        const formData = new FormData()
        formData.append("file", files[0])
        formData.append("upload_preset", "kpvxwzhc")

        axios.post('https://api.cloudinary.com/v1_1/daor4etop/image/upload', formData)
            .then((result) => {
                const dt = result.data.url;
                setImageURL(dt);
            })
            .catch((error) => {
                if (error?.response) {
                    setImageError(error);
                } else {
                    setImageError('No Server Response');
                }
                
            })

    }


    return (
        <div className="add-product">
            <Link to="/admin-panel" className="return">
                {"< Go back"}
            </Link>
            <div className='main'>
                <div className='left'>
                    <div className="image-container">
                        {imageURL === "" ?
                            <img style={{ height: '30rem', width: '40rem' }} src={require("../images/empty.jpg")} alt="Empty" /> :
                            <Image style={{ height: '30rem', width: '40rem' }} cloudName="daor4etop" publicId={imageURL} />}
                    </div>
                    <label htmlFor="file-upload" className="custom-file-upload">
                        Upload Image
                    </label>
                    <input id="file-upload" type="file" onChange={(event) => {
                        uploadImage(event.target.files)
                    }} />
                    <div style={{ color: "red" }}>
                        {imageError}
                     </div>

                </div>

                <div className='right'>
                    <h1>Add Product</h1>
                    <div className="form" onSubmit={handleSubmit(setProduct)}>
                        
                        <form>
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('name')}
                                error={!!errors?.name}
                                helperText={errors?.name ? errors.name.message : null}/>
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Brand"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('brand')}
                                error={!!errors?.brand}
                                helperText={errors?.brand ? errors.brand.message : null}/>
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Manufacturer"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('manufacturer')}
                                error={!!errors?.manufacturer}
                                helperText={errors?.manufacturer ? errors.manufacturer.message : null}/>
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Unit Price"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                type="number"
                                inputProps={{
                                    maxLength: 13,
                                    step: ".01"
                                  }}
                                {...register('unitPrice')}
                                error={!!errors?.unitPrice}
                                helperText={errors?.unitPrice ? errors.unitPrice.message : null}/>
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Color"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('color')}
                                error={!!errors?.color}
                                helperText={errors?.color? errors.color.message : null} />
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Switch Type"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('switchType')}
                                error={!!errors?.switchType}
                                helperText={errors?.switchType ? errors.switchType.message : null} />
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Connectivity Technology"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                {...register('connectivityTechnology')}
                                error={!!errors?.connectivityTechnology}
                                helperText={errors?.connectivityTechnology? errors.connectivityTechnology.message : null} />
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic"
                                label="Key Number"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                type="number"
                                min="0"
                                {...register('keyNumber')}
                                error={!!errors?.keyNumber}
                                helperText={errors?.keyNumber ? errors.keyNumber.message : null} />
                            <TextField
                                sx={{ input: { color: "#BB86FC" } }}
                                id="outlined-basic" label="Discount"
                                variant="outlined"
                                InputLabelProps={{ className: "input_label" }}
                                required={true}
                                type="number"
                                inputProps={{
                                    maxLength: 13,
                                    step: ".01"
                                  }}
                                min="0"
                                {...register('discount')}
                                error={!!errors?.discount}
                                helperText={errors?.discount ? errors.discount.message : null}/>
                            
                            <div className="button">
                                <Button
                                    style={{
                                            backgroundColor: "#BB86FC",
                                            fontSize: "14px",
                                            color: "#212121",
                                            fontWeight: "bold",
                                            width: "100%"
                                            }}
                                    variant="contained"
                                    type="submit">
                                        Submit
                                </Button>
                            </div>

                            <div style={{ color: "red" }}>
                                {errorState}
                            </div>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}