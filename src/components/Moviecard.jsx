import React, { useState, useEffect ,useContext} from 'react'
import { Link } from 'react-router-dom'
import noimage from '../assets/images/no-image.jpg'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { AiFillStar, AiOutlineStar} from 'react-icons/ai';
import { FaRegEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import Contextpage from '../Contextpage';
import imdb from '../assets/images/imdb.png'

function Moviecard({ movie }) {
    const { user } = useContext(Contextpage);

    const [isBookmarked, setIsBookmarked] = useState(null);
    const [releaseYear, setReleaseYear] = useState('');

    useEffect(() => {
        if (localStorage.getItem(movie.id)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [movie.id]);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const APIKEY = import.meta.env.VITE_API_KEY;
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${APIKEY}&language=en-US`
                );
                if (response.ok) {
                    const data = await response.json();
                    const releaseDate = data.release_date;
                    const year = new Date(releaseDate).getFullYear();
                    setReleaseYear(year);
                } else {
                    console.error('Failed to fetch movie details:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }

        fetchMovieDetails();
    }, [movie.id]);

    const BookmarkMovie = () => {
        if (!user) {
            toast.info("To bookmark this movie, please log in.");
        } else {
            setIsBookmarked(!isBookmarked)
            if (isBookmarked) {
                localStorage.removeItem(movie.id);
            } else {
                localStorage.setItem(movie.id, JSON.stringify(movie));
            }
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            layout
            className="card relative max-[500px]:w-[40%] w-full md:w-60 my-3 mx-4 md:my-5 md:mx-0 cursor-pointer">
            
            <Link to={`/moviedetail/${movie.id}`}>
                <div className='md:h-[360px]'>    
                    <div>
                        {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
                            <LazyLoadImage effect='blur' className='img object-cover rounded-2xl hover:rounded-2xl overflow-hidden'  src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
                    </div>
                </div>
            </Link>

            <div className=''>
                <div className='bottom-0 w-full flex justify-start items-start py-3 z-20 font flex-col'>
                    <p className='text-white text-xl font-bold title'>{movie.title || movie.name}</p>
                    <p className='text-[#AFAFAF] text-xl font-semibold break-normal break-words title'>{releaseYear}</p>
                </div>
                <div className='flex justify-between items-start'>
                    <div className='flex gap-3 items-center justify-start'>
                        
                       <div className='w-10'>
                        <img src={imdb} className="w-full" alt="imdb"></img>
                       </div>
                       <h1 className="font-bold from-stone-50 text-base text-[#FFC907]">
                         {(movie.vote_average || 0).toFixed(1)}
                        </h1>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <Link to={`/moviedetail/${movie.id}`}>
                            <div className='w-7 svg_eye text-white'>
                                <FaRegEye />
                            </div>
                        </Link>
                        <button className=" text-white z-20 right-0 text-xl" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar  /> : <AiOutlineStar/>}</button>
                    </div>
                </div>
            </div>
        </motion.div>
        // <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 1 }}
        // layout
        // className="card relative w-full md:w-60 h-[410px] md:h-[360px] my-3 mx-4 md:my-5 md:mx-0 cursor-pointer rounded-xl overflow-hidden">
        
        // {/* bookmark buttons */}
        // <button className="absolute bg-white text-black p-2 z-20 right-0 m-3 rounded-full text-xl" onClick={BookmarkMovie}> {isBookmarked ? <AiFillStar  /> : <AiOutlineStar/>}</button>

        
        // <div className='absolute bottom-0 w-full flex justify-between items-end p-3 z-20 font'>
        //     <h1 className='text-white text-xl font-semibold  break-normal break-words'>{movie.title || movie.name}</h1>

        //     {(movie.vote_average||0) > 7 ? <h1 className='font-bold text-green-500 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : (movie.vote_average||0) > 5.5 ? <h1 className='font-bold text-orange-400 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1> : <h1 className='font-bold text-red-600 p-2 bg-zinc-900 rounded-full'>{(movie.vote_average||0).toFixed(1)}</h1>}
        // </div>

        // <Link to={`/moviedetail/${movie.id}`} className='h-full w-full shadow absolute z-10'></Link>

        // <div>
        //     {movie.poster_path === null ? <img className='img object-cover' src={noimage} /> :
        //         <LazyLoadImage effect='blur' className='img object-cover' src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} />}
        // </div>
        // </motion.div>               
    )
}

export default Moviecard
