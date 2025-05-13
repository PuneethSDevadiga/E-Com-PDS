import React, { useState } from 'react';
import './Checkout.css'; // Add your styles for the checkout page
import axiosInstance from '../api/axiosInstance';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Checkout = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate a checkout request
      await axiosInstance.post('/checkout', userDetails);
      alert('Order placed successfully!');
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="checkout">
          <h1>Checkout</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userDetails.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              value={userDetails.address}
              onChange={handleChange}
              required
            />
            <select
              name="paymentMethod"
              value={userDetails.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              <option value="credit">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
            <button type="submit">Confirm Order</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Checkout;
