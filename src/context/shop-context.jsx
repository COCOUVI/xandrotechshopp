import React, { createContext, useState } from 'react'
import { PRODUCTS } from '../product'
import { Product } from '../pages/shop/product'
//creation de contexte
export const ShopContext=createContext(null)
const getDefaultCart=() =>{
    let cart ={}
    for(let i=1;i<PRODUCTS.length +1;i++){
        cart[i]=0
    }
    return cart 
}

export const ShopContextProvider= (props) => {
    const [cartItems,setCartItems] =useState(getDefaultCart())
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo=PRODUCTS.find((product)=>product.id===Number(item))
                totalAmount +=cartItems[item]*itemInfo.price
                //console.log(item)
            }
        }
        return totalAmount;
    }
    const addToCart=(itemsId)=>{
       setCartItems((prev)=>({ ...prev,[itemsId]:prev[itemsId] + 1}));
    }
    const removeFromCart=(itemsId)=>{
        setCartItems((prev)=>({ ...prev,[itemsId]:prev[itemsId] - 1}));
     }
    const updateCartItemCount=(newAmount,itemsId)=>{
        setCartItems((prev)=>({...prev,[itemsId]:newAmount}))
    } 
    const contextValue={cartItems,addToCart,removeFromCart,updateCartItemCount,getTotalCartAmount}
   //     console.log(cartItems) , 3hmTY/4Svy3c!Jd
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}
