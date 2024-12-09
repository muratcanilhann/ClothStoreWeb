import { Link } from "react-router-dom";
import { useBasket } from "../context/BasketContext";
import { useFavorite } from "../context/FavoritesContex";
import { useState, useEffect } from "react";

export default function ShoppingProductCard({
  documentId,
  img,
  alt,
  category,
  productName,
  price,
  activeTab,
}) {
  const { removeFromBasket, updateQuantity, items } = useBasket();
  const { removeFromFavorites } = useFavorite();

  const basketItem = items.find((item) => item.documentId === documentId);
  const initialQuantity = basketItem ? basketItem.quantity : 1;

  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (basketItem?.quantity !== quantity) {
      updateQuantity(documentId, quantity);
    }
  }, [quantity, documentId, updateQuantity, basketItem]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleRemoveFromFavorites = () => {
    removeFromFavorites(documentId);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(documentId);
   
  };

  return (
    <div className="max-w-[366px] max-h-[424px] flex flex-row-reverse">
      <div className="ml-2 w-[40px] flex flex-col items-center">
        {activeTab === "SHOPPING BAG" ? (
          <button className="text-gray-400" onClick={handleRemoveFromBasket}>
            X
          </button>
        ) : (
          <button className="text-gray-400" onClick={handleRemoveFromFavorites}>
            X
          </button>
        )}

        {activeTab === "SHOPPING BAG" && (
          <div className="border w-8 border-black flex flex-col mt-5">
            <button onClick={handleIncrease} className="border-b border-black text-xl">
              +
            </button>
            <p className="text-center">{quantity}</p>
            <button onClick={handleDecrease} className="border-t border-black text-xl">
              -
            </button>
          </div>
        )}
      </div>

      <Link to={`/products/${documentId}`}>
        <img src={img} alt={alt} />
        <h3 className="opacity-[66%] uppercase">{category}</h3>
        <div className="flex justify-between">
          <h4 className="uppercase">{productName}</h4>
          <p className="uppercase">{price}$</p>
        </div>
      </Link>
    </div>
  );
}
