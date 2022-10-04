import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import useAuth from '../hooks/useAuth'
import { BiCheck } from "react-icons/bi";
import { Product } from '@stripe/firestore-stripe-payments';
import Table from './Table';
import Loader from './Loader';
import { loadCheckout } from '../lib/stripe';

interface Props{
    products: Product[]
}


function Plans({products} : Props) {
    const {logout, user} = useAuth()
    const [selectedPlan, SetSelectedPlan] = React.useState<Product | null>(products[2])
    const [isBillingLoading, setBillingLoading] = React.useState(false)

    const subscribeToPlan = () => {

        if(!user) return
        loadCheckout(selectedPlan?.prices[0].id!)
        setBillingLoading(true)
    }



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

        <main className='max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10 mx-auto'>
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
                    {products.map(products => (
                      <div key={products.id} className={`planbox ${selectedPlan?.id === products.id ? "opacity-100" : "opacity-60"}`}
                        onClick={() => SetSelectedPlan(products)}
                      >
                        {products.name}
                      </div> 
                    ))}
                </div>

                <Table products={products} selectedPlan={selectedPlan} />

                <button 
                    className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d1] md:w-4/12${isBillingLoading && 'opacity-60'}`}
                    onClick={subscribeToPlan}
                >
                    {isBillingLoading ? (
                       <Loader color="dark:fill-gray-300"  />     
                    ) : (
                        "Subscribe"
                    )}

                </button>
            </div>

        </main>
    </div>
  )
}

export default Plans