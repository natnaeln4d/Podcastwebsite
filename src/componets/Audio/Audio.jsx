/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AudioBox from './AudioBox';
import { Link,useNavigate } from 'react-router-dom';
export default function Audio() {
  const [audioData, setAudioData] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [displayRecent, setDisplayRecent] = useState(false);
  const navigate = useNavigate();

          const [subscribed, setSubscribed] = useState(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userID = user.user.id;
            const storedStatus = localStorage.getItem(`subscribed_${userID}`);
            return storedStatus ? JSON.parse(storedStatus) : false;
          });
  const handleSortAscending = () => {
    const sortedAudioList = [...audioList].sort((a, b) =>
      a.description.localeCompare(b.description)
    );
    setAudioList(sortedAudioList);
    setDisplayRecent(false);
  };

  const handleSortDescending = () => {
    const sortedAudioList = [...audioList].sort((a, b) =>
      b.description.localeCompare(a.description)
    );
    setAudioList(sortedAudioList);
    setDisplayRecent(false);
  };

  const handleDisplayRecent = () => {
    setAudioList(audioData);
    setDisplayRecent(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const res = await http.get('/getAll');
      const audioData = res.data.data;
      setAudioData(audioData);
      setAudioList(audioData);

      const sortedAudioList = [...audioData].sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
      );
      setAudioList(sortedAudioList);
      setDisplayRecent(false);
    };

    fetchData();
  }, []);

  let filteredAudioList = [];
  if (audioList.length > 0) {
    filteredAudioList = displayRecent
      ? audioList.filter((audio) => {
          const lastCreatedAudioTimestamp = audioList[audioList.length - 1].created_at;
          return audio.created_at === lastCreatedAudioTimestamp;
        })
      : audioList;
  }
  const handleSubscribe =async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      const userID=user.user.id
     
      setSubscribed(true);
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(true));
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

    const confirmed = window.confirm('Are you sure you want to Unsubscribe?');
    if(confirmed){
      const user = JSON.parse(localStorage.getItem('user'));
      const userID=user.user.id
      setSubscribed(false);
      localStorage.setItem(`subscribed_${userID}`, JSON.stringify(false));
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
    }
  

  };

  return (
    <div className="container bg-gray-300 p-8">
      <div className="mx-auto">
        <h3 className="mb-4 self-center text-3xl font-semibold item-center justify-center text-center whitespace-nowrap dark:text-purple-800 mt-5">
          Podcast Audios
        </h3>
        <div className="flex gap-[1rem] mb-4">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleDisplayRecent}
          >
            Show Recent
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSortAscending}
          >
            Sort Ascending
          </button>
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSortDescending}
          >
            Sort Descending
          </button>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-[1rem] p-20 mt-[-2rem]">
          {filteredAudioList.map((audio) => (
            <AudioBox key={audio.id} {...audio}
             subscribed={subscribed}
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}/>           ))}
        </div>
      </div>
    </div>
  );
}
