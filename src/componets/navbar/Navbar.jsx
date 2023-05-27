/* eslint-disable no-unused-vars */
import React from 'react'
import image1 from './../../assets/icons8-microphone-64.png'
import { Link as ScrollLink } from 'react-scroll'
import { Link as Link} from 'react-router-dom'

export default function Navbar() {
  return (
    <div className='w-full'>
     
<nav className="bg-white border-gray-200 dark:bg-purple-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
    <ScrollLink to="section1" smooth={true} duration={500} className="flex items-center">
            <img src={image1} className="h-12  mr-3" alt="mic" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Deep Podcast</span>
    </ScrollLink>
      
        <div className="flex items-center">
        <Link to={`/signup`} className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">Sign up</Link>
            
            <Link to={`/`} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>

        </div>
    </div>
</nav>
<nav className="bg-gray-50 dark:bg-gray-700">
    <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 mr-6 space-x-8 text-sm">
                <li>
                <ScrollLink to="section1" smooth={true} duration={500} className="text-gray-900 dark:text-white hover:underline" >Home</ScrollLink>
                </li>
                <li>
                <ScrollLink to="section2" smooth={true} duration={500} className="text-gray-900 dark:text-white hover:underline" >Audios</ScrollLink>
                </li>
                <li>
                <ScrollLink to="section3" smooth={true} duration={500} className="text-gray-900 dark:text-white hover:underline" >Videos</ScrollLink>
                </li>
                <li>
                <ScrollLink to="section4" smooth={true} duration={500} className="text-gray-900 dark:text-white hover:underline" >Contact Us</ScrollLink>          
                </li>
               
            </ul>
        </div>
    </div>
</nav>

      
    </div>
  )
}
