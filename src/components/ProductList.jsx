import { useEffect, useState } from 'react';
import ProductCard from "./ProductCard";
import { fetchProductList } from "../../src/api.js";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

export default function ProductList({ searchTerm }) {
  const location = useLocation();
  const gender = location.state?.gender || '';
  const [products, setProducts] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProductList,  
    staleTime: 1000 * 60 * 30,  
    cacheTime: 1000 * 60 * 60,  
    refetchOnWindowFocus: false, 
  });

  useEffect(() => {
    if (data) {
      let filteredProducts = gender ? data.filter((item) => item.gender.gender === gender) : data;

      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      const sortedProducts = filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setProducts(sortedProducts);  
    }
  }, [data, gender, searchTerm]);  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div id="productsCollectionList" className="w-full flex gap-5 flex-wrap mt-10">
      {products.map((item) => (
        <ProductCard
          key={item.id}
          documentId={item.documentId}
          img={`${import.meta.env.VITE_BACKED_URL}${item.image[0].url}`}
          alt={item.name}
          category={item.category.name}
          productName={item.name}
          price={item.price}
        />
      ))}
    </div>
  );
}
