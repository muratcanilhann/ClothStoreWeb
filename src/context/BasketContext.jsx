// BasketContext.js
import { useState, createContext, useContext, useEffect } from "react";

const BasketContext = createContext();
const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({ children }) => {
    const [items, setItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items));
    }, [items]);

    const addToBasket = (data, findBasketItem) => {
        if (!findBasketItem) {
            setItems((prevItems) => [{ ...data, quantity: 1 }, ...prevItems]);
        } else {
            const filtered = items.filter((item) => item.documentId !== findBasketItem.documentId);
            setItems(filtered);
        }
    };

    const removeFromBasket = (documentId) => {
        const updatedItems = items.filter((item) => item.documentId !== documentId);
        setItems(updatedItems);
    };

    const updateQuantity = (documentId, newQuantity) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.documentId === documentId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const values = { items, setItems, addToBasket, removeFromBasket, updateQuantity };

    return <BasketContext.Provider value={values}>{children}</BasketContext.Provider>;
};

const useBasket = () => useContext(BasketContext);

export { BasketProvider, useBasket };
