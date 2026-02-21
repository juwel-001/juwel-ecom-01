import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../Context/CartContext";

function ProductListView({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <div className="space-y-4  rounded-md">
      <div className="bg-gray-100 flex gap-7 items-center p-2 rounded-md">
        <img
          src={product.images}
          alt={product.title}
          className="md:h-60 md:w-60 h-30 w-30 cursor-pointer rounded-md bg-gray-50"
          onClick={() => navigate(`/products/${product.id}`)}
        />
        <div className="space-y-2">
          <h1 className="font-bold md:text-xl text-lg line-clamp-3 hover:text-red-400 md:w-full w-[250px]">
            {product.title}
          </h1>
          <p className="font-semibold flex items-center md:text-lg text-sm">
            $<span className="md:text-4xl text-3xl">{product.price}</span>{" "}
            <span className="text-red-400">
              ({product.discountPercentage}% off)
            </span>
          </p>
          <p className="text-sm md:line-clamp-2 line-clamp-3">{product.description}</p>
          <div className="flex-gap-4 mt-4">
            <button
              className="px-5 flex gap-2 py-1 text-lg bg-red-500 text-white rounded-md"
              onClick={() => addToCart(product)}
            >
              <IoCartOutline className="w-6 h-6" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductListView;
