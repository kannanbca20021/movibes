import React, { useEffect, useContext } from 'react'
import Contextpage from '../Contextpage';
import Moviecard from '../components/Moviecard';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
// import { Pagebtn } from '../components/Pagebtn';
import { Helmet } from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroll-component';
import Navigation from '../components/Navigation';

function Trending() {

    const { loader, page, setPage, fetchTrending, trending, totalPage } = useContext(Contextpage);

    useEffect(() => {
        setPage(1) // Reset Page to 1 on initial render.
    }, []);

    useEffect(() => {
        if (page > 0) {
            fetchTrending();
        }
    }, [page])


    return (
        <>
            <Helmet>
                <title>Movibess | Trending</title>
            </Helmet>

            <div className='w-full bg-black md:px-8 md:py-5 mb-20 md:mb-0'>
                <Navigation />
                <Header />
                <motion.div
                    layout
                    className="flex flex-wrap relative justify-evenly md:justify-around">
                    <AnimatePresence>
                        {
                            loader ? <span className="loader m-10"></span> :
                                <>
                                    <div className='w-full'>
                                        <div className='w-full header flex justify-between items-center my-3 py-2 px-3'>
                                            <p className='text-white text-[25px] font-semibold'>Trending</p>
                                        </div>
                                        <InfiniteScroll
                                            className="w-full md:p-2 flex flex-wrap relative justify-evenly md:justify-around"
                                            dataLength={trending.length} //This is important field to render the next data
                                            next={() => setPage(page + 1)}
                                            hasMore={page < totalPage}
                                            loader={<span className="loader m-10"></span>}
                                            scrollThreshol={0.9}
                                            style={{ overflow: 'hidden' }}
                                        >
    
                                            {trending.map((tred) => (
                                                <Moviecard key={tred.id} movie={tred} />
                                            ))}
    
                                        </InfiniteScroll>
                                    </div>

                                </>
                        }
                    </AnimatePresence>
                </motion.div>
                {/* <Pagebtn /> */}

            </div>
        </>
    )
}

export default Trending