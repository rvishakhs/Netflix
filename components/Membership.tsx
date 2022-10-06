import moment from 'moment';
import React,  {useState} from 'react'
import useAuth from '../hooks/useAuth';
import useSubscription from '../hooks/useSubscription';
import { goToBillingPortal } from '../lib/stripe';
import Loader from './Loader';

function Membership() {

    const {logout, user} = useAuth()
    const subscribed = useSubscription(user) 
    const [isBilling, setBilling ] = useState(false)

    const managesubscription = () => {
        if(subscribed){
            setBilling(true)
            goToBillingPortal()
        }

    }

  return (
    <div className='mt-6 grid grid-cols-1 gap-x-4 border px-4 md:grid-cols-4 md:border-x-0 md:border-t md:border-b-0'>
        <div className='space-y-2 py-4'>
            <h4 className='text-lg  font-semibold text-[gray]'>Membership & Billing </h4>
            <button 
                disabled={isBilling || !subscribed}
                className='h-10 w-3/5 whitespace-nowrap bg-gray-300 py-2 text-sm font-medium 
                text-black shadow-md hover:bg-gray-200 md:w-4/5 '
                onClick={managesubscription}
            >
                {isBilling ? (
                    <Loader color="dark:fill-[#e50914]"  /> 
                ): ("Cancel Membership ")}
                   
            </button>
        </div>

        <div className='col-span-3 '>
            <div className='flex flex-col gap-y-2 md:flex-row justify-between py-2 px-2 border-b border-white/10'>
                <div className=''>
                    <p className='font-medium '>{user?.email}</p>
                    <p className='font-medium text-[gray]'>Password : ************</p>
                </div>  
                <div className='md:text-right'>
                    <p className='font-medium text-blue-600 cursor-pointer hover:underline text-sm'>Change Email</p>
                    <p className='font-medium text-blue-600 cursor-pointer hover:underline text-sm'>Change password</p>
                </div> 
            </div>

            <div className='lex flex-col gap-y-2 md:flex-row justify-between py-2 px-2 '>
                <div className=''>
                    <p className='font-medium text-sm'>{subscribed?.cancel_at_period_end ? "Your membership will end on " : "Your next billing date is "}
                    {moment(subscribed?.current_period_end).subtract(10, 'days').calendar()}
                   </p>
                </div>

                <div className="md:text-right">
                    <p className="font-medium text-blue-600 cursor-pointer hover:underline text-sm">Manage payment info</p>
                    <p className="font-medium text-blue-600 cursor-pointer hover:underline text-sm">Add backup payment method</p>
                    <p className="font-medium text-blue-600 cursor-pointer hover:underline text-sm">Billing Details</p>
                    <p className="font-medium text-blue-600 cursor-pointer hover:underline text-sm">Change billing day</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Membership
