import LikeIcon from "../assets/LikeIcon";
import { useFavorite } from "../context/FavoritesContex";
import { useBasket } from "../context/BasketContext";
import { fetchProductWithStockDetail } from "../api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ProductDetailPage(){


  const { documentId } = useParams();
  const { addToBasket, items } = useBasket();
  const { addToFavories, favories } = useFavorite();

  const { data, isLoading, error } = useQuery({
    queryKey: ["productWithStock", documentId],
    queryFn: () => fetchProductWithStockDetail(documentId),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No products found</div>;
  }

  const findBasketItem = items.find((item) => item.documentId === documentId);
  const findFavoriteItem = favories.find((item) => item.documentId === documentId);


    return(
        <div>
              <div id="productDetail" className="w-full mt-5 flex justify-evenly font-beatriceDisplayTrial max-md:flex-col items-center">
      <div id="imageSide" className="flex gap-10 max-md:flex-col justify-center items-center">
        <img src={`${import.meta.env.VITE_BACKED_URL}${data.image[0].url}`} className="max-w-[367px] max-h-[438px]" alt="Product Image" />

        <div id="productDetailImages" className="w-16 flex justify-between max-md:w-52 mb-">
          {data.image.length > 1 && (
            <ul className="flex flex-col gap-4 max-md:flex-row">
              {data.image.map((item) => (
                <li key={item.url}>
                  <img src={`${import.meta.env.VITE_BACKED_URL}${item.url}`} alt="" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div
        id="productAllDetailsForBuy"
        className="relative max-w-[306px] max-h-[498px] border border-[#D9D9D9] flex flex-col justify-center px-[40px] py-[55px] gap-[40px] max-md:mt-10 py-0 px-0 w-full max-md:border-0 max-md:px-0 max-md:py-0"
      >
        <button
          onClick={() => addToFavories(data, findFavoriteItem)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <LikeIcon color={findFavoriteItem ? "black" : "gray"} /> {/* Dinamik renk */}
        </button>

        <div>
          <h2>{data.name}</h2>
          <p>{data.price}$</p>
          <p>{data.description[0].children[0].text}</p>
        </div>

        <div>
          <h3>Sizes</h3>
          <ul className="flex">
            {data.stockDetails.map((item) => (
              <li
                key={item.id}
                className="border-[#A3A3A3] w-[26.58px] inline-block flex justify-center items-center text-center h-[25.9px] text-sm border-solid border-[1px]"
              >
                {item.product_size.sizeName}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Colors</h3>
          <ul className="flex gap-4">
            <li style={{ width: "20px", height: "20px", border: "2px", borderColor: "black", borderStyle: "solid", backgroundColor: "black" }}></li>
            <li style={{ width: "20px", height: "20px", border: "2px", borderColor: "black", borderStyle: "solid", backgroundColor: "white" }}></li>
          </ul>
          
        </div>

        <button
          onClick={() => addToBasket(data, findBasketItem)}
          className="w-full bg-[#D9D9D9] h-[40px] p-4 flex justify-center items-center max-md:sticky bottom-0"
        >
          {findBasketItem ? "Remove from basket" : "ADD"}
        </button>
      </div>
    </div>


            
        </div>
    )
}