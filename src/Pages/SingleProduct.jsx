import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from "../assets/Loading4.webm";
import Bredcrums from '../components/Bredcrums';
import { IoCartOutline } from 'react-icons/io5';
import { useCart } from '../Context/CartContext';


function SingleProduct() {
  const {id} = useParams();
  const [singleProduct, setSingleProduct] = useState (null)
  const {addToCart} = useCart()
  
  console.log(id)

  

  useEffect(()=>{

        const getSingleProduct = async ()=>{
    
    try {
      
      const res = await axios.get(`https://dummyjson.com/products/${id}`)
      const product = res.data; 
      setSingleProduct(product)
      console.log(product)

    } catch (error) {
      console.log(error)
    }
  }

    getSingleProduct();
  }, [id])

  // const orginalPrice = singleProduct? Math.ceil(singleProduct.price +(singleProduct.price * singleProduct.discountPercentage) / 100) : 0;

 const originalPrice = singleProduct? Math.ceil(singleProduct.price /(1 - singleProduct.discountPercentage / 100)): 0;





  return (
    <>

    {
      singleProduct ? (
        <div className='px-4 pb-4 md:px-0'>
  <Bredcrums title={singleProduct.title} />
  <div className='max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10'>

    {/* Product image */}
    <div className='w-full flex justify-center'>
      <img 
        src={singleProduct.images} 
        alt={singleProduct.title} 
        className='rounded-2xl w-full md:max-w-md object-cover' 
      />
    </div>

    {/* Product details */}
    <div className='flex flex-col gap-6'>
      <h1 className='md:text-3xl text-2xl font-bold text-gray-800'>{singleProduct.title}</h1>
      <div className='text-gray-700 flex flex-col gap-4'>
        <span className='uppercase font-semibold text-sm md:text-base'>{singleProduct.brand}/{singleProduct.category}</span>
        <p className='text-xl md:text-2xl text-red-500 font-bold'>
          ${singleProduct.price} 
          <span className='line-through text-gray-700 mx-2 text-base md:text-lg'>{originalPrice}</span>
          <span className='bg-red-500 px-3 py-1 text-white rounded-full text-sm md:text-base ml-2'>{singleProduct.discountPercentage}% discount</span>
        </p>
        <p className='text-gray-600 text-sm md:text-base'>{singleProduct.description}</p>

        {/* Add to Cart button */}
        <div className='flex gap-4 mt-4'>
          <button 
            onClick={()=>addToCart(singleProduct)} 
            className='px-4 sm:px-6 flex gap-2 py-2 text-base md:text-lg bg-red-500 text-white rounded-md items-center justify-center w-full sm:w-auto'
          >
            <IoCartOutline className='w-5 h-5 md:w-6 md:h-6'/> Add to Cart
          </button>
        </div>
      </div>
    </div>

  </div>
</div>
      ) 
      : 
      (
         <div className="flex items-center justify-center h-screen">
                    <video muted autoPlay loop>
                      <source src={Loading} type="video/webm" />
                    </video>
                  </div>
      )

    }
    </>
  )
}

export default SingleProduct