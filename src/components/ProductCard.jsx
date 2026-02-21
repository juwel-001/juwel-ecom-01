import React from "react";
import { IoCarOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { addToCart, cartItem } = useCart();
  //console.log(cartItem);

  return (
    <div
      className="border relative border-gray-100 rounded-2xl cursor-pointer 
      hover:scale-105 hover:shadow-2xl transition-all p-2 flex flex-col justify-between h-full w-full"
    >
      <img
        src={product.images}
        alt=""
        className="bg-gray-100 aspect-square"
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <h1 className="line-clamp-2 p-1 font-semibold">{product.title}</h1>
      <p className="my-1 text-lg text-gray-800 font-bold">${product.price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          console.log(product); // শুধু এই product
          addToCart(product);
        }}
        className="px-2 sm:px-3 md:px-5 py-1 text-sm sm:text-base md:text-lg bg-red-500 text-white rounded-md flex items-center justify-center gap-2 w-full"
      >
        <IoCarOutline className="w-5 h-5 sm:w-6 sm:h-6" /> Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
