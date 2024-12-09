import { useState } from "react";
import SearchInput from "../components/SearchInput";
import ProductList from "../components/ProductList";

export default function Collections() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col min-h-screen w-full gap-16 px-10 font-beatriceDisplayTrial bg-noisy-background">
      <div className="max-w-[265px] max-md:hidden">
      </div>

      <div className="flex flex-col flex-1">
        <h2 className="text-2xl font-bold mb-4">PRODUCTS</h2>

        <div id="searchAndCategoryBar" className="flex h-[50px] max-md:flex-col gap-4">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <ProductList searchTerm={searchTerm} />
      </div>
    </div>
  );
}
