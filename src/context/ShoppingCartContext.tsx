import { createContext, ReactNode, useContext } from "react";

// Props for the provider
type ShoppingCartProviderProps={
    children :ReactNode
    }
 //Type for context
//  type ShoppingCartContext = {
    // openCart: () => void
    // closeCart: () => void
    // getItemQuantity: (id: number) => number
    // increaseCartQuantity: (id: number) => void
    // decreaseCartQuantity: (id: number) => void
    // removeFromCart: (id: number) => void
    // cartQuantity: number
    // cartItems: CartItem[]
//   } 
//Creating context 
const ShoppingCartContext = createContext({} )

// Custom Hook
export function useShoppingCart(){
    return useContext(ShoppingCartContext)

}
// Function to implementing provider function

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    return (
    <ShoppingCartContext.Provider value={{}}>
        {children}
    </ShoppingCartContext.Provider>)

}