import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Navbar from "./components/Navbar";
import axios from "axios";
import Footer from "./components/Footer";
import SingleProduct from "./Pages/SingleProduct";
import CategoryProduct from "./Pages/CategoryProduct";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

            const [location, setLocation]= useState()
            const [openDropdown, setOpenDropdown] = useState(false)
            


            const getLocation = async()=>{
            navigator.geolocation.getCurrentPosition(
            async pos=>{
            const{latitude, longitude} = pos.coords

            // console.log(latitude, longitude)

            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

            try {
              const location = await axios.get(url)
              const exactLocation = location.data.address
              setOpenDropdown(false)
              setLocation(exactLocation)
              //console.log(exactLocation);
              
              
            } catch (error) {
              console.log(error)
            }

            },
            (err)=>{
            console.log("Error",err)
            }

            )
            }

            useEffect(()=>{
            getLocation()
            },[])

            

            
  return (
    
      <BrowserRouter>
      <Navbar  location={location} getLocation ={getLocation} openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:id" element={<SingleProduct/>}></Route>
        <Route path="/category/:category" element={<CategoryProduct/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cart" element={<ProtectedRoute><Cart location={location} getLocation={getLocation} /></ProtectedRoute>}></Route>
      </Routes>
        <Footer/>
    </BrowserRouter>
    
  );
}

export default App;
