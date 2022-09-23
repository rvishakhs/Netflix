import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../constants/movie'
import { Movie } from '../typing'

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
    <div>
        <div className='absolute top-0 left-0 -z-10 h-[95vh] w-screen'>
            <Image 
                src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
                layout="fill"
                objectFit='cover'
            />
        </div>
    </div>
  )
}

export default Banner