import Image from 'next/image'
import React from 'react'
import { modalState, movieState } from '../atom/modalatom'
import {
  useRecoilState,
} from 'recoil';
import { Movie } from '../typing'
import { DocumentData } from 'firebase/firestore';
interface Props{
    movie: Movie | DocumentData
}

function Thumbnail({movie}: Props) {

  
  const [modalstate, setModalState] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  return (
    <div className='h-28 min-w-[188px] relative transition duration-200 ease-out md:h-36 md:min-w[260px] md:hover:scale-105'
    onClick={() => {
      setModalState(true)
      setCurrentMovie(movie)
  }}
    >
        <Image
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
            className="rounded-sm object-cover md:rounded"
            layout="fill"
        />
    </div>
  )
}

export default Thumbnail