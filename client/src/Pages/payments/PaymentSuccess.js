import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'

function PaymentSuccess() {

    const [order, setOrder] = useState();
    console.log("dataa, order: ", order);
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const transactionId = query.get("transactionId");
    // console.log('query, transactionId:', " query,", transactionId);
    useEffect(() => {
        fetch(`http://localhost:5000/orders/by-transaction-id/${transactionId}`)
            .then(res => res.json())
            .then(data => setOrder(data))
    }, [transactionId])

    return (
        <div>PaymentSuccess</div>
    )
}

export default PaymentSuccess