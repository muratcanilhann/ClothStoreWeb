import { useBasket } from "../context/BasketContext";
import { useFavorite } from "../context/FavoritesContex";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ShoppingProductCard from "../components/ShoppingProductCard";
import Button from "../components/Button";
import LikeIcon from "../assets/LikeIcon.jsx";

export default function ShopBgAndBasket() {
  const { favories } = useFavorite();
  const { items } = useBasket();
  const [subTotal, setSubTotal] = useState(0);
  const [activeTab, setActiveTab] = useState("SHOPPING BAG");
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  useEffect(() => {
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubTotal(totalAmount);
    setShipping(items.length > 0 ? 10 : 0);
  }, [items]);

  useEffect(() => {
    setTotal(subTotal + shipping);
  }, [subTotal, shipping]);

  const handleContinue = () => navigate("/payment");

  return (
    <div className="flex w-full bg-noisy-background justify-between p-10 min-h-screen max-xl:flex-col max-xl:items-center max-xl:gap-10">
      {/* Main Content Area */}
      <div className="flex-col justify-between font-beatriceDisplayTrial mx-10 grow">
        <ul className="flex gap-4 border-b-2 w-full h-[30px] justify-stretch gap-24">
          <li>
            <Button variant={activeTab === "SHOPPING BAG" ? "activeTab" : "tabDefault"} onClick={() => setActiveTab("SHOPPING BAG")}>
              SHOPPING BAG
            </Button>
          </li>
          <li>
            <Button variant={activeTab === "FAVORITES" ? "activeTab" : "tabDefault"} onClick={() => setActiveTab("FAVORITES")}>
              <LikeIcon color={activeTab === "FAVORITES" ? "black" : "gray"} />
              FAVORITES
            </Button>
          </li>
        </ul>

        <div className="flex flex-wrap gap-20 justify-stretch">
          {activeTab === "SHOPPING BAG" && (
            items.length > 0 ? (
              items.map((item) => (
                <ShoppingProductCard
                  key={item.documentId}
                  documentId={item.documentId}
                  img={`${import.meta.env.VITE_BACKED_URL}${item.image[0].url}`}
                  alt={item.name}
                  category={item.category.name}
                  productName={item.name}
                  price={item.price}
                  activeTab={activeTab}
                />
              ))
            ) : (
              <div>Sepetinizde ürün bulunmamaktadır</div>
            )
          )}

          {activeTab === "FAVORITES" && (
            favories.length > 0 ? (
              favories.map((item) => (
                <ShoppingProductCard
                  key={item.documentId}
                  documentId={item.documentId}
                  img={`${import.meta.env.VITE_BACKED_URL}${item.image[0].url}`}
                  alt={item.name}
                  category={item.category.name}
                  productName={item.name}
                  price={item.price}
                  activeTab={activeTab}
                />
              ))
            ) : (
              <div>Favorilerinizde ürün bulunmamaktadır</div>
            )
          )}
        </div>
      </div>

      {/* Order Summary Area */}
      {activeTab === "SHOPPING BAG" && (
        <div className="w-[306px] h-[347px] border border-black border-solid flex flex-col items py-12 px-10 gap-5">
          <h2>ORDER SUMMARY</h2>
          <div className="flex justify-between">
            <h3>Subtotal</h3>
            <p>${subTotal}</p>
          </div>
          <div className="flex justify-between">
            <h3>Shipping</h3>
            <p>${shipping}</p>
          </div>
          <hr />
          <div className="flex justify-between">
            <h3>TOTAL</h3>
            <p>${total}</p>
          </div>
          <form action="">
            <input type="checkbox" />
            <span className="ml-2 font-thin">I agree blabla</span>
            <br />
            <button
              type="button"
              className="bg-[#D9D9D9] w-[229px] p-2 mt-2"
              onClick={handleContinue}
            >
              CONTINUE
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
