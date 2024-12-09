import { useState, createContext, useContext, useEffect } from "react";

const FavoriteContext = createContext();
const defaultFavorites = JSON.parse(localStorage.getItem("favories")) || [];

const FavoriteProvider = ({ children }) => {
    const [favories, setFavories] = useState(defaultFavorites);

    // localStorage'ı yalnızca favories değiştiğinde güncelle
    useEffect(() => {
        const uniqueFavories = Array.from(
            new Map(favories.map((item) => [item.documentId, item])).values()
        );
        localStorage.setItem("favories", JSON.stringify(uniqueFavories));
    }, [favories]);

    const addToFavories = (data) => {
        const findFavoriteItem = favories.find(
            (item) => item.documentId === data.documentId
        );
        if (!findFavoriteItem) {
            setFavories((prevFavories) => [data, ...prevFavories]);
        }
    };

    const removeFromFavorites = (documentId) => {
        setFavories((prevFavories) =>
            prevFavories.filter((item) => item.documentId !== documentId)
        );
    };

    const values = { favories, setFavories, addToFavories, removeFromFavorites };

    return <FavoriteContext.Provider value={values}>{children}</FavoriteContext.Provider>;
};

const useFavorite = () => useContext(FavoriteContext);

export { FavoriteProvider, useFavorite };
