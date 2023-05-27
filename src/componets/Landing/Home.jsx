/* eslint-disable no-unused-vars */
import React from 'react'
import '../../App.css'

export default function Home() {
  return (
    <div className='h-[85vh] home'>
    <div className='p-10 flex mt-[9rem]'>
    <div className='align text-start px-[7rem] justify-center items-start mt-[2rem]'>
      <h1 className='flex-column text-white text-3xl font-bold font-mono'> <h1 className='mb-[0.3rem] text-[1.9rem]'>We Deliver To You Fresh</h1>
      <h1 className='text-purple-600 text-[1.5rem]'>Podcast Everyday</h1> 
      <button type="button" className="text-white mt-4 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Explore</button></h1>
    </div>
    <div className='align text-start justify-center items-start mt-[2rem]'>
      {/* <h1 className='text-white text-3xl font-bold font-mono'>we deliver to you fresh podcast everyday</h1> */}
    </div>
    </div>
  
      
    </div>
  )
}
