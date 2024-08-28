// SingleMovie.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGlobalContext } from './context';

const SingleMovie = () => {
  const { id } = useParams();
  const { APP_URL } = useGlobalContext();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`${APP_URL}&i=${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const textData = await res.text();  // Get the raw response as text
        try {
          const data = JSON.parse(textData);  // Attempt to parse it as JSON
          if (data.Response === 'True') {
            setMovie(data);
            setIsError(false);
          } else {
            setIsError(true);
            console.error('Error in response:', data.Error);
          }
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError.message);
          setIsError(true);
        }
      } catch (error) {
        console.error('Error fetching movie:', error.message);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    } else {
      setMovie(null);
      setIsLoading(false);
      setIsError(false);
    }
  }, [id, APP_URL]);

  // Do not render anything if no valid id is provided
  if (!id) return null;
  
  if (isLoading) return <div className='flex items-center w-3/5 ml-80 mt-32'>Loading...</div>;
  if (isError) return <div className='flex items-center w-3/5 ml-80 mt-32'>Error loading movie data.</div>;
  if (!movie) return <div className='flex items-center w-3/5 ml-80 mt-32'>No movie found.</div>;

  return (
    <div className='flex items-start bg-red-400 w-2/4 ml-80 mt-32 rounded-lg'>
      <img src={movie.Poster} alt={movie.Title} className="w-64 h-auto rounded-lg" />

      <div className='ml-8 flex flex-col justify-center w-96'>
        <h1 className='text-3xl font-bold mb-4'>{movie.Title}</h1>
        <p className='font-serif'>{movie.Plot}</p>
        <h2 className='font-serif mt-6'>{movie.Released}</h2>
        <h2 className='font-serif'>Genre: {movie.Genre}</h2>
        <h2 className='font-serif'>Rating: {movie.imdbRating / 2}</h2>
        <h2 className='font-serif'>Type: {movie.Type}</h2>
        <h2 className='font-serif'>Director: {movie.Director}</h2>
        <h2 className='font-serif'>Actors: {movie.Actors}</h2>
      </div>
    </div>
  );
};

export default SingleMovie
