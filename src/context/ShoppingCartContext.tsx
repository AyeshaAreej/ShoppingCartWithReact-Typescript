import { createContext, ReactNode, useContext, useState } from "react";

// Props for the provider
type ShoppingCartProviderProps={
    children :ReactNode
    }

// Type of CartItem needed to calculate total of items in cart
type CartItem={
    id:number
    quantity:number
}
 //Type for context
  type ShoppingCartContext = {
    // openCart: () => void
    // closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    // cartQuantity: number
    cartItems: CartItem[]
  } 
//Creating context 
const ShoppingCartContext = createContext({} as ShoppingCartContext)

// Custom Hook
export function useShoppingCart(){
    return useContext(ShoppingCartContext)

}
// Function to implementing provider function

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItems, setCartItems]=useState<CartItem[]>([])
  
    function getItemQuantity(id:number){
    return cartItems.find(item=>item.id===id)?.quantity ||
    0
   }

   function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  }
  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }
   
    return (
    <ShoppingCartContext.Provider value={{getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart, cartItems,}}>
        {children}
    </ShoppingCartContext.Provider>)

}