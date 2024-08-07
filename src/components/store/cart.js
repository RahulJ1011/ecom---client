
import {create} from 'zustand'

const useCartStore = create((set,get)=> ({
    cart:[],
    addToCart: (newItem) =>
        set((state) => ({
          cart: [...state.cart, newItem], 
        })),
        removeFromCart: (itemToRemove) =>
            set((state) => ({
              cart: state.cart.filter((item) => item.id !== itemToRemove.id),
            })),
}))

export default useCartStore