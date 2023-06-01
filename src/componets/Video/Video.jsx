/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React,{ useState,useEffect} from 'react'
import VideoBox from './VideoBox';
import '../../App.css'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

export default function Video() {
   const navigate = useNavigate();
  const [videoData, setVideoData] = useState([]);
          const [videoList, setVideoList] = useState([]);
          const [displayRecent, setDisplayRecent] = useState(false);
          const [subscribed, setSubscribed] = useState(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            const userID = user && user.user ? user.user.id : null;
            const storedStatus = userID ? localStorage.getItem(`subscribed_${userID}`) : null;
            return storedStatus ? JSON.parse(storedStatus) : false;
          });
          const handleSortAscending = () => {
            const sortedAudioList = [...videoList].sort((a, b) =>
              a.description.localeCompare(b.description)
            );
            setVideoList(sortedAudioList);
            setDisplayRecent(false);
          };
        
          const handleSortDescending = () => {
            const sortedAudioList = [...videoList].sort((a, b) =>
              b.description.localeCompare(a.description)
            );
            setVideoList(sortedAudioList);
            setDisplayRecent(false);
          };
        
          const handleDisplayRecent = () => {
            setVideoList(videoData);
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
        
              const res = await http.get('/getAllvideo');
              const videoData = res.data.data;
              setVideoData(videoData);
              setVideoList(videoData);
            };
        
            fetchData();
          }, []);
        
          let filteredVideoList = [];
        if (videoList.length > 0) {
          filteredVideoList = displayRecent
            ? videoList.filter((video) => {
                const lastCreatedAudioTimestamp = videoList[videoList.length - 1].created_at;
                return video.created_at === lastCreatedAudioTimestamp;
              })
            : videoList;
        }
        const handleSubscribe = async () => {
          const token = localStorage.getItem('token');
        
          if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
        
            if (user && user.user && user.user.id) { 
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
              console.log('User object not found');
            }
          } else {
            navigate('/login');
          }
        };
        
        const handleUnsubscribe = async () => {
          const confirmed = window.confirm('Are you sure you want to Subscribe?');
          if (confirmed) {
            const user = JSON.parse(localStorage.getItem('user'));
        
            if (user && user.user && user.user.id) { // Check if user and user.user exist
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
            } else {
              console.log('User object not found');
            }
          }
        };
        
        
          return (
            <div className="container bg-purple-300 p-8">
              <div className=" mx-auto">
          
      <h3 className="mb-4 self-center text-3xl font-semibold item-center justify-center text-center whitespace-nowrap dark:text-purple-800">Podcast Videos</h3>
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
                <div className="containe grid grid-cols-2 gap-[1rem] p-20 mt-[-2rem]">
                  {filteredVideoList.map((video) => (
                    <VideoBox
          key={video.id}
          id={video.id}
          title={video.title}
          description={video.description}
          released={video.released}
          video_url={video.video_url}
          photo_url={video.photo_url}
          subscribed={subscribed}
          handleSubscribe={handleSubscribe}
          handleUnsubscribe={handleUnsubscribe}/>
                  ))}
                </div>
              </div>
            </div>
          );
}
