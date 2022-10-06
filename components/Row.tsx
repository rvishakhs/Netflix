import React, { useRef, useState } from 'react'
import { Movie } from '../typing'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import Thumbnail from './Thumbnail';
import { DocumentData } from 'firebase/firestore';

interface props{
    tittle: string
    movies: Movie[] | DocumentData[]
}

function Row({tittle, movies}:props) {

    const [ismoved, setIsMoved] = useState(false)
    const rowRef = useRef<HTMLDivElement>(null)    

    const handleClick = (direction: string) => {
        
        setIsMoved(true)
        if (rowRef.current) {
          const { scrollLeft, clientWidth } = rowRef.current
    
          const scrollTo =
            direction === 'left'
              ? scrollLeft - clientWidth
              : scrollLeft + clientWidth
          rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
      }

  return (  
    <div className='h-40 space-y-0.5 md:space-y-2'>
        <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl'>{tittle}</h2>
        <div className=' group relative md:-ml-2'>
        <HiOutlineChevronLeft className={`h-9 absolute w-9 top-0 bottom-0 left-2 z-40 cursor-pointer m-auto opacity-0 group-hover:opacity-100 
        transition hover:scale-125 ${!ismoved && 'hidden'} `}  onClick={() => handleClick("left")} />
            <div className='flex items-center space-x-1 scrollbar-hide overflow-x-scroll md:space-x-2 '>
                {movies.map((movie) => (
                    <Thumbnail key={movie.id} movie={movie} />
                ))}
            </div>
        <HiOutlineChevronRight className='h-9 absolute w-9 top-0 bottom-0 right-2 z-40 cursor-pointer opacity-0 group-hover:opacity-100 
        transition m-auto hover:scale-125' onClick={() => handleClick("right")}/>
        </div>
    </div>
  )
}

export default Row









// import React, { useRef, useState } from 'react'
// import { Movie } from '../typing'
// import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
// import Image from 'next/image';
// import Thumbnail from './Thumbnail';

// interface props{
//     tittle: string
//     movies: Movie[]
// }

// function Row({tittle, movies}:props) {

//     const [ismoved, setIsMoved] = useState(false)
//     const rowRef = useRef<HTMLDivElement>(null)


//     const handleClick = (direction: string) => {

//         console.log(direction);
        
//         setIsMoved(true)
//         if (rowRef.current) {
//           const { scrollLeft, clientWidth } = rowRef.current
    
//           const scrollTo =
//             direction === 'left'
//               ? scrollLeft - clientWidth
//               : scrollLeft + clientWidth
//           rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
//         }
//       }




//   return (  
//     <div className='h-40 space-y-0.5 md:space-y-2'>
//         <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-xl'>{tittle}</h2>
//         <div className=' group relative md:-ml-2'>
//         <HiOutlineChevronLeft className={`h-9 absolute w-9 top-0 bottom-0 left-2 z-40 cursor-pointer m-auto opacity-0 group-hover:opacity-100 
//         transition hover:scale-125 ${!ismoved && 'hidden'} `}  onClick={() => handleClick("left")} />
//             <div className='flex items-center space-x-1 scrollbar-hide overflow-x-scroll md:space-x-2 '>
//                 {movies.map((movie) => (
//                     <Thumbnail key={movie.id} movie={movie} />
//                 ))}
//             </div>
//         <HiOutlineChevronRight className='h-9 absolute w-9 top-0 bottom-0 right-2 z-40 cursor-pointer opacity-0 group-hover:opacity-100 
//         transition m-auto hover:scale-125' onClick={() => handleClick("right")}/>
//         </div>
//     </div>
//   )
// }

// export default Row