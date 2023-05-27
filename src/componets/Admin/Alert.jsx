/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

const Alert = ({ type, message }) => {
  const alertClasses = `py-2 px-4 rounded-md ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white`;

  return (
    <div className={alertClasses}>
      <p>{message}</p>
    </div>
  );
};

export default Alert;