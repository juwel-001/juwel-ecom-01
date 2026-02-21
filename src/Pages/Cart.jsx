import React from "react";
import { useCart } from "../Context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebook, LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png"

function Cart({ location, getLocation }) {
  const { cartItem, updateQuantity, deletItem} = useCart();
  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  const grandTotal = (Number(totalPrice) + 5).toFixed(2);
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate()

  return (
    <div className="mt-10 mb-4 md:px-0 px-4  max-w-6xl mx-auto ">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">Cart item ({cartItem.length})</h1>
          <div>
            <div className="mt-10">
              {cartItem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-300 p-5 flex items-center justify-between rounded-md mt-3 w-full"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.images}
                        alt={item.title}
                        className="h-20 w-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px]  line-clamp-3">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg">
                          ${item.price}
                        </p>
                        <p className="font-light text-gray-700 mt-2">
                          {item.availabilityStatus}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, "decrease")
                        }
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, "increase")
                        }
                        className="cursor-pointer"
                      > 
                        +
                      </button>
                    </div>

                    <span onClick={()=>deletItem(item.id)} className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl">
                      <FaRegTrashAlt className="text-red-500 text-2xl cursor-pointer" />
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Customer info & Order page */}
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20">
              <div className="bg-gray-300 mt-4 py-7 px-3 rounded-md space-y-2 ">
                <h1 className="text-gray-800 font-bold text-xl">
                  Delivery Info
                </h1>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="p-2 rounded-md"
                    value={user.fullName}
                  />
                </div>
                <div className="flex flex-col space-y-1">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter your adress"
                    className="p-2 rounded-md"
                    value={location?.county}
                  />
                </div>

                <div className="flex w-full gap-5 ">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">State</label>
                    <input
                      type="text"
                      placeholder="Enter your state"
                      className="p-2 rounded-md w-full"
                      value={location.state}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Zip code</label>
                    <input
                      type="text"
                      placeholder="Enter your zipcode"
                      className="p-2 rounded-md w-full"
                      value={location.postcode}
                    />
                  </div>
                </div>
                <div className="flex w-full gap-5 ">
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Country</label>
                    <input
                      type="text"
                      placeholder="Enter your country"
                      className="p-2 rounded-md w-full"
                      value={location.country}
                    />
                  </div>
                  <div className="flex flex-col space-y-1 w-full">
                    <label htmlFor="">Phone No</label>
                    <input
                      type="text"
                      placeholder="Enter your number"
                      className="p-2 rounded-md w-full"
                    />
                  </div>
                </div>
                <button className="bg-red-500 px-3 py-1 text-white rounded-md cursor-pointer mt-3">
                  Submit
                </button>

                <div className="flex items-center justify-center w-full text-gray-700">
                  ---------------- OR -------------------
                </div>
                <div className="flex justify-center ">
                  <button
                    onClick={getLocation}
                    className="bg-red-500 px-3 py-1 text-white rounded-md cursor-pointer mt-3"
                  >
                    Detect Location
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-300 shadow-xl py-7 mt-4 rounded-md space-y-2 h-max px-10">
                <h1 className="text-gray-800 font-bold text-xl">
                  Bill Details
                </h1>
                <div className="flex justify-between items-center">
                  <h1 className="gap-1 flex items-center text-gray-700">
                    <span>
                      <LuNotebookText />
                    </span>
                    Items total
                  </h1>
                  <p>${totalPrice}</p>
                </div>
                <div className="flex justify-between items-center ">
                  <h1 className="gap-1 flex items-center text-gray-700">
                    <span>
                      <MdDeliveryDining />
                    </span>
                    Delivery charge
                  </h1>
                  <p className="text-red-500 font-semibold">
                    <span className="text-gray-600 line-through">$25 </span>{" "}
                    FREE
                  </p>
                </div>
                <div className="flex justify-between items-center ">
                  <h1 className="gap-1 flex items-center text-gray-700">
                    <span>
                      <GiShoppingBag />
                    </span>
                    Handling charge
                  </h1>
                  <p className="text-red-500 font-semibold">$5</p>
                </div>
                <hr className="text-gray-200 mt-2" />
                <div className="flex justify-between items-center ">
                  <h1 className="font-semibold text-lg">Grand total</h1>
                  <p className="text-lg font-semibold">${grandTotal}</p>
                </div>
                <div>
                  <h1 className="font-semibold text-gray-700 mt-7 mb-3">
                    Apply promo code
                  </h1>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="p-2 rounded-md w-full"
                    />
                    <button className="bg-white text-black border border-gray-400 rounded-md px-4 py-1 cursor-pointer">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 w-full cursor-pointer">
                  Procced to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[450px]">
          <h1 className="text-red-500/80 font-bold text-3xl text-muted">Oh no! Your cart is empty.</h1>
          <img src={emptyCart} alt="" className="w-[300px]" />
          <button className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition duration-300" onClick={()=>navigate('/products')}>Continue Shopping</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
