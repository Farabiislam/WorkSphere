import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const PaymentForm = ({ employee,recall }) => {
    console.log(employee)
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);
    const { _id, employee_id, employee_name, employee_email, salary } = employee;

    console.log("hello from payment form")

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        // 1. Get clientSecret
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
            amount: salary,
        });

        const { clientSecret } = res.data;

        // 2. Confirm card payment
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (result.error) {
            console.log(result.error)
            toast.error(result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                console.log(result)
                const transactionId = result.paymentIntent.id;
                handlePay(_id, employee_id, transactionId)
            }
        }
        setProcessing(false);
    };

    const handlePay = async (pay_id, employee_id, transactionId) => {
        try {
            const pay = await axios.patch(
                `${import.meta.env.VITE_API_URL}/payroll/${pay_id}`,
                {
                    isPaid: true,
                    employee_id,
                    transactionId,
                }
            );

            if (pay.status === 200) {
                toast.success(`Payment for ${employee_name} successful!`);
                recall()
            } else {
                toast.error("Payment failed");
            }
        } catch (error) {
            toast.error("Payment error", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-11/12 mx-auto my-5 p-4 space-y-4 text-primary bg-secondary shadow rounded">
            <CardElement className='text-primary' />
            <button type="submit" disabled={!stripe || processing} className="btn btn-primary w-full mt-4">
                {processing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default PaymentForm;
