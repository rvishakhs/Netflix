import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import useAuth from '../hooks/UseAuth';

type Inputs = {
    email: string,
    password: string,
  };

function login() {

    const [login, setLogin ] =  useState(false)
    const {signIn, signUp} = useAuth()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async ({email, password}) => {
        if(login){
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    } 

  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md: items-center md:justify-center md:bg-transparent'>
        <Head>
        <title>Netflix </title>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/netflix-3521600-2945044.png" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

        <img 
            className='cursor-pointer object-contain absolute left-4 top-4 md:left-12 md:top-10'
            width={150}
            height={150}
            src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png'
            alt=''
        />

        <form onSubmit={handleSubmit(onSubmit)} className='relative mt-24 ml-5 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'>
            <h1 className='text-xl font-bold font-sans'>Sign in</h1>
            <div className='space-y-6'>
                <label className='inline-block w-full'>
                    <input type="email" placeholder='Email'className='input' {...register("email" , {required:true})}/> 
                    {errors.email && <p className='font-bold text-red-600 p-1 text-[13px] '>Please enter an email id</p>}
                </label>
                <label className='inline-block w-full'>
                    <input type="password" placeholder='Password'className='input' {...register("password" , {required:true})}/>
                    {errors.password && <p className='font-bold text-red-600 p-1 text-[13px] '>Please enter a password contains 4 to 16 character </p>}
                </label>
            </div>

          <button className='w-full rounded bg-[#e50914] py-2 font-semibold'>Sign in </button>
            <div className='flex space-x-1'>
                <h5 className='text-[gray] font-medium'>{`New to Netflix?`}</h5> 
                <button className='text-white hover:underline'>
                     Sign up now
                </button>
            </div>
        </form>
    </div>
  )
}

export default login