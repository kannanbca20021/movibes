import React,{useContext,useState} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
import search from "../assets/images/search_icon.png"
import notifi from "../assets/images/notifi.png"
import { Avatar } from "flowbite-react";
import logo from "../assets/images/logo_new.png"
import { auth } from '../../firebase';
import { toast } from "react-toastify";

const Navigation = () =>{

  const { header, user } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);

  // console.log(user)
  const Navdata = [
      {
          id: 1,
          headername: "Genres",
          Name: "Genres",
          link : "/"
      },
      {
          id: 2,
          headername: "Trending Movies",
          Name: "Trending",
          link:"/trending"
      },
      {
          id: 3,
          headername: "Upcoming Movies",
          Name: "Upcoming",
          link:"/upcoming"
      },
      {
          id: 4,
          headername: "Favorite Movies",
          Name: "Favorites",
          link:"/favorite"
      }
  ]
    const { filteredGenre, fetchSearch, setBackGenre, setGenres } = useContext(Contextpage);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleSearch = () => {
      // Clear the previous timeout to prevent premature execution
      if (typingTimeout) {
          clearTimeout(typingTimeout);
      }

      // Set a new timeout
      const newTimeout = setTimeout(() => {
          onKeyUp(value);
      }, 500); // Adjust the timeout duration as needed (in milliseconds)

      setTypingTimeout(newTimeout);
  };

  const onKeyUp = (query) => {
    // console.log(query)
    if (query !== "") {
        query = query.trim();

      if (query === "") {
        navigate("/");
      } else {
        navigate(`/search/${slugify(query)}`)
      }
    }
  };

  return(
    <>
    <Helmet>
        <title>Movibes</title>
    </Helmet>
     <div className='px-8 py-5 h-full min-h-1 w-full flex justify-between items-center '>
        <div className="flex gap-3 justify-start items-center">
          <div className="w-full">
            <img src={logo} alt="logo" className="w-24" />
          </div>
          <ul className="text-white flex gap-5">
          {Navdata.map((data) => (
                            <Link key={data.id} to={data.link}><li className={`${header == data.headername ? 'text-white' : ''} p-2 my-2  hover:bg-blue-500/20 rounded-[5px] border-2 hover:border-blue-600`} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>
            ))}
            <li className="text-base">Home</li>
            <li className="text-base">Trending</li>
            <li className="text-base">Upcoming</li>
            <li className="text-base">Favorites</li>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <div className="relative">
              <img className="search_icon" src={search} alt="img_search"></img>
                  <input
                    type="search"
                    name="searchpanel"
                    id="searchpanel"
                    placeholder='Search for movies, TV shows...'
                    className='p-3 w-full m-1 md:w-[40rem] rounded-3xl outline-none bg-stone-900 input_long border-none '
                    onKeyUp={(e) => handleSearch()}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
          </div>
          <div className="flex gap-3">
              <div className="w-12 h-12">
                  <img src={notifi} className="w-full" alt="notification"></img>
              </div>
              <div className="w-12 h-12">
              <Avatar rounded />
              </div>
          </div>
        </div>
      </div>
      </>
  )

}
export default Navigation;