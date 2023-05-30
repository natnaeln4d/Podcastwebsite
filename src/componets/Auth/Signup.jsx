/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import img from './../../assets/icons8-microphone-64.png'
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import Alert from '../Admin/Alert';

export default function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword2] = useState('');
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  function handleFirstNameChange(e) {

    setFirstName(e.target.value);
  }
  const handleLastNameChange = (e) => {
     
     setLastName(e.target.value);
  }
  const handleEmailChange = (e) => {
     
     setEmail(e.target.value);
  }
  const handlePasswordChange = (e) => {
     
     setPassword(e.target.value);
  }
  const handleConfrimPassword= (e) => {
     
     setPassword2(e.target.value);
  }
  
  const sendRegister = async(data) => {
 try{
  const http = axios.create({
    'baseURL': 'http://localhost:8000/api',

 });
 
 const res = await http.post('/signup',data);
 const user = res.data;
 console.log(user)

 
 if(user.status === 'success'){
 

  localStorage.setItem('token',user.token);
  localStorage.setItem('user',JSON.stringify(user));


  

   }
  }catch(error) {
    console.log(error)
  }
   
  }
  
  const hadleSubmit = (e) => {
     try{
     e.preventDefault();
     if(password===password1){
      const data = {
        'fname': firstName,
        'lname': lastName,
        'email': email,
        'password': password,
       
        }
        sendRegister(data);
   
        navigate('/')
        setSuccessMessage('added successfully.');
        setErrorMessage('');
        setTimeout(() => {
          setSuccessMessage('');
        }, 4000);

     }
     else{
      setSuccessMessage('');
      setErrorMessage('password is not match.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);

     }
    } catch (error) {
     
      setSuccessMessage('');
      setErrorMessage('Failed to add.');
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }

  

     
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
            <section className="bg-gray-50 dark:bg-purple-900 overflow-y-auto">
               <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                     <img className="w-[12vh]  h-[11vh] mr-2" src={img} alt="logo"/>
                         Deep Podcast  
               </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-purple-800 dark:border-purple-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ">
                Sign in to your account
        </h1>
    
        <form onSubmit={hadleSubmit} class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="First Name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                      <input value={firstName} onChange={ handleFirstNameChange } type="text" name="first_name" id="email" class="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your First Name" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                      <input value={lastName} onChange={ handleLastNameChange }  type="text" name="last_name" id="email" class="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Last Name" required=""/>
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input value={email} onChange={ handleEmailChange }  type="email" name="email" id="email" class="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={password} onChange={ handlePasswordChange }  type="password" name="password" id="password" placeholder="••••••••" class="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input value={password1} onChange={ handleConfrimPassword }  type="password" name="password" id="password" placeholder="••••••••" class="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className='mb-2'>
    
    {successMessage && (
      
      <Alert type="success" message={successMessage} />
    )}

  
    {errorMessage && <Alert type="error" message={errorMessage} />}
  </div>
                  <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already Have Account? <Link to={`/login`} class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</Link>
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
