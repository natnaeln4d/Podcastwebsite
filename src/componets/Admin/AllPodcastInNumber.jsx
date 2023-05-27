/* eslint-disable no-unused-vars */
import React from 'react'

export default function AllPodcastInNumber(){
    return (
        <div className="flex gap-4 mb-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-8">PodCast Data</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
       
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Audio</h2>
          <p className="text-5xl font-bold text-blue-500">100</p>
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h2 className="text-lg font-bold mb-2">Videos</h2>
          <p className="text-5xl font-bold text-green-500">50</p>
          
        </div>
        <div className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col items-center">
      <h2 className="text-lg font-bold mb-2">Viewers</h2>
      <p className="text-5xl font-bold text-red-500">20</p>
    
    </div>
    
      </div>
    </div>
      
         
            </div>
    )

}