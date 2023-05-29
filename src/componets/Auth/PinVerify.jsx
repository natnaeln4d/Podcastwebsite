/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import Alert from '../Admin/Alert';
import { Link,useNavigate } from 'react-router-dom';
export default function PinVerify() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
     
    setEmail(e.target.value);
 }
  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  const handleKeyUp = (index, e) => {
    if (e.keyCode === 8 && !otp[index] && index > 0) {
      const previousInput = document.getElementById(`otp-${index - 1}`);
      previousInput.focus();
    } else if (otp[index] && index < otp.length - 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput.focus();
    }
  };

  const handleSubmit =async () => {
    const otpCode = otp.join(''); 
    try {
      const http = axios.create({
        baseURL: 'http://localhost:8000/api',
      });
      const data = {
        'email': email,
        'token': otpCode,
        }
  
      const res = await http.post('/pinverify',data);
      const user = res.data;
      console.log(user);
  
      if (user.status === true) {
      
        navigate('/resetpassword')
        setErrorMessage('');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
  
       
      }
      else{
        setSuccessMessage('');
        setErrorMessage('incorrect pin.');
        setTimeout(() => {
          setErrorMessage('');
        }, 4000);
  
      }
    } catch (error) {
      console.log(error);
    }

  
  };
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <section className="bg-gray-50 dark:bg-purple-900">
            <div>
              <div className="mb-2">
                {successMessage && <Alert type="success" message={successMessage} />}
                {errorMessage && <Alert type="error" message={errorMessage} />}
              </div>
              <div className="flex flex-col items-center justify-center p-10">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-purple-50 border border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-purple-700 dark:border-purple-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div className="flex justify-center mt-[-15rem] items-center h-screen">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    className="w-12 h-12 rounded-lg border border-gray-300 mx-1 text-center text-xl font-semibold focus:outline-none focus:border-blue-500"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyUp={(e) => handleKeyUp(index, e)}
                  />
                ))}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
  
}
