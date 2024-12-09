import { useState } from "react";
import NavIcon from "../assets/nav-icon.jsx";
import LikeIcon from "../assets/LikeIcon.jsx";
import UserLogo from "../assets/UserLogo.jsx";
import BasketIcon from "../assets/BasketIcon.jsx";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useBasket } from "../context/BasketContext.jsx";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { items } = useBasket();

  const handleNavigation = (path, state) => {
    setIsDrawerOpen(false); 
    navigate(path, { state });
  };

  const handleCartClick = () => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      handleNavigation("/payment");
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen); 
  };

  return (
    <header className="font-beatriceDisplayTrial w-full bg-noisy-background py-8 text-base text-gray-900 px-16 max-md:px-4 relative">
      <ul className="flex justify-between items-center">
        <li>
          <ul className="flex gap-5">
            <li>
              <button onClick={toggleDrawer}>
                <NavIcon />
              </button>
            </li>
            <li className="max-md:hidden">
              <Button variant="onlyText" label="Home" onClick={() => handleNavigation("/")} />
            </li>
            <li className="max-md:hidden">
              <Button variant="onlyText" label="Collections" onClick={() => handleNavigation("/collections")} />
            </li>
          </ul>
        </li>

        <li>
          <ul className="flex gap-1">
            <li>Logo</li>
          </ul>
        </li>

        <li>
          <ul className="flex items-center gap-3">
         
            <li className="max-md:hidden">
              <Button
                variant="bgBlackIconSmall"
                onClick={() => handleNavigation("/shoppingbasket", { tab: "FAVORITES" })}
              >
                <LikeIcon />
              </Button>
            </li>

           
            {loggedIn && items.length > 0 && (
              <li className="max-md:hidden">
                <Button
                  variant="bgBlackTextWhite"
                  onClick={handleCartClick}
                >
                  Cart
                </Button>
              </li>
            )}

         
            <li>
              <Button
                variant="bgBlackIconSmall"
                onClick={() => handleNavigation("/shoppingbasket", { tab: "SHOPPING BAG" })}
              >
                <BasketIcon />
              </Button>
            </li>

            <li>
              <Button
                variant="bgBlackIconSmall"
                className="max-md:w-[30px] max-md:h-[30px]"
                onClick={() => {
                  if (!loggedIn) {
                    navigate("/login");
                  } else {
                    handleNavigation("/user");
                  }
                }}
              >
                <UserLogo />
              </Button>
            </li>
          </ul>
        </li>
      </ul>

   
      <div
        className={`fixed top-0 left-0 z-50 w-[250px] h-full bg-white transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}
        onClick={() => setIsDrawerOpen(false)} 
      >
        <div
          className="w-full h-full"
          onClick={(e) => e.stopPropagation()} 
        >
          <ul className="flex flex-col items-center py-8">
            <li>
              <Button variant="onlyText" label="Home" onClick={() => handleNavigation("/")} />
            </li>
            <li>
              <Button variant="onlyText" label="Collections" onClick={() => handleNavigation("/collections")} />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
