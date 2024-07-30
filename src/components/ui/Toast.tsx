"use client"
import React, { useEffect } from 'react';

type Props = {
  time: number;
  type: 'error' | 'success' | 'info';
  message: string;
  onClose: () => void;
};

const Toast: React.FC<Props> = ({ time, type, message, onClose }) => {
  useEffect(() => {
    // console.log('toast')
    const timer = setTimeout(() => {
      onClose();
      // console.log('toast closed')
    }, time);

    return () => clearTimeout(timer);
  }, [time, onClose]);

  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={`fixed top-5 right-5 p-4 rounded text-white shadow-lg ${typeClasses[type]} z-10`}>
        {message}
        <button onClick={onClose} className='ml-4'>
        X
        </button>
    </div>
  );
};

export default Toast;
