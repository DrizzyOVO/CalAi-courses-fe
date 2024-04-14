import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import buyCourse from "./courses/[courseId]/page"; 
import Stripe from "stripe";
import getRawBody from "raw-body";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function checkout({lineItems}){
	let stripePromise = null

	const getStripe = () => {
		if(!stripePromise) {
			stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY)
		}
		return stripePromise
	}

	const stripe = await getStripe()

	await stripe.redirectToCheckout({
		mode: 'payment',
		lineItems,
		successUrl: `${window.location.origin}/courses/1/purchased?session_id={CHECKOUT_SESSION_ID}`,
		cancelUrl: `${window.location.origin}/courses/1/failed`
	}).then(result => {
        if (result.error) {
            alert(result.error.message);
        } else if (result.successUrl) { 
            buyCourse(); 
        }
    })

    // const {paymentIntent, error} = await stripe.confirmCardPayment(clientSecret);
    // if (error) {
    //     console.log("error byuing");
    // } else if (paymentIntent && paymentIntent.status === 'succeeded') {
    //     await buyCourse(); 
    // }


}