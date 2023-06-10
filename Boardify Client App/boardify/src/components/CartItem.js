import { Link } from "react-router-dom";
import { useShoppingCart } from "../context/cartContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { Image } from 'cloudinary-react';
import axios from "axios"
import { useState, useEffect} from "react";

export default function CartItem({ cartItem }) {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, getItemQuantity } = useShoppingCart();
  const [product, setProduct ] = useState({});

  
  const getProduct= async (data) => {

    console.log(data)
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
        ID: cartItem.id
    }

    getProduct(data);
}, [cartItem.id])

 
  return (
      <li>
        
        <Link to={`/shop/${product?.name}/${cartItem.id}`}>
          <Image style={{height: '30rem', width: '40rem'} } cloudName="daor4etop" publicId={product?.imageURL} />
        </Link>
      
        <div className="description">
          <Link to={`/shop/${cartItem.name}/${cartItem.id}`}>
            <p className="name">{product?.name}</p>
          </Link>
          <p className="price">{product?.unitPrice}</p>
          <p className="price">{getItemQuantity(cartItem.id)}</p>
        
          <div className="delete" onClick={() => removeFromCart(cartItem.id)}>
            <DeleteIcon></DeleteIcon>
            <p>Remove</p>
          </div>
        </div>
      
        <div className="add-and-remove">
          <button onClick={() => decreaseCartQuantity(cartItem.id)}>
            −
          </button>
          <p>{cartItem.quantity}</p>
          <button onClick={() => increaseCartQuantity(cartItem.id)}>
            +
          </button>
        </div>
      
    </li>
  )

}