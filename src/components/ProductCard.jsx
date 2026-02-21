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
      hover:scale-105 hover:shadow-2xl transition-all p-2 flex flex-col justify-between h-full"
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
        className="bg-red-500 px-3 py-2 text-lg rounded-md w-full cursor-pointer 
        flex justify-center items-center text-white gap-2 font-semibold"
      >
        <IoCarOutline className="w-6 h-6" /> Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
