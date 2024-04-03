import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Contextpage from "../Contextpage";
import { HiChevronLeft } from "react-icons/hi";
import noimage from "../assets/images/movies.jpg";
import { FaPlay } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import slugify from "react-slugify";
import imdb from '../assets/images/imdb.png'
import Navigation from "./Navigation"

export const Detail = () => {
  const APIKEY = import.meta.env.VITE_API_KEY;

  const { loader, setLoader } = useContext(Contextpage);

  const { id } = useParams();

  const [moviedet, setMoviedet] = useState([]);
  const [castdata, setCastdata] = useState([]);
  const [moviegenres, setMoviegenres] = useState([]);
  const [video, setVideo] = useState([]);
  const [releaseDate, setReleaseDate] = useState({});

  const fetchMovie = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=en-US`
    );
    const moviedetail = await data.json();
    setMoviedet(moviedetail);
    setMoviegenres(moviedetail.genres);
    setLoader(false);
  };

  const fetchCast = async () => {
    const castdata = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language=en-US`
    );
    const castdetail = await castdata.json();
    setCastdata(castdetail.cast);
    setLoader(false);
  };

  const fetchVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=en-US`
    );
    const videodata = await data.json();
    setVideo(videodata.results);
  };

  useEffect(() => {
    fetchMovie();
    fetchCast();
    fetchVideo();
  }, []);

  useEffect(() => {
    if (moviedet.release_date) {
      const date = new Date(moviedet.release_date);
      const day = date.getDate();
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        date
      );
      const year = date.getFullYear();
      setReleaseDate({ day, month, year });
    }
  }, [moviedet.release_date]);

  return (
    <>
      {loader ? (
        <div className="h-screen w-full flex justify-center items-center">
          <span className="loader m-10"></span>
        </div>
      ) : (
        <>
        <Navigation />
          <Link
            to="/"
            className="fixed z-10 text-4xl text-black bg-white m-3 md:m-5 rounded-full"
          >
            <HiChevronLeft />
          </Link>

          <div className="w-full h-full py-[150px]">
            <div className="movie-card">
              <div className="poster-wrapper">
                <div className="poster h-[600px]">
                  {moviedet && moviedet?.backdrop_path === null ? (
                    <img src={noimage} className="w-full object-contain" alt="Movie Poster" />
                  ) : (
                    <img
                      src={
                        "https://image.tmdb.org/t/p/original/" +
                        moviedet.backdrop_path
                      }
                      className="w-full object-cover h-full"
                      alt="Movie Poster"
                    />
                  )}
                  <div className="release-date">
                      <h2 className="font-bold">{releaseDate.day}</h2>
                      <div className="divider"></div>
                      <p>{releaseDate.month ? `${releaseDate.month.toUpperCase()} ${releaseDate.year}` : ''}</p>
                  </div>
                    <Link to={`/player/${id}/${slugify(moviedet.title)}`} className='btn-play'>
                      <FaPlay />
                    </Link>
                </div>
              </div>

              <div className="movie-info">
                <div className="header-section">
                  <h2 className="text-white text-[30px]">{moviedet?.title}</h2>
                  <p className="my-2 text-[16px] text-[#59d8b4]">{moviedet && moviedet?.genres?.map(genre => genre.name).join(" / ")} / {moviedet?.original_language?.toUpperCase()} / {new Date(moviedet?.release_date).getFullYear()} / {Math.floor(moviedet?.runtime / 60)}h{moviedet?.runtime % 60}m</p>
                </div>
                <div className='flex gap-3 items-center justify-start min-h-[60px]'>
                    <div className='w-10'><img src={imdb} className="w-full" alt="imdb"></img></div>
                    <h1 className="font-bold from-stone-50 text-base text-[#FFC907]">
                        {(moviedet.vote_average || 0).toFixed(1)}
                    </h1>
                </div>

                <div className="cast-section min-h-[130px]">
                  <h3 className="text-white text-[20px] my-3">The Cast</h3>
                  <div className="casts">
                  {castdata && castdata?.map((cast, index) => (
                      cast.profile_path !== null ? (
                        <img key={index} src={"https://image.tmdb.org/t/p/w500" + cast.profile_path} alt={`Cast ${index}`} />
                      ) : null
                    ))}
                  </div>
                </div>
                <div className="synopsis-section">
                  <h3 className="text-[#59d8b4] text-[20px]">Overview</h3>
                  <p className="text-white">
                  {moviedet.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};


