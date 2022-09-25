import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typing'
import { BsFillPlayFill } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface props {
    netflixOrginals : Movie[]

}

function Banner({netflixOrginals} : props) {

const [movie, setmovie] = useState<Movie | null>(null)

useEffect(() => {
  setmovie(
    netflixOrginals[Math.floor(Math.random() * netflixOrginals.length)]
)
}, [])



  return (
    <div className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12'>
        <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
            <Image 
                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                layout="fill"
                objectFit='cover'
            />
        </div>
        <h1 className="text-2xl pt-16 font-bold md:text-4xl lg:text-7xl py-1">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className='max-w-xs text-xs md:text-lg lg:max-w-2xl lg:text-2xl'>
            {movie?.overview}
        </p>

        <div className='flex items-center space-x-2'>
            <button className='bannerbtn bg-white text-black'><BsFillPlayFill className='h-4 w-4 text-black md:h-7 md:w-7' /> Play</button>
            <button className='bannerbtn bg-[gray]/70'>  More info <HiOutlineInformationCircle className='h-5 w-5 md:h-7 md:w-7'/> </button>
        </div>

    </div>

  )
}

export default Banner