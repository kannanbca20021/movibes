import React, { useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Contextpage from '../Contextpage';
import { HiChevronLeft } from 'react-icons/hi';
import { getSmashystreamUrl, getSuperembedUrl, get2embedUrl } from '../movies'

const Player = () => {
  const { setHeader } = useContext(Contextpage);
  const [moviedet, setMoviedet] = useState([]);
  const { id } = useParams();

  const APIKEY = import.meta.env.VITE_API_KEY;

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
  };

  useEffect(() => {
    fetchMovie();
    setHeader('Player');
  }, []);

  document.title = `Movibess | ${moviedet.title}`;

  // Function to get streaming URL based on movie ID
  const getStreamingUrl = (id) => {
    if (id % 3 === 0) {
      return getSmashystreamUrl(id);
    } else if (id % 3 === 1) {
      return getSuperembedUrl(id);
    } else {
      return get2embedUrl(id);
    }
  };


  return (
    <>
      <button
        onClick={() => history.back()}
        className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
      >
        <HiChevronLeft />
      </button>
      <iframe
        allowFullScreen
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }}
        src={getStreamingUrl(id)}
      ></iframe>
    </>
  );
};

export default Player;
