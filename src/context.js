import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const AppContext = createContext();

// Default movies data
const defaultMovies = [
  {
    imdbID: 'tt0111161',
    Title: 'The Shawshank Redemption',
    Poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0068646',
    Title: 'The Godfather',
    Poster: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0071562',
    Title: 'The Godfather: Part II',
    Poster: 'https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg'
  },
  {
    imdbID: 'tt0071547',
    Title: 'Gonshchiki',
    Poster:"https://m.media-amazon.com/images/M/MV5BN2QwZjJlYmItMDcwOS00N2VkLThjN2QtYTc4ODM4ZWZmOWM0XkEyXkFqcGdeQXVyNjg3MTIwODI@._V1_SX300.jpg"
  }
];

const APP_URL = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

// Provider component
const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [Movies, setMovies] = useState(defaultMovies); // Start with default data
  const [isError, setIsError] = useState({ show: false, msg: '' });
  const [query, setQuery] = useState("");

  const getMovies = async (url) => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log("API Response:", data); // Log API response
      if (data.Response === "True") {
        setMovies(data.Search);
        setIsError({ show: false, msg: '' }); // Clear previous errors
      } else {
        setIsError({ show: true, msg: data.Error });
        setMovies([]); // Clear movies if there's an error
      }
    } catch (error) {
      console.log("Fetch Error:", error); // Log fetch error
      setIsError({ show: true, msg: 'Failed to fetch movies' });
    } finally {
      setIsLoading(false); // Ensure loading is set to false after fetching
    }
  };

  useEffect(() => {
    if (query) { // Only fetch if query is not empty
      const timerOut = setTimeout(() => {
        getMovies(`${APP_URL}&s=${query}`);
      }, 800);
      return () => clearTimeout(timerOut);
    } else {
      setMovies(defaultMovies); // Use default data if query is empty
      setIsLoading(false); // Ensure loading is false if no query
    }
  }, [query]);

  return (
    <AppContext.Provider value={{ isLoading, isError, Movies, query, setQuery, APP_URL }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
