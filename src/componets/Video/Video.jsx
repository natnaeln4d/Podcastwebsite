/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React,{ useState} from 'react'
import VideoBox from './VideoBox';
import '../../App.css'
    const videoData = [
        {
          id: 1,
          title: 'Video Title 1',
          description: 'Description of Video 1',
          released: 'May 1, 2023',
          videoUrl: 'path/to/audio1.mp3',
        },
        {
          id: 2,
          title: 'Video Title 2',
          description: 'Description of Video 2',
          released: 'May 5, 2023',
          videoUrl: 'path/to/audio2.mp3',
        },
        {
          id: 3,
          title: 'Video Title 3',
          description: 'Description of Video 2',
          released: 'May 5, 2023',
          videoUrl: 'path/to/audio2.mp3',
        }, 
        {
          id: 4,
          title: 'Video Title 4',
          description: 'Description of Video 1',
          released: 'May 1, 2023',
          videoUrl: 'path/to/audio1.mp3',
        },
        {
          id: 5,
          title: 'Video Title 5',
          description: 'Description of Video 2',
          released: 'May 5, 2023',
          videoUrl: 'path/to/audio2.mp3',
        },
        {
          id: 6,
          title: 'Video Title 6',
          description: 'Description of Video 2',
          released: 'May 5, 2023',
          videoUrl: 'path/to/audio2.mp3',
        }
      ];
      
export default function Video() {
          const [videoList, setVideoList] = useState(videoData);
          const [displayRecent, setDisplayRecent] = useState(false);
        
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
        
          const filteredVideoList = displayRecent
            ? videoList.filter((video) => video.released === 'May 5, 2023') 
            : videoList;
        
          return (
            <div className="bg-purple-300 p-8">
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
                <div className="grid grid-cols-2 gap-[1rem] p-20 mt-[-2rem]">
                  {filteredVideoList.map((video) => (
                    <VideoBox key={video.id} {...video} />
                  ))}
                </div>
              </div>
            </div>
          );
}
