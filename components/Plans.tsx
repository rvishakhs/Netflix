import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { BiCheck } from "react-icons/bi";


function Plans() {
    const {logout} = useAuth()
  return (
    <div>
        <Head>
          <title>Netflix </title>
          <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/netflix-3521600-2945044.png" />
        </Head>

        <header className='border-b border-white/10 bg-[#141414]'>
            <img 
                className='cursor-pointer object-contain'
                width={130}
                height={70}
                src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
                alt=''
            />

            <Link href="/">
                <button
                    className="text-base font-medium hover:underline mr-2"
                    onClick={logout}
                    >
                    Sign Out
                </button>
            </Link>
        </header>

        <main className='max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10 '>
            <h1 className='mb-3 md:text-3xl md:font-medium text-xl font-normal'>Choose the plan that's right for you </h1>
            <ul>
                <li className='flex items-center gap-x-2 text-lg'>
                    <BiCheck className='h-7 w-7 text-[#E50914]'/>
                    Watch all you want Ad-free
                </li>
                <li className='flex items-center gap-x-2 text-lg'>
                    <BiCheck className='h-7 w-7 text-[#E50914]'/>
                    Recommendations 
                </li>
                <li className='flex items-center gap-x-2 text-lg'>
                    <BiCheck className='h-7 w-7 text-[#E50914]'/>
                    Cancel your plan anytime 
                </li>
            </ul>
            <div className='mt-4 flex flex-col space-y-4'>
                <div className='flex w-full items-center justify-center self-end md:w-3/5'>
                    <div className='planbox'>Standard</div>
                    <div className='planbox'>Premium</div>
                    <div className='planbox'>Ultra</div>
                </div>
            </div>

        </main>
    </div>
  )
}

export default Plans