"use client";

import {loadStripe} from "@stripe/stripe-js"
import { ButtonHTMLAttributes, ReactNode } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

type Props={
    name:string;
    price:number;
    quantity:number;
    classType:"string";
    children:ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function PayButton({
    children,
    name,
    price,
    quantity,
    classType,
    ...props
}:Props){
    const handleCheckout = async() =>{
        console.log( children,
    name,
    price,
    quantity,
    classType,)
        const res = await fetch("/api/checkout",{
            method:"POST",
            headers:{"COntent-Type":"application/json"},
            body: JSON.stringify({name,price,quantity}),
        });
        const data = await res.json();
        const stripe = await stripePromise;
        if(stripe){
            await stripe.redirectToCheckout({sessionId: data.id})
        }
    };

    return(
        <button onClick={()=>handleCheckout()} className={`${classType}`} {...props}>
        {children}
        </button>
    );
}