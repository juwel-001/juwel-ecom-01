import React, { useEffect, useState } from "react";
import { useData } from "../Context/DataContext";
import Loading from "../assets/Loading4.webm";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import MobileFilter from "../components/MobileFilter";

function Products() {
  const { data, fetchAllProducts } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500 });
  const [page, setPage] = useState(1);
  const [openFilter, setOpenFilter] = useState(false);

  // Category handler
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    setOpenFilter(false)

  };

  // Brand handler
  const brandHandlerChange = (e) => {
    setBrand(e.target.value);
    setPage(1);
     setOpenFilter(false)
  };

  // Pagination handler
  const pageHandler = (selectPage) => {
    setPage(selectPage);
    window.scrollTo(0, 0)
  };

  const filterData = data?.filter((item) => {
    return (
      item.title.toLowerCase().includes(search?.toLowerCase() || "") &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= priceRange.min &&
      item.price <= priceRange.max
    );
  });

  const dynamicPage = Math.ceil(filterData?.length / 12);

  useEffect(() => {
    fetchAllProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <MobileFilter
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          handleCategoryChange={handleCategoryChange}
          brandHandlerChange={brandHandlerChange}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex gap-8">
              <FilterSection
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                brand={brand}
                setBrand={setBrand}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleCategoryChange={handleCategoryChange}
                brandHandlerChange={brandHandlerChange}
              />
              {filterData?.length > 0 ? (
                <div className="md:min-h-screen px-3 ">
                  <div className="grid md:grid-cols-4 grid-cols-2 md:gap-5 gap-2  mt-10 overflow-x-hidden ">
                    {filterData
                      .slice((page - 1) * 12, page * 12)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Pagination
                      page={page}
                      pageHandler={pageHandler}
                      dynamicPage={dynamicPage}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-10 md:h-[600px] md:w-[900px]">
                  <Lottie animationData={notfound} className="md:w-[600px] w-[300px]" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[400px]">
            <video muted autoPlay loop>
              <source src={Loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
