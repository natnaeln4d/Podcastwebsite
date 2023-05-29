/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import img from './../../assets/icons8-microphone-64.png'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Alert from '../Admin/Alert';
export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  
    
    const navigate = useNavigate();
    
    const handleEmailChange = (e) => {
       
      setEmail(e.target.value);
   }
 
   
   
   const sendRegister = async (data) => {
    try {
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
      });
  
      const res = await http.post('/forgot-password', data);
      const user = res.data;
      console.log(user);
  
      if (user.status === 'ok') {
        setSuccessMessage('check your email');
        navigate('/pinverify')
        setErrorMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
  
       
      }
      else{
        setSuccessMessage('');
        setErrorMessage('No user.');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
  
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  
     
  const hadleSubmit = (e) => {
     
     e.preventDefault();
     
     const data = {
     'email': email
     }
     sendRegister(data);
     
  }
  
  
    return (
      <>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75">
        </div>
     </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
           <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <section className="bg-gray-50 dark:bg-purple-900">
                 <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                       <img className="w-[12vh]  h-[11vh] mr-2" src={img} alt="logo"/>
                           Deep Podcast  
                 </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-purple-800 dark:border-purple-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Reset password Email
          </h1>
                 <form onSubmit={hadleSubmit} className="space-y-4 md:space-y-6" action="#">
                    <div>
                       <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input value={ email } onChange = {handleEmailChange} type="email" name="email" id="email" className="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                    </div>
              
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <Link to={`/`}  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                    </div>
                    <div className='mb-2'>
      
      {successMessage && (
        
        <Alert type="success" message={successMessage} />
      )}
  
    
      {errorMessage && <Alert type="error" message={errorMessage} />}
    </div>
                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?    <Link to={`/signup`} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>
      </div>
    </div>
  </div>
      </>
    )
}
