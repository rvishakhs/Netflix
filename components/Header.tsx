import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { BsSearch, BsBellFill } from "react-icons/bs";
import useAuth from '../hooks/useAuth';

function Header() {

    const [isScrolled, setIsScrolled] = useState(false)
    const {logout} = useAuth()

    useEffect(() => {

        const handleScroll = () => {
               if(window.scrollY > 0){
                setIsScrolled(true)
               } else {
                setIsScrolled(false)
               }
        }

        window.addEventListener("scroll", handleScroll)

        return  ()=> {
            window.removeEventListener("scroll", handleScroll)
        }

    },[])

    

  return (
    <header className={`${isScrolled && "bg-black shadow-lg" }`}>
        <div className='flex items-center space-x-2 md:space-x-10  '> 
            <img 
                className='cursor-pointer object-contain'
                width={100}
                height={100}
                src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                alt=''
            />
            <ul className='hidden md:flex items-center space-x-3 '>
                <li className='headerlinks'>Home</li>
                <li className='headerlinks'>Tv shows </li>
                <li className='headerlinks'>Movies</li>
                <li className='headerlinks'>New & Popular</li>
                <li className='headerlinks'>My list</li>
            </ul>
        </div>

        <div className='flex space-x-4 text-white font-semibold items-center cursor-pointer '>
            <BsSearch className='text-white/80 text-2xl hover:scale-105 hover:text-white/100' />
            <p className='hidden lg:inline'>Kids</p>
            <BsBellFill className='text-white/80 text-2xl hover:scale-105 hover:text-white/100'/>
            {/* <Link href="/account"> */}
                <img
                    src='https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'
                    alt=''
                    width={35}
                    height={35}
                    className="cursor-pointer hover:scale-105 object-contain rounded"
                    onClick={logout}
                />
            {/* </Link> */}
        </div>
    </header>
  )
}

export default Header