import "../styles/store.scss"
import axios from "axios"
import { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Image } from 'cloudinary-react';



export default function Store() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("all");

    const location = useLocation()
    

    const checkCategory = useCallback(() => {
        if (location.state) {
            const { from } = location.state
            setCategory(from)
        }
    }, [location.state])

    const changeCategory = (category) => {
        setCategory(category)
    }

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

    useEffect(() => {
        getProducts();
        checkCategory();
    }, [checkCategory])

   
   
    return (
        <div className="store">
            
            <div className="categories">
                <h2>Shop/</h2>
                <h1>{category.charAt(0).toUpperCase() + category.slice(1) + " Switchs"}</h1>            
                <ul>
                    <li><p onClick={() => changeCategory('all')}>All Switchs</p></li>
                    <li><p onClick={() => changeCategory('black')}>Black Switchs</p></li>
                    <li><p onClick={() => changeCategory('blue')}>Blue Switchs</p></li>
                    <li><p onClick={() => changeCategory('red')}>Red Switchs</p></li>
                    <li><p onClick={() => changeCategory('brown')}>Brown Switchs</p></li>
                </ul>
            </div>
           
            <div className="products">
                <ul>
                    {products.map((product) => ( category === "all" ?
                        <Card
                            key={product.id}
                            url={product.imageURL}
                            name={product.name}
                            price={product.unitPrice}
                            id={product.id} /> : (category === product.switchType.toLowerCase() ?
                                <Card
                                    key={product.id}
                                    url={product.imageURL}
                                    name={product.name}
                                    price={product.unitPrice}
                                    id={product.id} />: null)))
                        }
                </ul>
            </div>
        </div>
    )
}


function Card({url, name, price, id}) {
    return (
        <Link to={`/shop/${name}/${id}`}>
            <div className="card">
                <li>
                    <div className="image-container">
                        <Image style={{height: '15rem', width: '20rem'} } cloudName="daor4etop" publicId={url} />
                    </div>
                    <p className="name">{name} Mechanical Keyboard</p>
                    <p className="price">{price} CAD</p>
                </li>
            </div>
        </Link>
    )
}