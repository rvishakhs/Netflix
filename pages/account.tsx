import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import moment from 'moment';
import { GetStaticProps } from 'next'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import Membership from '../components/Membership'

interface Props {
    products: Product[]
}

function Account({products}: Props ) {
    const {logout, user} = useAuth()
    const subscribed = useSubscription(user)
  return (
    <div>
        <Head>
          <title>Account | Netflix </title>
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

        <main className='mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10'>
            <div className='flex flex-col gap-x-4 md:flex-row md:items-center'>
                <h1 className='text-3xl md:text-4xl'>Account</h1>
                <div className='flex items-center space-x-1 '>
                     <img src="https://rb.gy/4vfk4r" alt="" className="h-7 w-7" />
                     <p className='font-semibold text-sm text-[#555]'>
                        Member since {moment(subscribed?.created).subtract(10, 'days').calendar()}
                     </p>
                </div>
            </div>

            <Membership />

            <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-4 md:pb-0'>
                <h4 className='text-lg font-semibold text-[gray]'>Plan details </h4>
                <div>
                    {
                    products.filter(
                        (product) => product.id === subscribed?.product
                    )[0]?.name
                    }
                </div>
                <p className='text-blue-600 hover:underline cursor-pointer md:right-1 md:text-right font-medium'>Change Plan </p>

            </div>
            <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 py-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0 md:px-4 md:pb-0'>
                <h4 className='text-lg  font-semibold text-[gray]'>Settings</h4>
                <p className='text-blue-600 hover:underline cursor-pointer md:right-1 font-medium' onClick={logout}>SignOut from all devices</p>
            </div>


        </main>
    </div>
  )
}

export default Account

export const getStaticProps: GetStaticProps = async () => {
    const products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    })
      .then((res) => res)
      .catch((error) => console.log(error.message))
  
    return {
      props: {
        products,
      },
    }
  }