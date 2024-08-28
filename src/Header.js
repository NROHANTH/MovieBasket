import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <header className="relative bg-red-400 p-5 flex items-center justify-between">
      <div className="relative w-38 h-10 overflow-hidden size-60">
        <img src="/pre2.png" alt="Site Logo" className="absolute left-0 top-0 w-full h-full object-cover clip-path-custom" />
      </div>
      {/* <nav className="flex flex-grow justify-center">
        <ul className="flex space-x-4">
          <li><a href="/" className="text-blue-500 hover:underline">Home</a></li>
          <li><a href="/Movies" className="text-blue-500 hover:underline">Movies</a></li>
        </ul>
      </nav> */}
      <button 
        onClick={handleBackClick} 
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
      >
        Back
      </button>
    </header>
  );
};

export default Header;