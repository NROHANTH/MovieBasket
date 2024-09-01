import React from 'react';
import { useGlobalContext } from './context';

const Search = () => {
  const { query, setQuery, isError, isLoading } = useGlobalContext();

  return (
    <section className='p-4'>
      <div className='text-xl font-serif font-bold mb-4 text-center text-red-500 text-2xl'>
        Search Your Movie
      </div>
      <form action='#' onSubmit={(e) => e.preventDefault()} className='flex flex-col items-center'>
        <div>
          <input 
            type='text' 
            placeholder='search here' 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            className='border border-gray-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500'
          />
        </div>
        {query.trim() !== '' && isLoading && (
          <div className='text-gray-500 text-lg mt-4 text-2xl'>
            Loading...
          </div>
        )}
        {query.trim() === '' && isError.show && (
          <div className='text-black-500 text-lg mb-4'>
            {isError.msg}
          </div>
        )}
      </form>
    </section>
  );
}

export default Search;
