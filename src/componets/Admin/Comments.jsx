/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Footer from '../footer/Footer';
import Sidebar from './Sidebar';
import { AiOutlineRight } from 'react-icons/ai';
import img2 from './../../assets/icons8-microphone-64.png';
import { Link as ScrollLink } from 'react-scroll';
import axios from 'axios';
import { Link as Link } from 'react-router-dom';
import Alert from './Alert';
import AdminNav from './AdminNav';
export default function Comments({ audioId }) {
  const [comments, setComments] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await http.get('/allcomments');
      const CommentData = res.data.data;
      setComments(CommentData);
    };

    fetchData();
  }, []);

  const handleDelete=async(id)=>{
    try {
      const confirmed = window.confirm('Are you sure you want to Delete?');

      if (confirmed) {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const res = await http.delete(`/deleteComment/${id}`);
      setComments(res.data.data)
     console.log(res)
      setSuccessMessage('Deleted successfully.');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    }
    } catch (error) {
      console.log(error);
      setSuccessMessage('');
      setErrorMessage('Failed to Delete.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }

  }

  return (
    <div>
      <div className=" ">
        <AdminNav />
        <div className="h-[90px] w-full flex dark:bg-gray-700">
          <div className="p-2 m-2 mb-2 flex-column">
            <div className="flex w-[13rem]  bg-gray-600 ">
              <h5 className="text-[0.9rem]">Home</h5>
              <h6 className="mt-1">
                <AiOutlineRight />
              </h6>
              <h2 className="text-white font-semi-bold">Dashboard</h2>
            </div>
            <div>
              <h1 className="font-bold text-[1.9rem] text-white">
                Dashboard
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row h-[90vh] mb-4">
          <Sidebar />

          <div className="bg-gray-100 p-6 h-[90vh] w-full overflow-y-auto flex-row">
            <div>
              <h2 className="text-2xl font-bold mb-4">All Comments</h2>
              <div className='mb-2'>
      
      {successMessage && (
        
        <Alert type="success" message={successMessage} />
      )}
  
     
      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
    {comments.map((comment) => (
  <div key={comment.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
    <p className="text-lg">{comment.text}</p>
    <p className="text-gray-500 text-sm mt-2">
      Posted on: {comment.created_at}
    </p>
    {comment.podcast && (
      <p className="text-gray-500 text-sm">
      Audio ID: {comment.podcast.id || ''}
    </p>
    )}
    {comment.video && (
      <p className="text-gray-500 text-sm">
      Video ID: {comment.video.id || ''}
    </p>
    )}
    {comment.podcast && (
      <p className="text-gray-500 text-sm">
        Audio Title: {comment.podcast.title}
      </p>
    )}
    {comment.video&& (
      <p className="text-gray-500 text-sm">
        Video Title: {comment.video.title}
      </p>
    )}
    {comment.user&& (
      <p className="text-gray-500 text-sm">
        Email: {comment.user.email}
      </p>
    )}
    <button
                    onClick={() => handleDelete(comment.id)}
                    className="bg-red-500 text-white px-3 py-1 mt-2 rounded-md"
                  >
                    Delete
                  </button>
  </div>
))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}


