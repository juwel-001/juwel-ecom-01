import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCafeOutline, IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import MyResponsiveMenu from "./MyResponsiveMenu";

function Navbar({location , getLocation, openDropdown, setOpenDropdown}) {

    const {cartItem} = useCart();
    const [openNav, setOpenNav] = useState(false);
    


  const toggleDropdown =()=>{
    setOpenDropdown(!openDropdown)
  }
  
  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className=" flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className="font-bold text-3xl">
              <span className="text-red-600 font-serif">J</span>uweleCom
            </h1>
          </Link>

          <div className="md:flex gap-1 items-center cursor-pointer hidden">
            <MapPin className="text-red-500" />
            <span className="font-semibold text-gray-700">
              {location ? 
              <div className="-space-y-1">
                <p>{location.county}</p>
                <p>{location.postcode}</p>
              </div> : "Add Address"}
            </span>
            <FaCaretDown onClick={toggleDropdown} />
          </div>
          {
            openDropdown ? 
            <div className="w-[250px] h-max bg-white shadow-2xl z-50 fixed top-16 left-60 p-5 border-2 border-gray-200 rounded-md">

              <h1 className=" flex justify-between font-semibold text-xl mb-4">Change location <span onClick={toggleDropdown}><CgClose/></span></h1>
              <button onClick={getLocation} className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400">Detect my location</button>
            </div>:null
          }
        </div>

        {/* Menu Section */}
        <nav className="flex gap-7 items-center ">
          <ul className=" md:flex gap-7 text-xl font-semibold items-center hidden">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Products</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 border-red-500 transition-all"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full text-white -top-3 -right-3 absolute">
              {cartItem.length}
            </span>
          </Link>

           <div className={`md:hidden ${openNav ? "block" : "hidden"} bg-white`}>
          <SignedOut>
            <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        {

          openNav ? <HiMenuAlt3 onClick={()=>setOpenNav(false)} className="h-7 w-7 md:hidden"/> : <HiMenuAlt1 onClick={()=>setOpenNav(true)} className="h-7 w-7 md:hidden" />
        }
        </nav>
       
      </div>
      <MyResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
}

export default Navbar;
