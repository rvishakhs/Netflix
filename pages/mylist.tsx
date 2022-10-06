import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import useList from '../hooks/useList'
import { modalState, movieState } from '../atom/modalatom'
import Modal from '../components/Modal'

function mylist() {
    const {loading, user} = useAuth()
    const [movie, setMovie] = useRecoilState(movieState)
    const list = useList(user?.uid)
    
    
  return (
    <div>
        <Head>
          <title>My list </title>
          <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/netflix-3521600-2945044.png" />
        </Head>
        <header className='bg-[#141414]'>  
            <Link href ="/">
                <img 
                    className='cursor-pointer object-contain'
                    width={100}
                    height={100}
                    src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                    alt=''
                />
            </Link>

            <Link href ="/account">
                <img
                    src='https://ih0.redbubble.net/image.618427277.3222/flat,1000x1000,075,f.u2.jpg'
                    alt=''
                    width={35}
                    height={35}
                    className="cursor-pointer hover:scale-105 object-contain rounded"
                />
            </Link>
        </header>
        <main>
            <div className='pt-24 px-10 '>
                <div className='text-gray'>
                {list.length > 0 && 
                    <Row tittle='My List' movies={list} />
                }
                </div>
            </div>

            {modalState && <Modal />}
        </main>
    </div>
  )
}

export default mylist