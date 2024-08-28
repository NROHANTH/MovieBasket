// In JavaScript, the concepts of default export and named export
//  are methods for exporting and importing modules. They are part of the ES6 (ECMAScript 2015)
// module system, which allows you to split your code into separate files and reuse 
// modules across different parts of your application.
import React from 'react';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import SingleMovie from './SingleMovie';
import Error from './Error';
import './index.css'
import Header from './Header';

const App = () => {
  return (
    <div className='bg-red-200 min-h-screen text-gray-900'>
      <Header /> 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Movies/:id' element={<SingleMovie />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
