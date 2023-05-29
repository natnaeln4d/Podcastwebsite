/* eslint-disable no-unused-vars */
import axios from 'axios'
import React,{useState,useEffect} from 'react'

export default function AllPodcastInNumber(){
  const [Audio,SetAudio]=useState([])
  const [Video,SetVideo]=useState([])
  const [Viewer,SetViewer]=useState([])
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
  
        const user = await http.get('/getViewer');
        const Audio = await http.get('/getAll')
        const videoA = await http.get('/getAllvideo')
        const userData=user.data.data
        const audioData=Audio.data.data 
        const videoData=videoA.data.data
        SetAudio(audioData)   
        SetViewer(userData)  
        SetVideo(videoData) 
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

    return (
        <div className="flex gap-4 mb-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8">PodCast Data</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Audio</h2>
          <p className="text-5xl font-bold text-blue-500">{Audio.length}</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Videos</h2>
          <p className="text-5xl font-bold text-green-500">{Video.length}</p>
          
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Viewers</h2>
      <p className="text-5xl font-bold text-red-500">{Viewer.length}</p>
    
    </div>
    
      </div>
    
    </div>
      
         
            </div>
    )

}