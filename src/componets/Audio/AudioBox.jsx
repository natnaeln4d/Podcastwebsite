/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Alert from '../Admin/Alert';

export default function AudioBox({ id, title, description, released, audio_url }) {
  const [isFocused, setIsFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();
  const handleCommentChange = (event) => {
    setComment(event.target.value);
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
      const comment = res.data;

      console.log(comment.status);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (event) => {
    try {
      event.preventDefault();
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

  const handleSubscribe =async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
     
      setSubscribed(true);
      try{
        const token = localStorage.getItem('token');
        const http = axios.create({
          
          baseURL: 'http://localhost:8000/api',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userID = JSON.parse(localStorage.getItem('user'));
       
     
       const uId=userID.user.id
       const data = {
   
        status: 1, 
      };
        const res = await http.patch(`/subscribe/${uId}`, data);
    
        console.log(res)
       }  catch (error) {
        console.log(error);}
    } else {
     
      navigate('/login');
    }
  };
  
  const handleUnsubscribe = async() => {
    setSubscribed(false);

 try{
        const token = localStorage.getItem('token');
        const http = axios.create({
          
          baseURL: 'http://localhost:8000/api',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userID = JSON.parse(localStorage.getItem('user'));
       
     
       const uId=userID.user.id
       const data = {
   
        status: 0, 
      };
        const res = await http.patch(`/subscribe/${uId}`, data);
    
        console.log(res)
       }  catch (error) {
        console.log(error);}

  };

  const baseUrl = 'http://127.0.0.1:8000';

  return (
    <div>
      <div
        className={` h-[10rem] relative p-10 bg-purple-400 rounded-lg  mb-10 w-[25rem] ${
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
            <div className="text-gray-200">{description}</div>
            <div className="text-gray-200 text-sm">{released}</div>
            <div className="text-gray-500 text-sm mt-2 mb-2">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <div className="mb-2">
              {successMessage && <Alert type="success" message={successMessage} />}
              {errorMessage && <Alert type="error" message={errorMessage} />}
            </div>
            <form className='flex gap-[1rem] ml-[-1rem]' onSubmit={handleSubmitComment}>
              <label className="sr-only">Your message</label>
              <div className="flex items-center  rounded-lg bg-gray-50 dark:bg-gray-700">
                <textarea
                  value={comment}
                  id="chat"
                  rows="1"
                  className="block -mx-0 p-[0.3rem] w-[12rem] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handleCommentChange}
                  placeholder="Your comment..."
                ></textarea>
                <button
                  type="submit"
                  className="inline-flex justify-center p-1 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    aria-hidden="true"
                    className="w-7 h-7 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                  <span className="sr-only">Send message</span>
                </button>
              </div>
              {!subscribed && (
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      )}

      {subscribed && (
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2 mt-2"
          onClick={handleUnsubscribe}
        >
          Unsubscribe
        </button>
      )}
            </form>
           
          </div>
        </div>
      </div>
    </div>
  );
}
