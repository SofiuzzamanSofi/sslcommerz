import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import OrderRow from '../Orders/OrderRow';

function PaymentSuccess() {

    const [orders, setOrders] = useState();
    console.log("dataa, order: ", orders);
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const transactionId = query.get("transactionId");
    // console.log('query, transactionId:', " query,", transactionId);
    useEffect(() => {
        fetch(`http://localhost:5000/orders/by-transaction-id/${transactionId}`)
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [transactionId])

    return (
        <div>
            <div>
                <h1>Congratulatino</h1>
                <p>Successfully paid this </p>
                <p>Your order summery.</p>
            </div>
            <div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name & Phone</th>
                            <th>Email</th>
                            <th>Price</th>
                            <th>Payment Date & Time</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* ------------- */}
                        <tr>
                            <td>01</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div>
                                        <div className="font-bold">{orders?.customer}</div>
                                        <div className="text-sm opacity-50">{orders?.phone}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{orders?.email}</td>
                            <td>
                                <br />
                                <span className="badge badge-ghost badge-sm">${orders?.price}</span>
                            </td>
                            <td>{orders?.time}</td>
                            <td >
                                {orders?.address}
                            </td>
                        </tr>
                        {/* ------------- */}
                    </tbody>
                </table>
            </div>
            <div>
                <button
                    onClick={() => window.print()}
                    className='btn m-10 ml-0 print:hidden'>Print payment voucher</button>
            </div>
        </div>
    )
}

export default PaymentSuccess