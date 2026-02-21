import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import AllFeatures from '../components/AllFeatures'

function Home() {
  return (
    <div className='overflow-x-hidden'>
    <Carousel/>
    <MidBanner />
    <AllFeatures />
    </div>
  )
}

export default Home