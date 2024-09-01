import React from 'react';
import { useGlobalContext } from "./context";
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { Movies, isLoading, isError } = useGlobalContext(); // Get Movies, isLoading, and isError from context

  if (isLoading) return <div className='text-center'>Loading...</div>;
  if (isError.show) return <div className='text-center text-red-500'>{isError.msg}</div>;

  return (
    <section className='p-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
        {Movies.length > 0 ? (
          Movies.map((currMovie) => {
            const { imdbID, Title, Poster } = currMovie;
            const movieName = Title.substring(0, 15);

            return (
              <NavLink 
                key={imdbID}
                to={`/Movies/${imdbID}`}
                className='block border-red-200 shadow-lg rounded-lg overflow-hidden
                 transform hover:scale-105 transition-transform duration-300 flex flex-col items-center
                  hover:bg-red-200 transition-colors duration-300 border-4 border-transparent
                   hover:border-red-500 transition-transform transition-colors transition-border duration-300'
              >
                <img src={Poster} alt={Title} className='w-60 h-80 object-cover mt-5' />
                <div className='p-4'>
                  <h2 className='text-lg font-bold truncate text-black'>{movieName.length >= 15 ? `${movieName}...` : movieName}</h2>
                </div>
              </NavLink>
            );
          })
        ) : (
          <p className='text-center text-gray-500'>No movies available</p>
        )}
      </div>
    </section>
  );
}

export default Movies;
