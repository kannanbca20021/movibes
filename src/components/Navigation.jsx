import React,{useContext,useState} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Contextpage from '../Contextpage';
import { useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
import search from "../assets/images/search_icon.png"
import notifi from "../assets/images/notifi.png"
import { Avatar } from "flowbite-react";
import logo from "../assets/images/preloader.png"
import { AiOutlineAlignLeft } from "react-icons/ai";
import { auth } from '../../firebase';
import { toast } from "react-toastify";


const Navigation = () =>{

  const { header, user } = useContext(Contextpage);
  const [activemobile, setActivemobile] = useState(false);

  const [isSidemenuActive, setSidemenuActive] = useState(true);

  const toggleSidemenu = () => {
    setSidemenuActive(false);
  };

  const closeSidemenu = () => {
    setSidemenuActive(true);
  };

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
     <div className="w-full flex items-center justify-center">
       <div className='px-6 py-3 min-h-1 w-[75%] md:w-[97%] flex justify-between items-center fixed top-[20px] z-10 navbar_top'>
          <div className="flex gap-10 justify-start items-center">
            <div className="sm:w-[70px] w-[50px]">
              <img src={logo} alt="logo" className="w-full" />
            </div>
            <ul className="max-[950px]:hidden text-white flex gap-5">
            {Navdata.map((data) => (
                // <Link key={data.id} to={data.link}><li className={`${header == data.headername ? 'text-white' : 'text-blsck'} p-2 my-2 `} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>
                <Link key={data.id} to={data.link}><li className={`${header == data.headername ? '  active_nav' : ''} relative text-white`} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>

              ))}
            </ul>
          </div>
          <div className="cad text-white sm:hidden" onClick={toggleSidemenu}>
             <AiOutlineAlignLeft  className="w-[25px] h-[25px]"/>
          </div>
          <div className="max-[950px]:hidden flex justify-between items-center">
            <div className="relative">
                <img className="search_icon" src={search} alt="img_search"></img>
                    <input
                      type="search"
                      name="searchpanel"
                      id="searchpanel"
                      placeholder='Search for movies, TV shows...'
                      className='p-3 w-full m-1 md:w-[15rem]  lg:w-[23rem] rounded-3xl outline-none bg-stone-900 input_long border-none '
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
        <div className="sidemnu_mobile sm:hidden ">
            <div
              className={`sidemnu_goat ${isSidemenuActive ? "ryt_active" : ""}`}>
              <div className="sidemnu_x_icon" onClick={closeSidemenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7 7.00006L17 17.0001M7 17.0001L17 7.00006"
                    stroke="#292929"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="sidemnu_box">
                <div className="rytside_content">
                  <ul className="ryt_list">
                    {Navdata.map((data) => (
                  // <Link key={data.id} to={data.link}><li className={`${header == data.headername ? 'text-white' : 'text-blsck'} p-2 my-2 `} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>
                  <Link key={data.id} to={data.link}><li className={`${header == data.headername ? '  active_nav' : ''} relative text-black text-[12px]`} onClick={() => setActivemobile(!activemobile)}>{data.Name}</li></Link>

                  ))}
                  </ul>
                </div>
                <div className="relative">
                    <img className="search_icon" src={search} alt="img_search"></img>
                        <input
                          type="search"
                          name="searchpanel"
                          id="searchpanel"
                          placeholder='Search for movies, TV shows...'
                          className='sm:p-3 p-0 w-[170px] m-1 md:w-[15rem] lg:w-[23rem] rounded-3xl outline-none bg-stone-900 input_long border-none '
                          onKeyUp={(e) => handleSearch()}
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                        />
                </div>
              </div>
            </div>
          </div>
     </div>
      </>
  )

}
export default Navigation;