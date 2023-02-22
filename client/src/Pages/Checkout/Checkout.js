import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price, img } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.number.value;
        const address = form.address.value;
        const postalCode = form.postalCode.value;
        const currency = form.currency.value;
        // const message = form.message.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            address,
            postalCode,
            currency,
        }
        // console.log("object:", order);

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('genius-token')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                window.location.replace(data?.url)
                if (data.acknowledged) {
                    alert('Order placed successfully')
                    form.reset();

                }
            })
            .catch(er => console.error(er));


    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}
                className="flex items-center justify-between"
            >
                <div>
                    <h2 className="text-4xl">You are about to order: {title}</h2>
                    <h4 className="text-3xl">Price: {price}</h4>
                    <img src={img} alt="" />
                </div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <select
                        className='select select-bordered w-full max-w-xs'
                        name='currency'
                        defaultValue="BDT"
                    >
                        <option value="Currency" disabled >Currency</option>
                        <option value="BDT" >BDT</option>
                        <option value="USD">USD</option>
                    </select>

                    <input name="firstName" type="text" placeholder="First Name" className="input input-ghost w-full  input-bordered" />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost w-full  input-bordered" />
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email} className="input input-ghost w-full  input-bordered" disabled />
                    <input name="number" type="number" id="number-input" placeholder="Your Phone" className="input input-ghost w-full  input-bordered" required />
                    <input name="postalCode" type="text" id='postalCode' placeholder="Your Post Code" className="input input-ghost w-full  input-bordered" required />
                    <input name="address" type="text" id='address' placeholder="Your address" className="input input-ghost w-full  input-bordered" required />



                    <textarea name="message" className="textarea textarea-bordered h-24 w-full" placeholder="Your Message" ></textarea>

                    <input className='btn' type="submit" value="Pay and Continue" />
                </div>
            </form>
        </div>
    );
};

export default Checkout;