import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const StripeProvider = ({ children }) => {
  return (
      <Elements stripe={stripe}>
          {children}
      </Elements>
  )
}

export default StripeProvider