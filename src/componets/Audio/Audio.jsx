/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import AudioBox from './AudioBox';
import axios from 'axios';

export default function Audio() {
  const [audioData, setAudioData] = useState([]);
  const [audioList, setAudioList] = useState([]);
  const [displayRecent, setDisplayRecent] = useState(false);

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


  return (
    <div className="container bg-gray-300 p-8">
      <div className="mx-auto">
        <h3 className="mb-4 self-center text-3xl font-semibold item-center justify-center text-center whitespace-nowrap dark:text-purple-800 mt-5 ">Podcast Audios</h3>
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
        <div className="container grid grid-cols-1 md:grid-cols-3 gap-[1rem] p-20 mt-[-2rem]">
  {filteredAudioList.map((audio) => (
    <AudioBox key={audio.id} {...audio} />
  ))}
</div>
      </div>
    </div>
  );
}
