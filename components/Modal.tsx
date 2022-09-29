import React, {useEffect, useState} from 'react'
import MuiModal from "@mui/material/Modal"
import {
    useRecoilState,
  } from 'recoil';
  import { modalState, movieState } from '../atom/modalatom'
  import { GrFormClose } from "react-icons/gr";
import { log } from 'console';
import { Element, Genre } from '../typing';
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import { BsHandThumbsUp } from "react-icons/bs";



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
                    <GrFormClose className="h-8 w-8 text-white " />
            </button>
            <div className='relative pt-[56.25%]'>
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
                        <button className='flex items-center gap-x-2 rounded bg-white px-8 py-2 text-xl font-bold text-black transition hover:bg-[#e6e6e6]'>
                            <FaPlay className='h-5 w-5 text-black' />
                                Play
                        </button>
                        <button className='modalbtn'>
                            <AiOutlinePlus className='h-6 w-6'/>
                        </button>
                        <button className='modalbtn'>
                            <BsHandThumbsUp className='h-6 w-6'/>
                        </button>
                    </div>
                    <div>
                        <button className='modalbtn'>
                            <BsHandThumbsUp className='h-6 w-6'/>
                        </button>
                    </div>
            </div>
            </div>

            
        </>
        </MuiModal>
  )
}

export default Modal