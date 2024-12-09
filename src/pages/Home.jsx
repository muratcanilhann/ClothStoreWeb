import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FirstColectionImage from "../components/FirstColectionImage";
import ProductCard from "../components/ProductCard";
import { fetchProductList } from "../api";
import ToggleButton from "../components/ToggleButton";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ExplanationCard from "../components/ExplanationCard";
import SearchInput from "../components/SearchInput";
import { NavLink } from "react-router-dom";
import photo2 from "./../assets/Kıyafet1.png";
import photo1 from "./../assets/Kıyafet2.png";

export default function Home() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleButtonClick = (gender) => {
    navigate("/collections", { state: { gender } });
  };

  const [collectionGender, setCollectionGender] = useState("ALL");
  const sliderRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],  
    queryFn: fetchProductList, // API'den veri çekme fonksiyonu
    staleTime: 1000 * 60 * 30,  // 30 dakika boyunca veri taze kabul edilir
    cacheTime: 1000 * 60 * 60,  // 1 saat boyunca veriler önbellekte tutulur
    refetchOnWindowFocus: false,  // Sayfa odaklandığında veri yenilemesin
    refetchInterval: false,        // Periyodik veri yenileme kapalı
  });

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center">Error: {error.message}</div>;
  }

  const filteredData =
    collectionGender === "ALL"
      ? data
      : data.filter((item) => item.gender.gender === collectionGender);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.previous();
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <div className="font-beatriceDisplayTrial bg-noisy-background px-16 max-md:px-4">
      <div>
        <ul>
          <li>
            <Button onClick={() => handleButtonClick("MAN")}>MAN</Button>
          </li>
          <li>
            <Button onClick={() => handleButtonClick("WOMEN")}>WOMEN</Button>
          </li>
          <li>
            <Button onClick={() => handleButtonClick("KIDS")}>KIDS</Button>
          </li>
        </ul>
        <SearchInput />
      </div>

      <div className="w-full mt-14 gap-20 flex">
        <div className="flex flex-col">
          <div>
            <h2 className="text-5xl font-bold">NEW COLLECTION</h2>
            <h3>
              Summer <br /> 2024
            </h3>
          </div>

          <div className="mt-auto flex justify-between max-md:mt-10">
            <NavLink
              to="/collections"
              className="flex justify-between items-center w-[300px] bg-gray-300 py-2 p-3 text-start"
            >
              Go to Shop
              <svg
                width="34"
                height="10"
                viewBox="0 0 34 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.999999 5H33M33 5L28.9579 1M33 5L28.9579 9"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NavLink>

            <span className="flex gap-2 lg:flex hidden">
              <ToggleButton onClick={scrollLeft}>&lt;</ToggleButton>
              <ToggleButton onClick={scrollRight}>&gt;</ToggleButton>
            </span>
          </div>
        </div>

        <Carousel
          ref={carouselRef}
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="flex justify-between items-end w-full lg:flex hidden"
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-50-px lg:flex hidden"
        >
          <FirstColectionImage img={photo2} alt="Kıyafet2" />
          <FirstColectionImage img={photo1} alt="Kıyafet2" />
          <FirstColectionImage img={photo2} alt="Kıyafet2" />
          <FirstColectionImage img={photo1} alt="Kıyafet2" />
        </Carousel>
      </div>

      <div id="categories" className="mt-10">
        <h2 className="font-beatriceDisplayTrial font-extrabold text-5xl">
          XIV <br /> COLLECTIONS <br /> 23-24
        </h2>
        <div className="flex mt-2 gap-[40px] font-beatriceDisplayTrial text-[#8A8A8A]">
          <Button onClick={() => setCollectionGender("ALL")}>ALL</Button>
          <Button onClick={() => setCollectionGender("MAN")}>MAN</Button>
          <Button onClick={() => setCollectionGender("WOMEN")}>WOMEN</Button>
          <Button onClick={() => setCollectionGender("KIDS")}>KIDS</Button>
        </div>
        <hr />
      </div>

      <div id="thirdShopping" className="w-full pt-[20px]">
        <div className="flex gap-4 overflow-x-auto" ref={sliderRef}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <ProductCard
                key={item.id}
                documentId={item.documentId}
                img={`${import.meta.env.VITE_BACKED_URL}${item.image[0].url}`}
                alt={item.name}
                category={item.category.name}
                productName={item.name}
                price={item.price}
              />
            ))
          ) : (
            <div className="text-center w-full">No products found</div>
          )}
        </div>
      </div>

      <ExplanationCard />

      <Footer />
    </div>
  );
}
