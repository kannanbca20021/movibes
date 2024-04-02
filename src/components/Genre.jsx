import React, { useEffect, useContext } from 'react';
import Contextpage from '../Contextpage';
import { Helmet } from "react-helmet";

function Genre() {
    const { fetchGenre, activegenre, setActiveGenre, genres } = useContext(Contextpage);

    useEffect(() => {
        fetchGenre();  // Fetching Genres on Initial Render.
    }, []);

    return (
        <>
            <Helmet>
                <title>Movibes | Genres</title>
            </Helmet>

            <div className='flex justify-center px-2'>
                <select
                    value={activegenre}
                    onChange={(e) => setActiveGenre(Number(e.target.value))}
                    className='relative py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-[#ecfef8] rounded-xl transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-black hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0'
                >
                    <option value={0}>All Genres</option>
                    {genres.map((genre) => (
                        <option value={genre.id} key={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
        </>
    );
}

export default Genre;
