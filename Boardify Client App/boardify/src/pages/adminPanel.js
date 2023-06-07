import "../styles/adminpanel.scss"
import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

export default function AdminPanel() {
    const [products, setProducts] = useState([]);

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

    const handleDelete = async (productID) => {
       
        

        await axios.delete('https://localhost:7011/api/admin/deleteProducts', {data: {id: productID}})
            .then((result) => {
                const dt = result.data;
                 if (dt.statusCode === 100) {
                     console.log(dt.statusMessage)
                     console.log("test")
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
    }, [products])

    
   
    return (
        <div className="admin-panel">
            <div className="sidebar"></div>
            <div className="table">
                <div className="add">
                <Link to="/admin-panel/add-product">
                <Button style={{
                        backgroundColor: "#BB86FC",
                        fontSize: "14px",
                        color: "#212121",
                        fontWeight: "bold"
                        }} variant="contained">Add Product</Button>
                </Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Manufacturer</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Color</th>
                            <th>Connectivity Technology</th>
                            <th>Switch Type</th>
                            <th>Key Number</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                    
                        {
                            
                            products.map((prod, index) => {
                                
                                return (
                                    <tr key={index}>
                                        <td>{prod.id}</td>
                                        <td>{prod.name}</td>
                                        <td>{prod.brand}</td>
                                        <td>{prod.manufacturer}</td>
                                        <td>{prod.unitPrice}</td>
                                        <td>{prod.discount}</td>
                                        <td>{prod.color}</td>
                                        <td>{prod.connectivityTechnology}</td>
                                        <td>{prod.switchType}</td>
                                        <td>{prod.keyNumber}</td>
                                        <td>
                                            <Link to={`/admin-panel/edit-product/${prod.id}`}>
                                                <Button 
                                                    style={{
                                                        backgroundColor: "#BB86FC",
                                                        fontSize: "14px",
                                                        color: "#212121",
                                                        fontWeight: "bold"
                                                        }} variant="contained">Edit</Button>
                                                </Link>
                                        </td>
                                        <td>
                                            <Button onClick={() => handleDelete(prod.id)}
                                                style={{
                                                    backgroundColor: "#FF0000",
                                                    fontSize: "14px",
                                                    color: "#212121",
                                                    fontWeight: "bold"
                                            }} variant="contained">Delete</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
        </div>
    )
}