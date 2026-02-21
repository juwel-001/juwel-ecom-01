import { FaFilter } from "react-icons/fa6";
import { useData } from "../Context/DataContext";

function MobileFilter({openFilter, setOpenFilter, search,
  setSearch,
  category,
  setCategory,
  brand,
  setBrand,
  handleCategoryChange,
  brandHandlerChange,
  priceRange,
  setPriceRange}) {
     const { categoryOnlyData, brandOnlyData } = useData();

     const togleFilter = ()=>{

      setOpenFilter(!openFilter);

     }
     
  return (
    <>
    <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
      <h1 className="font-semibold text-xl">Filter</h1>
      <FaFilter onClick={togleFilter} className="text-gray-800"/>
    </div>
    {
      openFilter ? <div className="bg-gray-100 p-2 md:hidden ">
        <input
        type="text"
        placeholder="search.."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 rounded-md border-2 border-gray-400 w-full "
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
      <h1 className="mt-5 font-semibold text-xl mb-3 ">Brand</h1>
      <select
        name=""
        id=""
        value={brand}
        onChange={brandHandlerChange}
        className="bg-white md:w-full p-2 border-gray-200 border-2 rounded-md w-[250px]"
      >
        {brandOnlyData ?.map((item, index) => {
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
          onChange={(e) =>setPriceRange({ ...priceRange, max: Number(e.target.value) } )}
          className="transition-all w-[200px]"
        />
      </div>
      <button className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer "
      onClick={()=>{setSearch('') ; setCategory("All"); setBrand("All") ;setPriceRange({min:0 , max: 500}); setOpenFilter(false);} }  >
        Reset filter
      </button>

      </div>:null
    }
    </>
  );
}

export default MobileFilter;
