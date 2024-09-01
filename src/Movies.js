import React from 'react';
import { useGlobalContext } from "./context";
import { NavLink } from 'react-router-dom';

const Movies = () => {
  const { Movies } = useGlobalContext();

  return (
    <section className='p-4 '>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
        {Movies.map((currMovie) => {
          const { imdbID, Title, Poster } = currMovie;
          const movieName=Title.substring(0,15)
          // const movieName = Title.length > 15 ? `${Title.substring(0, 15)}...` : Title;

          return (
            <NavLink 
              key={imdbID}
              to={`/Movies/${imdbID}`} // Correctly using backticks for template literals
              className='block border-red-200 shadow-lg rounded-lg overflow-hidden
               transform hover:scale-105 transition-transform duration-300 flex flex-col items-center
                hover:bg-red-200 transition-colors duration-300  border-4 border-transparent
                 hover:border-red-500 transition-transform transition-colors transition-border duration-300'

            >
              <img src={Poster} alt={Title} className='w-60 h-80 object-cover mt-5' />
              <div className='p-4'>
                <h2 className='text-lg font-bold truncate text-black'>{movieName.length>=15 ?`${movieName}...`:movieName}</h2>
              </div>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}

export default Movies;
