/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../Admin/Alert';
import { FaTrash } from 'react-icons/fa';
export default function AudioBox({ id, title, description, released, audio_url, status }) {
  const [isFocused, setIsFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [com,setCom]=useState('')
  const [subscribed, setSubscribed] = useState(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user && user.user ? user.user.id : null;
    const storedStatus = userID ? localStorage.getItem(`subscribed_${userID}`) : null;
    return storedStatus ? JSON.parse(storedStatus) : false;
  });
  const p="Perfect!"
  const t="Thanks For sharing!"
  const setSelectedComment=useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const descriptionCharacterLimit = 20;
  const truncatedDescription = description.length > descriptionCharacterLimit ? `${description.slice(0, descriptionCharacterLimit)}...` : description;
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const res = await http.get(`/getComments/${id}`);
      const commentData = res.data.data;
      setComments(commentData);
    };
  
    fetchData();
  
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user && user.user ? user.user.id : null;
    if (userID) {
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(subscribed));
    }
  }, [id, subscribed]);
  

  const navigate = useNavigate();

  const handleCommentChange = (event) => {
    
    setComment(event.target.value);

  };

  const renderDescription = () => {
    if (showFullDescription) {
      return (
        <div>
        <p className='text-gray-800'>
        {description}
        <button
          className="text-blue-500 ml-2 underline"
          onClick={() => setShowFullDescription(false)}
        >
          Show Less
        </button>
        </p>
         

     
        </div>
      );
    }
    return (
      <div className="text-gray-200">
        {truncatedDescription}
        <button
          className="text-blue-500 ml-2 underline"
          onClick={() => setShowFullDescription(true)}
        >
          Show Details
        </button>
      </div>
    );
  };
  

  const sendComment = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const res = await http.post('/comments', data);
      const commentData = res.data.data;

       setComment(commentData);
      console.log(commentData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (event) => {
    try {
      event.preventDefault();
      let selectedComment = comment;
      const formData = new FormData();

      if (subscribed) {
        const userID = JSON.parse(localStorage.getItem('user'));
        formData.append('user_id', userID.user.id);
      }

      formData.append('podcast_id', id);
      formData.append('text', comment);
      await sendComment(formData);
      setComment('');
      setSuccessMessage('Commented successfully.');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);
    } catch (error) {
      console.log(error);
      setSuccessMessage('');
      setErrorMessage('Failed to Comment.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
    setDuration(event.target.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSubscribe = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID = user.user.id;

      setSubscribed(true);
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(true));

      try {
        const token = localStorage.getItem('token');
        const http = axios.create({
          baseURL: 'http://localhost:8000/api',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = {
          status: 1,
        };
        const res = await http.patch(`/subscribe/${userID}`, data);

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/login');
    }
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user && user.user ? user.user.id : null;

  const handleUnsubscribe = async () => {
    const confirmed = window.confirm('Are you sure you want to Unsubscribe?');
    if (confirmed) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID = user.user.id;

      setSubscribed(false);
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(false));

      try {
        const token = localStorage.getItem('token');
        const http = axios.create({
          baseURL: 'http://localhost:8000/api',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = {
          status: 0,
        };
        const res = await http.patch(`/subscribe/${userID}`, data);

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDelete=async(idd)=>{
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

      const res = await http.delete(`/deleteCommentbyUser/${idd}`);
      const CommentData = res.data.data;
      setComments(CommentData);
     console.log(res)
      setSuccessMessage('Deleted successfully.');
      setErrorMessage('');
      setTimeout(() => {
        setSuccessMessage('');
      }, 4000);}
    } catch (error) {
      console.log(error);
      setSuccessMessage('');
      setErrorMessage('Failed to Delete.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }

  }
  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div className=' bg-purple-600 rounded-lg mb-10 w-[25rem] h-100vh'>
      <div
        className={`relative  relative p-10 ${
          isFocused ? 'transform scale-110' : ''
        }`}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        key={id}
      >
        <div className="flex items-start">
          <div className="w-[1rem] p-5 justify-center items-center">
            <audio
              src={`${baseUrl}${audio_url}`}
              controls
              className="-mx-[4.5rem] w-20 h-20 rounded-full"
              onTimeUpdate={handleTimeUpdate}
            ></audio>
          </div>
          <div className="w-[20rem] ml-[-2rem]">
            <div className="font-bold">{title}</div>
            {renderDescription()}
            <div className="text-gray-200 text-sm">{released}</div>
            <div className="text-white text-sm mt-2 mb-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
        </div>
      </div>
      <div className='flex-col'>
      <div className="flex items-center justify-between px-4" >
              <div className='flex  px-4 py-2 mb-[-1.5rem]'>
                <p className='text-white'>comments <div class=" inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full p-2  dark:border-gray-900">{comments.length}</div></p>
              </div>
              {!subscribed && (
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 "
                  onClick={handleSubscribe}
                >
                  subscribe
                </button>
              )}

              {subscribed && (
                <button
                  className="bg-purple-900 text-white rounded-lg px-4 py-2 mt-2"
                  onClick={handleUnsubscribe}
                >
                  subscribed
                </button>
              )}
            </div>
<hr className='m-2' />
      </div>
      <form className='p-2' onSubmit={handleSubmitComment}>
    
   <div className="w-full mb-4 border border-purple-200 rounded-lg bg-purple-50 dark:bg-purple-700 dark:border-purple-600">
       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-purple-800">
           <label for="comment" className="sr-only">Your comment</label>
           <textarea id="comment"  value={comment} rows="4" className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-purple-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" onChange={handleCommentChange} placeholder="Write a comment..." required></textarea>
       </div>
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          
           <div className="flex pl-0 space-x-1 sm:pl-2">
               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                   <span className="sr-only">Attach file</span>
               </button>
               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg>
                   <span className="sr-only">Set location</span>
               </button>
               <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                   <span className="sr-only">Upload image</span>
               </button>

           </div>
           <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
       </div>
   </div>
   <div className='mb-2'>
    
    {successMessage && (
      
      <Alert type="success" message={successMessage} />
    )}

   
    {errorMessage && <Alert type="error" message={errorMessage} />}
  </div>
</form>
<div className="flex  items-center justify-between mb-3 m-2 mt-[-1rem]">
<div className='flex gap-4'><p className='bg-purple-400 p-[5px] justify-center text-[12px] items-center text-center text-slate-900 rounded-[3rem]' onClick={() => setSelectedComment('Perfect!')}>{p}</p> 
<p className='bg-purple-400 p-[5px] justify-center text-[12px] items-center text-center text-slate-900 rounded-[3rem]'  onClick={() => setSelectedComment('Thanks For sharing!')}>{t}</p>
</div>
</div>
<hr className='m-2' />
<div className='overflow-y-auto h-[20vh]'>
{comments.map((comment) => (
<div key={comment.id}  class=" items-center  p-2 hover:bg-purple-300   m-2 ">
<div className="flex flex-row gap-4 ">
<img class="w-8 h-8 mb-1 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <div>
        {comment.user && (
        <h6 class="text-[10px] font-medium text-gray-900 dark:text-white">{comment.user.email|| 'unknown'}</h6> )}
        <div className='flex'>
        <p className='text-gray-400'>{comment.text}</p>
        </div>
        </div>
        {comment.user && comment.user.id === userID && (
          <div className='item-end text-end justify-end'>
          <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(comment.id)}> <FaTrash /></a>
         
          </div>
          
          )}
        </div>   
    </div>
    ))} 
</div>



    </div>
  );
}