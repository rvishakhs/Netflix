import React, {useEffect, useState} from 'react'
import MuiModal from "@mui/material/Modal"
import {
    useRecoilState,
  } from 'recoil';
  import { modalState, movieState } from '../atom/modalatom'
import { MdClose } from "react-icons/md";
import { log } from 'console';
import { Element, Genre } from '../typing';
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";
import { GoMute } from "react-icons/go";
import { BsFillVolumeUpFill } from "react-icons/bs";



function Modal() {
    const [modalstate, setModalState] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [data, setdata] = useState()
    const [genres, setgenres] = useState<Genre[]>([])
    const [trailer, setTrailer] = useState("")
    const [muted, setMuted] = useState(false)

    const handleclick = () => {
        setModalState(false)
    }


    useEffect(() => {
      if(!movie) return

      async function fetchMovie(){
        const data = await fetch(
            `https://api.themoviedb.org/3/${
              movie?.media_type === 'tv' ? 'tv' : 'movie'
            }/${movie?.id}?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }&language=en-US&append_to_response=videos`
          ).then((response) => response.json())
            if(data?.videos) {
                const index = data.videos.results.findIndex(
                    (element : Element) => element.type === "Trailer" 
                )
                setTrailer(data.videos?.results[index]?.key)
            }

            if(data?.genres){
                setgenres(data.genres)
            }
     
      }

      fetchMovie()
    }, [movie])

    console.log(trailer);
    
    
  return (
    <MuiModal 
        open={modalstate} 
        onClose={handleclick} 
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
        <>
            <button 
                className='modalbtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818] hover:scale-105'
                onClick={handleclick}
            >
                    <MdClose className="h-8 w-8 text-white " />
            </button>
            <div className='relative pt-[60.25%] md:pt-[56.25%] lg:pt-[40.25%]'>
                <ReactPlayer 
                    url={`https://www.youtube.com/watch?v=${trailer}`} 
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: '0', left: '0' }}
                    playing
                    muted={muted}
                />
                <div className='absolute bottom-10 flex w-full items-center justify-between px-10'>
                    <div className='flex space-x-2'>
                        <button className='flex items-center gap-x-2 rounded bg-white px-4 py-1 text-sm md:px-8 md:py-2 md:text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                            <FaPlay className='h-3 w-3 md:h-5 md:w-5 text-black' />
                                Play
                        </button>
                        <button className='modalbtn'>
                            <AiOutlinePlus className=' h-4 w-4 md:h-6 md:w-6'/>
                        </button>
                        <button className='modalbtn'>
                            <BsHandThumbsUp className='h-[14px] w-[14px]  md:h-6 md:w-6'/>
                        </button>
                    </div>
                    <div  onClick={() => {
                        setMuted(!muted)
                    }}>
                    {  muted ?   <button className='modalbtn'>
                            <GoMute className='h-4 w-4 md:h-6 md:w-6'/>
                        </button> :  <button className='modalbtn'>
                            <BsFillVolumeUpFill className='h-4 w-4 md:h-6 md:w-6'/>
                        </button> }
                    </div>
            </div>
            </div>

            <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-6'>
                <div className='space-y-4  text-lg'>
                    <div className="flex items-center space-x-3 text-sm ">
                        <p className='font-semibold text-green-400'>
                            {movie!.vote_average * 10}% Match 
                        </p>
                        <p className='font-light'>
                            {movie?.release_date || movie?.first_air_date}
                        </p>
                        <div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs '>
                            HD
                        </div>
                    </div>
                    <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
                        <p className='w-4/5 trancate line-clamp-3 md:line-clamp-5 text-clip' >{movie?.overview}</p>
                        <div className='flex flex-col space-y-3 text-sm'>
                            <div >
                                <span className='text-[gray]'>Genres: </span>
                                {genres.map((genres) => genres.name).join (', ')}
                            </div>

                            <div className='font-semibold text-white' >
                                <span className='text-[gray]'>Orginal language: </span>
                                {movie?.original_language}
                            </div>

                            <div >
                                <span className='text-[gray]'>Total Votes: </span>
                                {movie?.vote_count}
                            </div>


                        </div>
                    </div>
                </div>
            </div>

            
        </>
        </MuiModal>
  )
}

export default Modal