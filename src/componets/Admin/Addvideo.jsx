/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React from 'react'
import Footer from '../footer/Footer'
import Sidebar from './Sidebar';
import { AiOutlineRight} from "react-icons/ai";
import img2 from './../../assets/icons8-microphone-64.png'
import { Link as ScrollLink } from 'react-scroll'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { Link as Link} from 'react-router-dom'

import axios from 'axios'
import Alert from './Alert';
import AdminNav from './AdminNav';
export default function Addvideo() {


  const navigate = useNavigate();
   
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [audio, setAudio] = useState(null);
    const [video, setVideo] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const sendVideo = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const res = await http.post('/addvideopodcast', data);
      const user = res.data;
    
      console.log(user.status);
      setSuccessMessage('Added successfully.');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (error) {
      console.log(error);
      setSuccessMessage('');
      setErrorMessage('Failed to add.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userID = JSON.parse(localStorage.getItem('user'));
      console.log("user: ", userID)
      
      
          const formData = new FormData();
          formData.append('user_id', userID.user.id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('audio', audio);
      formData.append('video', video);
      formData.append('photo', photo);
      await sendVideo(formData);
      setAudio('');
      setVideo('');
      setDescription('');
      setTitle('');
      // setSuccessMessage('Added successfully.');
      // setErrorMessage('');
      // setTimeout(() => {
      //   setSuccessMessage('');
      // }, 4000);
    } catch (error) {
      console.log(error);
      setSuccessMessage('');
      setErrorMessage('Failed to add.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  };
  
  return (
    <div>
     <div className=' ' >
  <AdminNav />
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
   <div className="w-90  bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-2xl font-bold mb-4">Add Podcast Video</h2>
    
    <div className='mb-2'>
    
      {successMessage && (
        
        <Alert type="success" message={successMessage} />
      )}

     
      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
    <form onSubmit={handleSubmit} className='p-5'>
    <div className="mb-4 w-full ">
        <label className="block text-gray-700 font-bold mb-2" for="first-name">
         Title
        </label>
        <input
          className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="first-name"
          type="text"
          placeholder="Enter Title of Podcast"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    <div className="mb-4 w-full">
        <label className="block text-gray-700 font-bold mb-2" for="last-name">
        Description
        </label>
     
          <textarea class="
            form-control
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-purple-600 focus:outline-none
          " value={description}
          onChange={(e) => setDescription(e.target.value)}
         rows="3" placeholder="Enter Description of Podcast"></textarea>
      </div>
    <div className='flex gap-4'>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 font-bold mb-2" for="email">
          Video
        </label>
        <input
          className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="video"
          type="file"
          onChange={(e) => setVideo(e.target.files[0])} 
          placeholder="Enter video"
        />
      </div>
    
      </div>
      <div className='flex gap-4'>
      <div className="mb-4 w-full">
        <label className="block text-gray-700 font-bold mb-2" for="email">
         Add Thumbnail
        </label>
        <input
          className="appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="photo"
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])} 
          placeholder="Enter Thumbnail for the video"
        />
      </div>
    
      </div>
     
      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  </div>
          </div>
          </div>
        
         

   <Footer /> 
      </div>
      
    </div>
  )
}
