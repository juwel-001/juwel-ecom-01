import React from "react";
import { useData } from "../Context/DataContext";

function FilterSection({
  search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  handleCategoryChange,
  brandHandlerChange,
  priceRange,
  setPriceRange
}) {
  const { categoryOnlyData, brandOnlyData } = useData();

  return (
    <div className="bg-gray-100 mt-10 p-4 rounded-md h-max hidden md:block ">
      <input
        type="text"
        placeholder="search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-2 border-gray-400"
      />
      {/* Category only data */}
      <h1 className="mt-5 font-semibold text-xl">Category</h1>
      <div className="flex flex-col gap-2 mt-3">
        {categoryOnlyData?.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <input
                type="checkbox"
                name={item}
                value={item}
                checked={category === item}
                onChange={handleCategoryChange}
              />
              <button className="cursor-pointer uppercase text-gray-900">
                {item}
              </button>
            </div>
          );
        })}
      </div>
      {/* Band Only Data */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Brand</h1>
      <select
        name=""
        id=""
        value={brand}
        onChange={brandHandlerChange}
        className="bg-white w-full p-2 border-gray-200 border-2 rounded-md"
      >
        {brandOnlyData?.map((item, index) => {
          return (
            <option value={item} key={index}>
              {String(item).trim().toUpperCase()}
            </option>
          );
        })}
      </select>

      {/* Price Range */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price range</h1>
      <div className="flex flex-col gap-2">
        <label>
          Price range: ${priceRange.min} - ${priceRange.max}
        </label>
        <input
          type="range"
          min={0}
          max={500}
          value={priceRange.max}
          onChange={(e) =>
            setPriceRange({ ...priceRange, max: Number(e.target.value) })
          }
        />
      </div>
      <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer"
      onClick={()=>{setSearch('') ; setCategory("All"); setBrand("All") ;setPriceRange({min:0 , max: 500})} }>
        Reset filter
      </button>
    </div>
  );
}

export default FilterSection;
