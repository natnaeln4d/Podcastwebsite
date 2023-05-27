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

// import axios from 'axios'
import Alert from './Alert';
export default function Addvideo() {


  const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
  

  const sendRegister = async(data) => {
  
  // try {
    
  
  //   const token = localStorage.getItem('token')
  //   const http = axios.create({
  //       'baseURL': 'http://localhost:8000/api',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       }
  //    });
  //    const res = await http.post('/chairman/register',data);
  //    const user = res.data;
  //    console.log(user.status)
     
  //    if(user.status === 'sucess'){
  
  //     localStorage.removeItem('face-id');
      
  //     switch(user.role.roleable.role){
  //        case 'admin':
  //           navigate('/admin/dashboard');
  //           break;
  //        case 'candidate':
  //          navigate('candidate/dashboard');
  //          break;
  //        case 'chairman':
  //           navigate('chairman/dashboard');
  //           break;
  //        case 'voter':
  //           navigate('voter/dashboard');
  //           break;
  //        default:
  //           navigate('/');
  //           break;
           
  //     }
  //  }
  //     } catch (error) {
    
  //   }
  }
    
    
  
    const handleSubmit = (event) => {
      try{
    
      event.preventDefault();
     
      const formData = new FormData();
      formData.append("title",title);
      formData.append("description",description);
      formData.append("video", video);
    
      setSuccessMessage('added successfully.');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
      } catch (error) {
     
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
          type='file'
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          placeholder="Enter Audio "
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
