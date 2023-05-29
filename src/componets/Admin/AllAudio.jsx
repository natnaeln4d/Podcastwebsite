/* eslint-disable react/no-unknown-property */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Footer from '../footer/Footer';
import Alert from './Alert';
import AllPodcastInNumber from './AllPodcastInNumber';
import Sidebar from './Sidebar';
import { AiOutlineRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { ScrollLink } from 'react-scroll/modules';
import axios from 'axios';
import image1 from './../../assets/icons8-microphone-64.png'

export default function AllAudio() {
    const [audios, setAudio] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    const handleDelete=async(id)=>{
      try {
        const token = localStorage.getItem('token');
        const http = axios.create({
          baseURL: 'http://localhost:8000/api',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const res = await http.delete(`/deletePodcast/${id}`);
     
       console.log(res)
        setSuccessMessage('Deleted successfully.');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);
      } catch (error) {
        console.log(error);
        setSuccessMessage('');
        setErrorMessage('Failed to Delete.');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
      }
  
    }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const http = axios.create({
          baseURL: 'http://localhost:8000/api',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        const res = await http.get('/getAll');
        const audioData = res.data.data;
        console.log(audioData); 
        setAudio(audioData);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
     
    
    return (
      <div className=' ' >
  
   
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
      <div class="flex flex-col md:flex-row h-[90vh] mb-4">
    <Sidebar />
    
      <div class="bg-gray-100 p-6 h-[90vh] w-full overflow-y-auto flex-row">
     <AllPodcastInNumber />
     <div className='mb-2'>
      
      {successMessage && (
        
        <Alert type="success" message={successMessage} />
      )}
  
     
      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
            <div class="bg-white rounded-lg shadow-md p-4 h-[17rem] overflow-y-auto">
            <table class="table-auto  w-full">
              <thead>
                <tr>
                <th class="px-1 py-2 font-bold text-left">ID</th>
                  <th class="px-4 py-2 font-bold text-left">Title</th>
                  <th class="px-4 py-2 font-bold text-left">Description</th>
                  <th class="px-4 py-2 font-bold text-left">Audio URl</th>
                  <th class="px-4 py-2 font-bold text-left">Status</th>
                  <th class="px-4 py-2 font-bold text-left"></th>
                </tr>
              </thead>
              <tbody>
            
              
              {audios.length > 0 ? (
    audios.map((audio) => (
      <tr key={audio.id} className="border-b h-[4rem] hover:bg-purple-300  text-gray-800 cursor-pointer p-2">
        <td class="border px-1 py-2">{audio.id}</td>
        <td class="border px-4 py-2">{audio.title}</td>
        <td class="border px-4 py-2">{audio.description}</td>
        <td class="border px-4 py-2">{audio.audio_url}</td>
        <td class="border px-4 py-2 text-green-500 font-bold">Active</td>
        <td className='px-4 py-2 border '>
        
          <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(audio.id)}>Delete</a>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colspan="6" className="text-center">No viewers found.</td>
    </tr>
  )}
  
  
   
  
  
                  
            
               
              
              </tbody>
            </table>
            </div>
            </div>
          
            </div>
  
      <Footer /> 
         </div>
    )
}
