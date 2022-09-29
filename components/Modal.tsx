import React, {useEffect, useState} from 'react'
import MuiModal from "@mui/material/Modal"
import {
    useRecoilState,
  } from 'recoil';
  import { modalState, movieState } from '../atom/modalatom'
  import { GrFormClose } from "react-icons/gr";
import { log } from 'console';


function Modal() {
    const [modalstate, setModalState] = useRecoilState(modalState)
    const [movie, setMovie] = useRecoilState(movieState)
    const [data, setdata] = useState()

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
          setdata(data)
     
      }

      fetchMovie()
    }, [movie])

    console.log(data);
    
    
  return (
    <MuiModal 
        open={modalstate} 
        onClose={handleclick} 
    >
        <>
            <button 
                className='modalbtn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]'
                onClick={handleclick}
            >
                    <GrFormClose className="h-9 w-9 " />
            </button>
        </>
        </MuiModal>
  )
}

export default Modal