import { createContext, useContext} from "react";
import { useState, useEffect} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios"
import useAuth from "../hooks/useAuth";

const cartContext = createContext({})


export function useShoppingCart() {
    return useContext(cartContext)
}

export const CartProvider = ({ children }) => {
    const [clientCart, setClientCart] = useState([]);
    const [serverCart, setServerCart] = useState([]);
    const { auth } = useAuth();

    

    const getCart = async (data) => {

        await axios.post('https://localhost:7011/api/products/getCart', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    
                    setServerCart(dt.listCart)
                    
                }
                 else if (dt.statusCode === 100) {
                    
                    setServerCart([])
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

    const updateCart = async (cartID, quantity) => {

        const data = {
            id: cartID,
            quantity: quantity
        }

        
        await axios.put('https://localhost:7011/api/products/updateFromCart', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    getCart({ UserID: auth.id });
                } else if (dt.statusCode === 100) {
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

    const addCart = async (userID, productID, quantity) => {

        const data = {
            userID: userID,
            productID: productID,
            quantity: quantity
        }


        await axios.post('https://localhost:7011/api/products/addToCart', data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    getCart({ UserID: auth.id });
                } else if (dt.statusCode === 100) {
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

    const deleteCart = async (cartID) => {


        await axios.delete('https://localhost:7011/api/products/deleteFromCart', {data: {id: cartID}})
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    getCart({ UserID: auth.id });
                } else if (dt.statusCode === 100) {
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
            UserID: auth.id
        }

        
        if (auth.email) {
            getCart(data);  
        }
      
    }, [auth.email, auth.id, serverCart])

    
    const mergeCart = (userID) => {
        clientCart.forEach((clientItem) => {

            if (serverCart.find(serverItem => parseInt(clientItem.productID) === serverItem.productID) == null) {
                //Add Cart Item
                
                addCart(userID, parseInt(clientItem.productID), parseInt(clientItem.quantity));
            } else {
                const item  = serverCart.find(serverItem => parseInt(clientItem.productID) === serverItem.productID)
                        //update cart item
                    if (item.productID === parseInt(clientItem.productID)) {
                        
                        updateCart(item.id, item.quantity + parseInt(clientItem.quantity))  
                    }
            }
        })

        setClientCart([]);
    }
    
    const getItemQuantity = (productID) => {
        if (auth.email) {
            return serverCart.find(item =>item.productID === productID)?.quantity || 0
        } else {
            return clientCart.find(item =>item.productID === productID)?.quantity || 0
        }
    }


    const increaseCartQuantity = (productID) => {
        if (auth.email) {
                
                if (serverCart.find(item => item.productID === parseInt(productID)) == null) {
                    //Add Cart Item
                    addCart(auth.id, productID, 1);
                    
                } else {
                    const item  = serverCart.find(item => item.productID === parseInt(productID))
                        //update cart item
                    if (item.productID === parseInt(productID)) {
                        
                        updateCart(item.id, item.quantity + 1)  
                    }
                           
            }
            
        } else {
            setClientCart(currItems => {
                if (currItems.find(item => item.productID === productID) == null) {
                    //Add Cart Item
                    return [...currItems, { productID, quantity: 1 }]
                } else {
                    return currItems.map(item => {
                        if (item.productID === productID) {
                            //update cart item
                            return { ...item, quantity: item.quantity + 1 }
                        } else {
                            return item
                        }
                    })
                }
            })
        }
    }

    const decreaseCartQuantity = (productID) => {
        if (auth.email) {
            
                if (serverCart.find(item => item.productID === parseInt(productID))?.quantity === 1) {
                    //delete Cart Item
                    deleteCart(serverCart.find(item => item.productID === parseInt(productID))?.id)
                } else {
                    const item = serverCart.find(item => item.productID === parseInt(productID))
                        //update cart item
                    if (item.productID === parseInt(productID)) {
                        updateCart(item.id, item.quantity - 1) 
                    }
                        
         
                }
           
        } else {
            setClientCart(currItems => {
                if (currItems.find(item => item.productID === productID)?.quantity === 1) {
                    //delete Cart Item
                    return currItems.filter(item => item.productID !== productID)
                } else {
                    return currItems.map(item => {
                        if (item.productID === productID) {
                            //update cart item
                            return { ...item, quantity: item.quantity - 1 }
                        } else {
                            return item
                        }
                    })
                }
            })
        }
    }

    const removeFromCart = (productID) => {
        if (auth.email) { 
            deleteCart(serverCart.find(item => item.productID === productID)?.id)
        } else {
            setClientCart(currItems => {
                return currItems.filter(item => item.productID !== productID)
            }) 
        }
    }

    const cartClientQuantity = clientCart.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    
    const cartServerQuantity = serverCart?.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )
    

   
    return (

        <cartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            clientCart,
            setClientCart,
            serverCart,
            cartClientQuantity,
            cartServerQuantity,
            mergeCart
        }}>
        {children}
    </cartContext.Provider>
    )
}
