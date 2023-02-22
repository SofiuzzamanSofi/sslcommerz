import React from 'react'
import { useLocation } from 'react-router-dom'

function PaymentSuccess() {

    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const transactionId = query.get("transactionId");
    console.log('query, transactionId:', " query,", transactionId);





    return (
        <div>PaymentSuccess</div>
    )
}

export default PaymentSuccess