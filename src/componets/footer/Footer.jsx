/* eslint-disable no-unused-vars */
import React from 'react'

export default function Footer() {
  return (
    <div>

<footer className="bg-white rounded-lg shadow m-4 dark:bg-purple-800">
    <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span className="text-sm text-white sm:text-center dark:text-white">© 2023 <a href="#" className="hover:underline">Deep Podcast™</a>. All Rights Reserved.
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white dark:text-white sm:mt-0">
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
        </li>
        <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
    
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div>
</footer>

      
    </div>
  )
}
