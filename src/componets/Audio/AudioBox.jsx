/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import Audio1 from './../../assets/h.mp3'
import axios from 'axios'
import Alert from '../Admin/Alert';
export default function AudioBox({ id,title, description, released }) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

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
  
      const res = await http.post('/comments', data);
      const comment = res.data;
 
      console.log(comment.status);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitComment = async(event) => {
    try {
    event.preventDefault();
    const formData = new FormData();
    formData.append('podcast_id', id);
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

  return (
    <div>
         <div
      className={` h-[10rem] relative p-10 bg-purple-400 rounded-lg  mb-10 w-[18rem] ${
        isFocused ? 'transform scale-110' : ''
      }`}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      key={id}
    >
      <div className="flex items-start">
        <div className="w-[1rem] p-5 justify-center items-center">
        <audio 
        src={Audio1} 
        controls 
        className="-mx-[4.5rem] w-20 h-20 rounded-full"
        onTimeUpdate={handleTimeUpdate}></audio>
        </div>
        <div className="w-[20rem] ml-[-2rem]">
          <div className="font-bold">{title}</div>
          <div className="text-gray-200">{description}</div>
          <div className="text-gray-200 text-sm">{released}</div>
          <div className="text-gray-500 text-sm mt-2 mb-2">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          <div className='mb-2'>
    
    {successMessage && (
      
      <Alert type="success" message={successMessage} />
    )}

   
    {errorMessage && <Alert type="error" message={errorMessage} />}
  </div>
<form onSubmit={handleSubmitComment}>
    <label className="sr-only">Your message</label>
    <div className="flex items-center p-[0.1rem] rounded-lg bg-gray-50 dark:bg-gray-700">
        <textarea    value={comment} id="chat" rows="1" className="block -mx-0 p-[0.3rem] w-[12rem] text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"   onChange={handleCommentChange} placeholder="Your comment..."></textarea>
            <button type="submit" className="inline-flex justify-center p-1 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
            <svg aria-hidden="true" className="w-7 h-7 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            <span className="sr-only">Send message</span>
        </button>
    </div>
</form>

       
        </div>
      </div>
    </div>
    </div>
 
  );
}