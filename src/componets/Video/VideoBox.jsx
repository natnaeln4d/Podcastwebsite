/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
import i1 from './../../assets/podcast-microphone-low-poly-wireframe-design-free-vector.jpeg';
import '../../App.css';
import Alert from '../Admin/Alert';
import { FaTrash } from 'react-icons/fa'
export default function VideoBox({ id, title, description, released, video_url, photo_url, subscribed, handleSubscribe, handleUnsubscribe }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [afterPlaying, setAfterPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] =useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] =useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
  
      const res = await http.get(`/videoComments/${id}`);
      const commentData = res.data.data;
      console.log("Datas dd:",commentData)
      setComments(commentData);
    };
  
    fetchData();
  
    const user = JSON.parse(localStorage.getItem('user'));
    const userID = user && user.user ? user.user.id : null;
    if (userID) {
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(subscribed));
    }
  }, [id, subscribed]);
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const sendComment = async (data) => {
    try {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const res = await http.post('/commentVideo', data);
      const comment = res.data;
 
      console.log(comment.status);
    } catch (error) {
      console.log(error);
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
      console("Delete",res)
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
  const handleSubmitComment = async(event) => {
    try {
    event.preventDefault();
    const formData = new FormData();
    if (subscribed) {
      const userID = JSON.parse(localStorage.getItem('user'));
      formData.append('user_id', userID.user.id);
    }
    formData.append('video_id', id);
    formData.append('text', comment);
    await sendComment(formData);
    setComment('')
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
  const handleCancel = () => {
    const confirmed = window.confirm('Are you sure you want to cancel?');

    if (confirmed) {
      setAfterPlaying(!afterPlaying)
      setIsPlaying(!isPlaying);
    }
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
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
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user && user.user ? user.user.id : null;

  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div>
      <div
        className={`relative p-4 bg-white w-[30rem] h-auto rounded-lg ${
          isFocused ? 'transform scale-110' : ''
        }`}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        onClick={handleVideoClick}
        key={id}
      >
        <div className="items-start flex-column">
          <div className="items-center justify-center w-auto h-auto bg-gray-500">
          <img
          src={`${baseUrl}${photo_url}`}
            alt="thumbnail"
            className="w-[490px] h-[230px] rounded-lg"
          />
          <div className='absolute text-white shadow-md top-5 left-8'>Deep Podcast Video</div>
          <div className='absolute text-blue-500 shadow-md bottom-[4rem] right-6'>{formatTime(duration)}</div>
          </div>
          <div className="mt-3 ml-2">
            <div className="font-bold">{title}</div>  
            <div className="text-sm text-gray-500">{released}</div>
          </div>
        </div>
      </div>

      {isPlaying && (
        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        

            <div className="inline-block overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl align-middle w-[80%]">
            <div className="items-start flex-column">
          <div className="items-center justify-center p-5">
          <button
                onClick={handleCancel}
                className="absolute text-red-500 top-10 right-8"
              >
                <FaTimes className="text-end w-[2rem] h-[2rem]" />
              </button>
              
              <video
                 src={`${baseUrl}${video_url}`}
                controls
                className="object-cover w-full h-full video-p"
                onTimeUpdate={handleTimeUpdate}
              ></video>
          </div>
          <div className="w-1/2 mb-5 ml-4">
            <div className="font-bold">{title}</div>
            <div className="text-gray-500">{description}</div>
            <div className="text-sm text-gray-500">{released}</div>
            <div className="mt-2 mb-2 text-sm text-gray-500">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className='mb-2'>
    
    {successMessage && (
      
      <Alert type="success" message={successMessage} />
    )}

   
    {errorMessage && <Alert type="error" message={errorMessage} />}
  </div>
          <form className='flex gap-[3rem] mb-4' onSubmit={handleSubmitComment}>
    <label className="sr-only">Your message</label>
    <div className="flex items-center p-[0.1rem] rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea    value={comment} id="chat" rows="1" className="block -mx-0 p-[0.3rem] w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   onChange={handleCommentChange} placeholder="Your comment..."></textarea>
            <button type="submit" className="inline-flex justify-center p-1 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="rotate-90 w-7 h-7" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span className="sr-only">Send message</span>
        </button>
    </div>
    {!subscribed && (
        <button
          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-lg"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      )}

      {subscribed && (
        <button
          className="px-4 py-2 mt-2 text-white bg-purple-900 rounded-lg"
          onClick={handleUnsubscribe}
        >
          subscribed
        </button>
      )}
          
</form>
        <div className='overflow-y-auto h-[20vh] w-full'>
{comments.map((comment) => (
<div key={comment.id}  class=" items-center  p-2 hover:bg-purple-300   m-2 ">
<div className="flex flex-row gap-4 ">
<img class="w-8 h-8 mb-1 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/>
        <div>
        {comment.user && (
        <h6 class="text-[10px] font-medium text-gray-900">{comment.user.email|| 'unknown'}</h6> )}
        <div className='flex'>
        <p className='text-gray-900'>{comment.text}</p>
        </div>
        </div>
        {comment.user && comment.user.id === userID && (
          <div className='justify-end item-end text-end'>
          <a href="#" class="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={() => handleDelete(comment.id)}> <FaTrash /></a>
         
          </div>
          
          )}
        </div>   
    </div>
    ))} 
</div>
          </div>
        </div>

            </div>
          </div>
  
        </div>
      )}
    </div>
  );
}
