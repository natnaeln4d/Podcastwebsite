/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Footer from '../footer/Footer'
import Sidebar from './Sidebar';
import { AiOutlineRight} from "react-icons/ai";
import img2 from './../../assets/icons8-microphone-64.png'
import { Link as ScrollLink } from 'react-scroll'
import Audio from '../Audio/Audio';
import AudioBox from '../Audio/AudioBox';
import axios from 'axios'
import { Link as Link} from 'react-router-dom'

export default function Comments({ audioId}) {
 const [comments ,setComment]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const res = await http.get('/allcomments');
      const CommentData = res.data.data;
      setComment(CommentData)
     
    };

    fetchData();
  }, []);
  return (
    <div>
     <div className=' ' >
     <nav className="bg-white border-gray-200 dark:bg-purple-900">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
    <ScrollLink to="section1" smooth={true} duration={500} className="flex items-center">
            <img src={img2} className="h-12  mr-3" alt="mic" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Deep Podcast</span>
    </ScrollLink>
      
        <div className="flex items-center">
        <Link to={`/signup`} className="mr-6 text-sm  text-gray-500 dark:text-white hover:underline">Sign up</Link>
            
            <Link to={`/`} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</Link>

        </div>
    </div>
</nav>
<div className='h-[90px] w-full flex dark:bg-gray-700'>
           <div className='p-2 m-2 mb-2 flex-column'>
               <div className='flex w-[13rem]  bg-gray-600 '>
                   <h5 className='text-[0.9rem]'>Home</h5>
                   <h6 className='mt-1'><AiOutlineRight /></h6>
                   <h2 className='text-white font-semi-bold'>Dashboard</h2>
               </div>
               <div>
                   <h1 className='font-bold text-[1.9rem] text-white'>Dashboard</h1>
               </div>
           </div>
       </div>
   <div className="flex flex-col md:flex-row h-[90vh] mb-4">
 <Sidebar />
 
   <div className="bg-gray-100 p-6 h-[90vh] w-full overflow-y-auto flex-row">
   <div className="bg-gray-100 p-6 h-[90vh] w-full overflow-y-auto flex-row">

  <div>
      <h2 className="text-2xl font-bold mb-4">All Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p className="text-lg">{comment.text}</p>
          <p className="text-gray-500 text-sm mt-2">
            Posted on: {comment.created_at}
          </p>
          <p className="text-gray-500 text-sm">
            Podcast ID: {comment.podcast_id}
          </p>
        
          <p className="text-gray-500 text-sm">
            Viewer ID: {audioId}
          </p>
        </div>
      ))}
    </div>
        
        </div>
        </div>
        </div>
      
         

   <Footer /> 
      </div>
      
    </div>
  )
}

