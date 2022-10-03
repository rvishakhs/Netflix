import app from "../firebase"
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";


const payments = getStripePayments(app,{
    productsCollection : 'product',
    customersCollection: 'customer',
})

const loadCheckout = async (priceId : string ) => {
    await createCheckoutSession(payments,{
        price:priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
    })
    .then((snapshot) =>window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

export {loadCheckout}
export default payments 