import { createContext, useContext} from "react";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const cartContext = createContext({})


export function useShoppingCart() {
    return useContext(cartContext)
}

export const CartProvider = ({ children }) => {
    const [clientCart, setClientCart] = useLocalStorage("shopping-cart", []);

    

    const getItemQuantity = (id) => {
        //get cart item
        return clientCart.find(item =>item.id === id)?.quantity || 0
    }


    const increaseCartQuantity = (id) => {
        setClientCart(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                //Add Cart Item
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        //update cart item
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id) => {
        setClientCart(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
                //delete Cart Item
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        //update cart item
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id) => {
        // delete cart item
        setClientCart(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQuantity = clientCart.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )

    
    return (

    <cartContext.Provider value={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clientCart, cartQuantity}}>
        {children}
    </cartContext.Provider>
    )
}
