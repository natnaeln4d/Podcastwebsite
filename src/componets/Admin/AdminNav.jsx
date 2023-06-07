/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Footer from '../footer/Footer'
import Sidebar from './Sidebar';
import { AiOutlineRight} from "react-icons/ai";
import image1 from './../../assets/icons8-microphone-64.png'
import { Link as ScrollLink } from 'react-scroll'
import Audio from '../Audio/Audio';
import AudioBox from '../Audio/AudioBox';
import axios from 'axios'
import { Link as RouterLink } from 'react-router-dom';

export default function AdminNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {

      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
   
    localStorage.removeItem('token'); 
    setIsLoggedIn(false); 
    let i;

    const userID = JSON.parse(localStorage.getItem('user'));
            
          
    const uId=userID.user.id
  };
  return (
    <div>
    <nav className="bg-white border-gray-200 dark:bg-purple-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <ScrollLink to="section1" smooth={true} duration={500} className="flex items-center">
            <img src={image1} className="h-12  mr-3" alt="mic" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Deep Podcast</span>
          </ScrollLink>

          <div className="flex items-center">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="mr-6 text-sm text-gray-500 dark:text-white hover:underline">
                Logout
              </button>
            ) : (
              <RouterLink to={`/signup`} className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">
                Sign up
              </RouterLink>
            )}

            {!isLoggedIn && (
              <RouterLink to={`/login`} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
                Login
              </RouterLink>
            )}
          </div>
        </div>
      </nav>
      
    </div>
  )
}
