import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
    carts: [],
    totalPrice: () => {},
    addToCart: () => {},
    removeCart: () => {},
});

const CartProvider = ({ children }) => {
    const [carts, setCarts] = useState(() => {
        const cartData = JSON.parse(localStorage.getItem("cart"));
        if(cartData)
        {
            return cartData;
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(carts));
    }, [carts]);

    const addToCart = (prod) => {
        setCarts((prev) => {
            
            return prod;
        });
    };

    const removeCart = (prod) => {
        setCarts((prev) => {
            const updatedCart = prev.filter((previous) => previous._id !== prod._id);
            return updatedCart;
        });
    };

    const totalPrice = () => {
        let price = 0;
        if (carts.length > 0) {
            carts.forEach((prod) => {
                price += prod.Price;
            });
        }
        return price;
    };
    const [history_data,SetHistory_data] = useState(()=> {
        const historyData = JSON.parse(localStorage.getItem("history"))
        if(historyData)
            return historyData
        return []
    })  
    useEffect(() => {
        localStorage.setItem("history", JSON.stringify(history_data));
    }, [history_data]);
    const addToHistory = (prod)=>
    {
        SetHistory_data(()=> {
            return prod
        })
    }

    return (
        <CartContext.Provider
            value={{
                carts,
                setCarts,
                totalPrice,
                addToCart,
                removeCart,
                addToHistory,
                history_data,
                SetHistory_data,
                

            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
