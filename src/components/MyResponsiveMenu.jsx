import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function MyResponsiveMenu({openNav, setOpenNav}) {
          const {user} = useUser()
  return (
    <div className={`fixed top-0 bottom-0 z-20 flex h-screen w-[55%] flex-col 
      justify-between bg-red-800 px-6 pb-6 pt-16 text-white 
      md:hidden rounded-r-xl shadow-md transition-all
      ${openNav ? "left-0" : "-left-full"}`}>
      <div>
        {/* <div className='flex items-center justify-start gap-3'>
              {
                user ? <UserButton size={50} /> : <FaUserCircle size={50} />
              }
              <div>
                <h1>Hello ,{user?.firstName}</h1>
              </div>

        </div> */}
        <nav className='mt-12'>
          <ul className='flex flex-col gap-7 text-2xl font-semibold'>

              <Link to={"/"} className='cursor-pointer' onClick={()=>setOpenNav(false)}><li>Home</li></Link>
              <Link to={"/products"} className='cursor-pointer' onClick={()=>setOpenNav(false)}><li>Products</li></Link>
              <Link to={"/about"} className='cursor-pointer' onClick={()=>setOpenNav(false)}> <li>About</li></Link>
              <Link to={"/contact"} className='cursor-pointer' onClick={()=>setOpenNav(false)}><li>Contact</li></Link>

          </ul>
        </nav>
        </div> 
      </div>
  )
}

export default MyResponsiveMenu