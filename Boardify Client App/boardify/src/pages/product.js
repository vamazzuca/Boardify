import "../styles/product.scss"
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from 'cloudinary-react';
import Button from '@mui/material/Button';

export default function Product() {
    const params = useParams();
    const productID = params.productId;
    const [product, setProduct] = useState({});

    

    const getProduct= async (data) => {

        
        
        await axios.post('https://localhost:7011/api/products/getProduct', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    setProduct(dt.product)
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
        const data = {
            ID: productID
        }

        getProduct(data);
    }, [productID])

    
    return (
        <div className="product">
            <Link to="/shop" className="return">
                {"< Go back"}
            </Link>
            <div className='main'>
                <div className='left'>
                <div className="image-container">
                        <Image style={{height: '30rem', width: '40rem'} } cloudName="daor4etop" publicId={product.imageURL} />
                    </div>
                </div>

                <div className='right'>
                    <div className="name">
                        <h1>{product.name}</h1>
                        <h1>Mechanical Keyboard</h1>
                    </div>
                    
                    <h2>{product.unitPrice} CAD</h2>
                    <p>Brand: {product.brand}</p>
                    <p>Manufacturer: {product.manufacturer}</p>
                    <p>Color: {product.color}</p>
                    <p>Switch Type: {product.switchType}</p>
                    <p>Number of Keys: {product.keyNumber}</p>
                    <p>Connectivity Technology: {product.connectivityTechnology}</p>
                    
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
                                Add to Cart
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}