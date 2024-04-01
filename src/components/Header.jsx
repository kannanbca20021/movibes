import React, { useContext, useEffect, useState } from 'react';
import Contextpage from '../Contextpage';
import { Carousel } from "flowbite-react";

function Header() {
  const { header, backgenre } = useContext(Contextpage);
  const [movieImages, setMovieImages] = useState([]);

  useEffect(() => {
    async function fetchMovieImages() {
      try {
        const APIKEY = import.meta.env.VITE_API_KEY;
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=en-US`
        );
        if (response.ok) {
          const data = await response.json();
          const banners = data.results.slice(0, 5).map(movie => {
            return {
              image: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
              title: movie.title,
              id: movie.id // Optionally, you can include movie id for further details
            };
          });
          setMovieImages(banners);
        } else {
          console.error('Failed to fetch movie images:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie images:', error);
      }
    }

    fetchMovieImages();
  }, []);

  return (
    <>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
        <Carousel>
          {movieImages.map((movie, index) => (
            <div key={index} className="relative">
              <img src={movie.image} alt={`Movie ${index}`} className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute top-0 right-0 mt-2 mr-2">
                <button className="bg-blue-500 text-white rounded-full p-2">Play</button>
              </div>
              <div className="absolute bottom-0 left-0 mb-2 ml-2 text-white">
                <p>{movie.title}</p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Header;
